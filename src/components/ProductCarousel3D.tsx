import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../services/api';

interface ProductCarousel3DProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  autoSlideInterval?: number;
  showMoreProducts?: boolean;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const ProductCarousel3D: React.FC<ProductCarousel3DProps> = ({ 
  products, 
  onProductClick, 
  autoSlideInterval = 3000,
  showMoreProducts = true,
  currentIndex: externalCurrentIndex,
  onIndexChange
}) => {
  const [internalCurrentIndex, setInternalCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentIndex = externalCurrentIndex !== undefined ? externalCurrentIndex : internalCurrentIndex;

  useEffect(() => {
    if (isAutoPlaying && products.length > 1 && !isHovered && externalCurrentIndex === undefined) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % products.length;
        setInternalCurrentIndex(nextIndex);
        onIndexChange?.(nextIndex);
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, products.length, autoSlideInterval, isHovered, currentIndex, externalCurrentIndex, onIndexChange]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    if (externalCurrentIndex === undefined) {
      setInternalCurrentIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % products.length;
    if (externalCurrentIndex === undefined) {
      setInternalCurrentIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  const handleDotClick = (index: number) => {
    if (externalCurrentIndex === undefined) {
      setInternalCurrentIndex(index);
    }
    onIndexChange?.(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (products.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">👗</div>
          <h3 className="text-2xl font-bold mb-2">No Highlighted Products</h3>
          <p className="text-white/70">Add some products to the highlighted list to see them here</p>
        </div>
      </div>
    );
  }

  // Show more products in the carousel (up to 8 visible)
  const visibleProducts = showMoreProducts ? Math.min(products.length, 8) : Math.min(products.length, 6);
  const displayProducts = products.slice(0, visibleProducts);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Carousel Container */}
      <div className="relative w-full h-full perspective-1000">
        <div className="relative w-full h-full transform-style-preserve-3d">
          {displayProducts.map((product, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + displayProducts.length) % displayProducts.length;
            const isNext = index === (currentIndex + 1) % displayProducts.length;
            
            let transform = '';
            let opacity = 0.3;
            let zIndex = 1;
            
            if (isActive) {
              transform = 'translateZ(0px) scale(1)';
              opacity = 1;
              zIndex = 10;
            } else if (isPrev) {
              transform = 'translateZ(-200px) translateX(-100px) rotateY(45deg) scale(0.8)';
              opacity = 0.6;
              zIndex = 5;
            } else if (isNext) {
              transform = 'translateZ(-200px) translateX(100px) rotateY(-45deg) scale(0.8)';
              opacity = 0.6;
              zIndex = 5;
            } else {
              transform = 'translateZ(-400px) scale(0.6)';
              opacity = 0.2;
              zIndex = 1;
            }

            return (
              <div
                key={product._id}
                className="absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer"
                style={{
                  transform,
                  opacity,
                  zIndex,
                }}
                onClick={() => onProductClick?.(product)}
              >
                <div className="relative w-full h-full group">
                  {/* Product Image */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold truncate">{product.name}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gold">₹{product.price}</span>
                          <span className="text-sm text-white/60 line-through">₹{product.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {product.isFeatured && (
                      <div className="absolute top-4 right-4 bg-gold/20 backdrop-blur-sm border border-gold/30 px-3 py-1 rounded-full">
                        <span className="text-gold text-xs font-semibold tracking-widest uppercase">Featured</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Navigation Bar */}
      {displayProducts.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <div className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide">
            {displayProducts.map((product, index) => (
              <button
                key={product._id}
                onClick={() => handleDotClick(index)}
                className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold/20 border-2 border-gold text-gold'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium truncate max-w-20">{product.name}</div>
                  <div className="text-sm font-bold">₹{product.price}</div>
                  <div className="text-xs text-white/60 line-through">₹{product.originalPrice}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {displayProducts.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            aria-label="Next product"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {displayProducts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {displayProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gold scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Play/Pause Button */}
      {displayProducts.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductCarousel3D;
