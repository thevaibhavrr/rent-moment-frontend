import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useWishlist } from "@/contexts/WishlistContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  
  const { data: product, isLoading, error } = useProduct(id || "");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = product ? isInWishlist(product._id) : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 sticky top-0 z-50 bg-white">
          <div className="luxury-container py-4">
            <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Collection</span>
            </Link>
          </div>
        </div>
        <div className="luxury-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
              <div className="flex space-x-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-20 h-24 rounded-lg bg-gray-200 animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 sticky top-0 z-50 bg-white">
          <div className="luxury-container py-4">
            <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Collection</span>
            </Link>
          </div>
        </div>
        <div className="luxury-container py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">
              Product not found or failed to load.
            </p>
            <Link to="/" className="btn-luxury-primary">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleWhatsAppInfo = () => {
    const phoneNumber = "7909921367";
    const depositText = product.deposit && product.deposit > 0 ? `\nDeposit: ₹${product.deposit}` : '';
    const message = `Hi! I'm interested in this product:\n\n*${product.name}*\n\nPrice: ₹${product.price}${depositText}\nSize needed: ${selectedSize || "Not selected"}\n\nImage: ${product.images[0]}\nProduct Link: ${window.location.href}\n\nCan you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const depositText = product.deposit && product.deposit > 0 ? `\nDeposit: ₹${product.deposit}` : '';
    const message = `Check out this amazing product: *${product.name}*\n\nPrice: ₹${product.price}${depositText}\n\nView more: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="luxury-container py-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Collection</span>
          </Link>
        </div>
      </div>

      <div className="luxury-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
              <img
                src={product.images[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* WhatsApp Share Icon */}
              <button
                onClick={handleWhatsAppShare}
                className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                title="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-gold" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-gray-600">{product.categories?.[0]?.name || 'Fashion'}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
              </div>
                {/* deposit */}
                {product.deposit && product.deposit > 0 && (
                  <div className="text-sm text-gray-500">
                    Deposit: ₹{product.deposit.toLocaleString()}
                  </div>
                )}
            </div>


            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3"> Available Sizes</h3>
              <div className="flex space-x-3">
                {product.sizes.map((sizeObj) => (
                  <button
                    className={`w-12 h-12 rounded-lg border-2 text-center font-medium transition-colors ${
                      selectedSize === sizeObj.size
                        ? "border-gold bg-gold/10 text-gold"
                        : sizeObj.isAvailable
                        ? "border-gray-200 hover:border-gray-300"
                        : "border-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
              
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleWhatsAppInfo()}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Get Info on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  if (product) {
                    if (isWishlisted) {
                      removeFromWishlist(product._id);
                    } else {
                      addToWishlist(product);
                    }
                  }
                }}
                className={`w-full border-2 rounded-lg py-4 px-6 font-medium transition-colors duration-300 flex items-center justify-center space-x-2 ${
                  isWishlisted
                    ? "border-red-500 text-red-500 hover:bg-red-50"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                <span>{isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Delivery</div>
                <div className="text-xs text-gray-500">2-3 days</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Damage Protection</div>
                <div className="text-xs text-gray-500">Included</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Easy Returns</div>
                <div className="text-xs text-gray-500">Hassle-free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;