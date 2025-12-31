import React, { useState, useEffect } from 'react';
import { useHighlightedProducts } from '../hooks/useHighlightedProducts';
import ProductCarousel3D from './ProductCarousel3D';
import ProductNavigation from './ProductNavigation';
import NewYear2026 from './NewYear2026';
import { Product } from '../services/api';

const Hero = () => {
  const { products, loading, error } = useHighlightedProducts(10); // Fetch highlighted products
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToProducts = () => {
    const productSection = document.querySelector('[data-section="products"]');
    if (productSection) {
      productSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleProductSelect = (index: number) => {
    setCurrentProductIndex(index);
    setSelectedProduct(products[index]);
  };

  const handleBookNow = () => {
    if (selectedProduct) {
      // Navigate to product detail or booking page
      window.location.href = `/product/${selectedProduct._id}`;
    } else {
      scrollToProducts();
    }
  };

  // Auto-slide effect for featured dress images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2); // 2 images for featured dress
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="relative h-[80vh] md:h-[70vh] lg:h-[80vh] overflow-hidden flex items-center justify-center" style={{marginTop: '10px'}}>
        <NewYear2026 />
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-lg">Loading featured products...</p>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    // Show the engagement lehenga as featured product when no highlighted products
    const featuredDress = {
      _id: "68dfa1cbcf81779847d3bb17",
      name: "Engagement lehenga",
      description: "Like a Gorgeous look with gorgeous dress.",
      categories: [{
        _id: "6891ea9e4c1849c2df9e1226",
        name: "Lehenga",
        slug: "lehenga"
      }],
      images: [
        "https://res.cloudinary.com/djrdmqjir/image/upload/v1759486399/ikftopzyuzu6oaijgxnn.jpg",
        "https://res.cloudinary.com/djrdmqjir/image/upload/v1759486400/st6tinpnqyyxz8qx62fa.jpg"
      ],
      price: 1500,
      originalPrice: 1700,
      slug: "engagement-lehenga-2"
    };

    return (
      <section className="relative h-[75vh] overflow-hidden" >
        <NewYear2026 />
        <div className="absolute inset-0">
          {/* Auto-sliding image carousel */}
          <div className="relative w-full h-full">
            {featuredDress.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${featuredDress.name} - Image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-1000 ${
                  index === currentImageIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/60"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full py-8">
          <div className="text-center text-white max-w-6xl mx-auto px-4">
            {/* Enhanced Featured Collection Badge */}
            <div className="inline-block bg-gradient-to-r from-gold/30 to-yellow-400/30 backdrop-blur-md border border-gold/50 px-6 py-3 rounded-full mb-6 shadow-2xl">
              <span className="text-gold text-base font-bold tracking-widest uppercase drop-shadow-lg">
                ✨ Featured Dress ✨
              </span>
            </div>

            {/* Enhanced Selected Product Info */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
                <span className="block text-white drop-shadow-2xl">{featuredDress.name}</span>
                {/* <span className="block text-gold font-serif italic text-2xl md:text-3xl lg:text-4xl mt-1">
                  {featuredDress.categories[0].name}
                </span> */}
              </h1>
              
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
              
              {/* <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                {featuredDress.description}
              </p> */}
              
              {/* Enhanced Pricing Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <div className="text-3xl md:text-4xl font-bold text-gold drop-shadow-lg">
                  ₹{featuredDress.price}
                </div>
                {featuredDress.originalPrice && featuredDress.originalPrice > 0 && featuredDress.originalPrice > featuredDress.price ? (
                  <div className="flex items-center gap-3">
                    <div className="text-xl text-white/60 line-through">₹{featuredDress.originalPrice}</div>
                    <div className="text-sm font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                      {Math.round(((featuredDress.originalPrice - featuredDress.price) / featuredDress.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                ) : null}
              </div>
              
              {/* Product Features */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-white/80">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                  <span>Perfect Fit</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                  <span>Express Delivery</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button 
                onClick={() => window.location.href = `/product/${featuredDress._id}`}
                className="group bg-gradient-to-r from-gold to-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:from-yellow-400 hover:to-gold hover:scale-105 transform shadow-2xl hover:shadow-gold/25"
              >
                <span className="flex items-center gap-2">
                  🎉 Book Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              <button 
                onClick={scrollToProducts}
                className="group border-2 border-white/50 text-white hover:border-gold hover:text-gold px-10 py-4 rounded-full font-medium transition-all duration-300 hover:bg-gold/10 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  View All Products
                  <span className="group-hover:rotate-180 transition-transform">↻</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {featuredDress.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-gold scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-gold/40 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-gold/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gold/20 rounded-full animate-ping delay-500"></div>
      </section>
    );
  }

  return (
    <section className="relative h-[75vh] overflow-hidden" style={{marginTop: '10px'}}>
      <NewYear2026 />
      {/* Enhanced Background with Product Carousel */}
      <div className="absolute inset-0">
        <ProductCarousel3D 
          products={products} 
          onProductClick={handleProductClick}
          autoSlideInterval={3000}
          showMoreProducts={true}
          currentIndex={currentProductIndex}
          onIndexChange={setCurrentProductIndex}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/60"></div>
      </div>
      
      {/* Enhanced Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full py-8">
        <div className="text-center text-white max-w-6xl mx-auto px-4">
          {/* Enhanced Featured Collection Badge */}
          <div className="inline-block bg-gradient-to-r from-gold/30 to-yellow-400/30 backdrop-blur-md border border-gold/50 px-6 py-3 rounded-full mb-6 shadow-2xl">
            <span className="text-gold text-base font-bold tracking-widest uppercase drop-shadow-lg">
              {selectedProduct ? '✨ Featured Dress ✨' : '🌟 Featured Collection 🌟'}
            </span>
          </div>

          {/* Enhanced Dynamic Content */}
          <div className="space-y-6">
            {selectedProduct ? (
              <>
                {/* Enhanced Selected Product Info */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
                    <span className="block text-white drop-shadow-2xl">{selectedProduct.name}</span>
                    <span className="block text-gold font-serif italic text-2xl md:text-3xl lg:text-4xl mt-1">
                      {selectedProduct.categories?.[0]?.name || 'Luxury Fashion'}
                    </span>
                  </h1>
                  
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                  
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                    {selectedProduct.description}
                  </p>
                  
                  {/* Enhanced Pricing Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <div className="text-3xl md:text-4xl font-bold text-gold drop-shadow-lg">
                      ₹{selectedProduct.price}
                    </div>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > 0 && selectedProduct.originalPrice > selectedProduct.price ? (
                      <div className="flex items-center gap-3">
                        <div className="text-xl text-white/60 line-through">₹{selectedProduct.originalPrice}</div>
                        <div className="text-sm font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                          {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                        </div>
                      </div>
                    ) : null}
                  </div>
                  
                  {/* Product Features */}
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-white/80">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      <span>Premium Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      <span>Perfect Fit</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      <span>Express Delivery</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Enhanced Default Hero Content */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
                    <span className="block text-white drop-shadow-2xl">Luxury Fashion</span>
                    <span className="block text-gold font-serif italic text-2xl md:text-3xl lg:text-4xl mt-1">
                      Rental Experience
                    </span>
                  </h1>
                  
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                  
                  <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                    Discover our curated collection of premium designer dresses and accessories. 
                    <br className="hidden md:block" />
                    Rent the perfect outfit for your special moments and create unforgettable memories.
                  </p>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                    <div className="text-center space-y-1">
                      <div className="text-2xl mb-1">👗</div>
                      <h3 className="text-sm font-semibold text-gold">Premium Collection</h3>
                      <p className="text-xs text-white/70">Handpicked designer pieces</p>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl mb-1">⚡</div>
                      <h3 className="text-sm font-semibold text-gold">Quick Delivery</h3>
                      <p className="text-xs text-white/70">Fast and reliable service</p>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl mb-1">✨</div>
                      <h3 className="text-sm font-semibold text-gold">Perfect Fit</h3>
                      <p className="text-xs text-white/70">Multiple sizes available</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button 
                onClick={handleBookNow}
                className="group bg-gradient-to-r from-gold to-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:from-yellow-400 hover:to-gold hover:scale-105 transform shadow-2xl hover:shadow-gold/25"
              >
                <span className="flex items-center gap-2">
                  {selectedProduct ? '🎉 Book Now' : '🌟 Explore Collection'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              {selectedProduct && (
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="group border-2 border-white/50 text-white hover:border-gold hover:text-gold px-10 py-4 rounded-full font-medium transition-all duration-300 hover:bg-gold/10 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    View All Products
                    <span className="group-hover:rotate-180 transition-transform">↻</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Product Navigation */}
      {products.length > 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ProductNavigation
            products={products}
            currentIndex={currentProductIndex}
            onProductSelect={handleProductSelect}
            onProductClick={handleProductClick}
          />
        </div>
      )}

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-gold/40 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-gold/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gold/20 rounded-full animate-ping delay-500"></div>
    </section>
  );
};

export default Hero;