'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductsByCategory } from '../../data/products';
import { formatPrice, formatDate, formatJoinDate, getConditionColor, getDiscountPercentage, generateWhatsAppInfoMessage, generateWhatsAppShareMessage, shareToWhatsApp } from '../../utils';
import { ArrowLeft, Star, MapPin, Calendar, Clock, Shield, Truck, Heart, Share2, MessageCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { isExternalImage, isValidImageUrl, handleImageError } from '../../utils/imageUtils';
import RentModal from '../../components/RentModal';
import ProductCard from '../../components/ProductCard';

interface ProductPageClientProps {
  product: any;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [needDate, setNeedDate] = useState('');
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, getCartItem } = useCart();

  // Auto-slide functionality
  useEffect(() => {
    if (product && product.images && product.images.length > 1) {
      const interval = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      }, 9000);

      return () => clearInterval(interval);
    }
  }, [product]);

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !product || !product.images) return;
   
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
    if (isRightSwipe) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleRentNow = () => {
    setIsRentModalOpen(true);
  };

  const handleConfirmRent = () => {
    // Always 1 day rental
    const rentalDuration = 1;
    addToCart(product, 1, rentalDuration, needDate);
    setIsRentModalOpen(false);
  };

  // Function to load related products
  const loadRelatedProducts = async (categoryId: string, currentProductId: string) => {
    try {
      setRelatedLoading(true);
      const response = await getProductsByCategory(categoryId, 1, 8); // Get 8 related products
      // Filter out the current product from related products
      if (response.products) {
        const filteredProducts = response.products.filter((p: any) => p._id !== currentProductId);
        setRelatedProducts(filteredProducts.slice(0, 6)); // Show max 6 related products
      } else {
        setRelatedProducts([]);
      }
    } catch (error) {
      console.error('Error loading related products:', error);
      setRelatedProducts([]);
    } finally {
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    // Load related products after the component mounts
    if (product && product.category && product.category._id) {
      loadRelatedProducts(product.category._id, product._id);
    }
  }, [product]);

  const discountPercentage = getDiscountPercentage(product.originalPrice, product.price);
  const isInWishlist = wishlistItems.some(item => item._id === product._id);
  const cartItem = getCartItem(product._id);
  const isInCart = !!cartItem;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href={`/products?category=${product.category._id}`}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {product.images && product.images[selectedImage] && isValidImageUrl(product.images[selectedImage]) ? (
                    <Image
                      src={product.images[selectedImage]}
                      alt={`${product.name} ${selectedImage + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => handleImageError(e)}
                      unoptimized={isExternalImage(product.images[selectedImage])}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">Image not available</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* WhatsApp and Wishlist Buttons */}
              <div className="absolute top-4 left-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      const message = generateWhatsAppShareMessage(product);
                      shareToWhatsApp(message);
                    }}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <span className="text-xs text-white bg-black/50 px-1 py-0.5 rounded mt-1 whitespace-nowrap">Share with your friend</span>
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    {isValidImageUrl(image) ? (
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => handleImageError(e)}
                        unoptimized={isExternalImage(image)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">N/A</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating || 0}/5 ({product.numReviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-pink-600">{formatPrice(product.price)}</span>
                {product.originalPrice > 0 && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{formatPrice(product.originalPrice)}</span>
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Rental price per day</p>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
              <div>
                <span className="text-sm text-gray-600">Sizes</span>
                <p className="font-medium text-black">{product.sizes.map((s: { size: string }) => s.size).join(', ')}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Color</span>
                <p className="font-medium text-black">{product.color}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Condition</span>
                <p className="font-medium text-black">{product.condition}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Rental Duration</span>
                <p className="font-medium text-black">{product.rentalDuration} days</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRentNow}
                disabled={isInCart}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isInCart 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isInCart ? 'Already in Cart' : 'Rent Now'}</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const message = generateWhatsAppInfoMessage(product);
                  shareToWhatsApp(message, '7909921367');
                }}
                className="w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 bg-green-500 text-white hover:bg-green-600"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get Info</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isInWishlist 
                    ? 'bg-pink-100 text-pink-600 border-2 border-pink-200 hover:bg-pink-200' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Secure Rental</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">Same Day Pickup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {!relatedLoading && product && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
              <p className="text-gray-600">More {product.category.name} you might like</p>
            </div>
            
            {relatedLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
              </div>
            ) : relatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct: any) => (
                    <ProductCard 
                      key={relatedProduct._id} 
                      product={relatedProduct} 
                      variant="compact"
                    />
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Link
                    href={`/products?category=${product.category._id}`}
                    className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    View All {product.category.name}
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No related products found</p>
                <Link
                  href={`/products?category=${product.category._id}`}
                  className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                >
                  Browse All {product.category.name}
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rent Modal */}
      <RentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        onConfirmRent={handleConfirmRent}
        needDate={needDate}
        onNeedDateChange={setNeedDate}
        product={product}
      />
    </div>
  );
}
