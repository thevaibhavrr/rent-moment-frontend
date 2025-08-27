import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '../../data/products';
import { formatPrice, getDiscountPercentage, generateWhatsAppMessage, generateWhatsAppInfoMessage, shareToWhatsApp, generateSocialShareUrls } from '../../utils';
import { Star, MapPin, Calendar, Clock, Shield, Truck, Heart, Share2, MessageCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { isExternalImage, isValidImageUrl, handleImageError } from '../../utils/imageUtils';

interface SharePageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Generate metadata for the sharing page
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  try {
    const { productId } = await params;
    let product;
    
    // Try to get product by slug first, then by ID if that fails
    try {
      product = await getProductBySlug(productId);
    } catch (error) {
      // If slug lookup fails, try to get by ID
      try {
        const { getProductById } = await import('../../data/products');
        product = await getProductById(productId);
      } catch (idError) {
        console.error('Failed to fetch product by both slug and ID:', error, idError);
        return {
          title: 'Product Not Found - Rent the Moment',
          description: 'The requested product could not be found.',
        };
      }
    }
    
    if (!product) {
      return {
        title: 'Product Not Found - Rent the Moment',
        description: 'The requested product could not be found.',
      };
    }

    const discountPercentage = getDiscountPercentage(product.originalPrice, product.price);
    
    // Ensure image URL is absolute and properly formatted for WhatsApp
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/logo.png`; // fallback
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.startsWith('http')) {
        // For Cloudinary images, ensure they're optimized for social sharing
        if (firstImage.includes('cloudinary.com')) {
          // Add transformation parameters for optimal social media display
          imageUrl = firstImage.replace('/upload/', '/upload/c_fill,w_1200,h_630,f_auto/');
        } else {
          imageUrl = firstImage;
        }
      } else {
        imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}${firstImage}`;
      }
    }
    
    // Debug logging
    console.log('Generated image URL for meta tags:', imageUrl);
    
    return {
      title: `${product.name} - Rent for ₹${product.price} | Rent the Moment`,
      description: `${product.description.substring(0, 160)}... Rent this ${product.category.name} for just ₹${product.price}${product.originalPrice > 0 ? ` (${discountPercentage}% OFF)` : ''}.`,
      keywords: `${product.name}, ${product.category.name}, clothing rental, fashion rental, ${product.color}, ${product.sizes.map((s: any) => s.size).join(', ')}`,
      openGraph: {
        title: `${product.name} - Rent for ₹${product.price}`,
        description: `${product.description.substring(0, 160)}... Rent this ${product.category.name} for just ₹${product.price}${product.originalPrice > 0 ? ` (${discountPercentage}% OFF)` : ''}.`,
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`,
        siteName: 'Rent the Moment',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - Rent for ₹${product.price}`,
        description: `${product.description.substring(0, 160)}... Rent this ${product.category.name} for just ₹${product.price}${product.originalPrice > 0 ? ` (${discountPercentage}% OFF)` : ''}.`,
        images: [imageUrl],
      },
      other: {
        // Open Graph tags
        'og:image:width': '1200',
        'og:image:height': '630',
        'og:image:type': 'image/jpeg',
        'og:image:secure_url': imageUrl,
        'og:image:alt': product.name,
        'og:site_name': 'Rent the Moment',
        'og:locale': 'en_US',
        'og:type': 'website',
        'og:url': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`,
        
        // Twitter Card tags
        'twitter:image:alt': product.name,
        'twitter:site': '@rentthemoment',
        'twitter:creator': '@rentthemoment',
        'twitter:image': imageUrl,
        
        // Additional WhatsApp-specific tags
        'og:image': imageUrl,
        'og:title': `${product.name} - Rent for ₹${product.price}`,
        'og:description': `${product.description.substring(0, 160)}... Rent this ${product.category.name} for just ₹${product.price}${product.originalPrice > 0 ? ` (${discountPercentage}% OFF)` : ''}.`,
        
        // Viewport and mobile optimization
        'viewport': 'width=device-width, initial-scale=1',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found - Rent the Moment',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function SharePage({ params }: SharePageProps) {
  try {
    const { productId } = await params;
    let product;
    
    // Try to get product by slug first, then by ID if that fails
    try {
      product = await getProductBySlug(productId);
    } catch (error) {
      // If slug lookup fails, try to get by ID
      try {
        const { getProductById } = await import('../../data/products');
        product = await getProductById(productId);
      } catch (idError) {
        console.error('Failed to fetch product by both slug and ID:', error, idError);
        notFound();
      }
    }
    
    if (!product || !product.name || !product.category) {
      notFound();
    }

    const discountPercentage = getDiscountPercentage(product.originalPrice, product.price);
    const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;
    
    // Debug: Log the image URLs for troubleshooting
    console.log('Product images:', product.images);
    console.log('Main image:', mainImage);
    console.log('Product ID:', productId);
    console.log('Product slug:', product.slug);

    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-100 p-4 text-sm">
            <h3 className="font-bold">Debug Info:</h3>
            <p>Product ID: {productId}</p>
            <p>Product Slug: {product.slug}</p>
            <p>Image URLs: {JSON.stringify(product.images)}</p>
            <p>Main Image: {mainImage}</p>
            <p>Share URL: {`${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`}</p>
            
            <h4 className="font-bold mt-4">Meta Tags Generated:</h4>
            <div className="bg-white p-2 rounded text-xs">
              <p><strong>og:title:</strong> {product.name} - Rent for ₹{product.price}</p>
              <p><strong>og:description:</strong> {product.description.substring(0, 160)}...</p>
              <p><strong>og:image:</strong> {product.images && product.images.length > 0 ? 
                product.images[0].includes('cloudinary.com') ? 
                product.images[0].replace('/upload/', '/upload/c_fill,w_1200,h_630,f_auto/') : 
                product.images[0] : 
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/logo.png`
              }</p>
              <p><strong>og:url:</strong> {`${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`}</p>
            </div>
            
            <h4 className="font-bold mt-4">Testing Tools:</h4>
            <div className="space-y-2">
              <a 
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-500 text-white px-3 py-1 rounded text-xs"
              >
                Test on Facebook Debugger
              </a>
              <a 
                href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-400 text-white px-3 py-1 rounded text-xs"
              >
                Test on Twitter Card Validator
              </a>
              <a 
                href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-the-moment.vercel.app'}/share/${productId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-600 text-white px-3 py-1 rounded text-xs"
              >
                Test on LinkedIn Post Inspector
              </a>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Link
                href={`/product/${productId}`}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/" className="hover:text-gray-900">Home</Link>
                  <span>/</span>
                  <Link href="/categories" className="hover:text-gray-900">Categories</Link>
                  <span>/</span>
                  <Link href={`/categories/${product.category.slug}`} className="hover:text-gray-900">
                    {product.category.name}
                  </Link>
                  <span>/</span>
                  <span className="text-gray-900">{product.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Hero Section with Product Image */}
            <div className="relative h-96 bg-gradient-to-br from-pink-50 to-purple-50">
              {mainImage && isValidImageUrl(mainImage) ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => handleImageError(e)}
                  unoptimized={isExternalImage(mainImage)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Image not available</span>
                </div>
              )}
              
              {/* Overlay with product info */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category.name}
                    </span>
                    {product.originalPrice > 0 && product.originalPrice > product.price && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-pink-400">₹{formatPrice(product.price)}</span>
                    {product.originalPrice > 0 && product.originalPrice > product.price && (
                      <span className="text-xl text-gray-300 line-through">₹{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
          

              {/* Product Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">Color</span>
                  <span className="font-semibold text-gray-900">{product.color}</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">Sizes</span>
                  <span className="font-semibold text-gray-900">{product.sizes.map((s: any) => s.size).join(', ')}</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">Condition</span>
                  <span className="font-semibold text-gray-900">{product.condition}</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">Rental Duration</span>
                  <span className="font-semibold text-gray-900">{product.rentalDuration} days</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Rental</h4>
                    <p className="text-sm text-gray-600">Safe and secure rental process</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Delivery</h4>
                    <p className="text-sm text-gray-600">Free delivery to your location</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Same Day Pickup</h4>
                    <p className="text-sm text-gray-600">Quick and convenient pickup</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center space-y-4">
                <Link
                  href={`/product/${productId}`}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  View Full Details & Rent Now
                </Link>
                
                                 <div className="flex justify-center space-x-4">
                   <button
                     onClick={() => {
                       const message = generateWhatsAppInfoMessage(product);
                       shareToWhatsApp(message, '919926503468');
                     }}
                     className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                   >
                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.007 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                     </svg>
                     Share on WhatsApp
                   </button>
                  
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.share({
                          title: `${product.name} - Rent for ₹${product.price}`,
                          text: `${product.description.substring(0, 100)}...`,
                          url: `${window.location.origin}/product/${productId}`,
                        });
                      }
                    }}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
