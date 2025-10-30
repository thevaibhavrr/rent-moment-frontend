import React from 'react';
import { Product } from '../services/api';

interface ProductNavigationProps {
  products: Product[];
  currentIndex: number;
  onProductSelect: (index: number) => void;
  onProductClick: (product: Product) => void;
}

const ProductNavigation: React.FC<ProductNavigationProps> = ({
  products,
  currentIndex,
  onProductSelect,
  onProductClick
}) => {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
        <div className="text-center mb-4">
          <h3 className="text-white text-lg font-semibold">Featured Collection</h3>
          <p className="text-white/70 text-sm">Click any dress to explore</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product._id}
              className={`relative group cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-gold scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => {
                onProductSelect(index);
                onProductClick(product);
              }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs font-medium truncate">{product.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold">₹{product.price}</span>
                    <span className="text-xs text-white/60 line-through">₹{product.originalPrice}</span>
                  </div>
                </div>

                {/* Active Indicator */}
                {index === currentIndex && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
                )}

                {/* Featured Badge */}
                {product.isFeatured && (
                  <div className="absolute top-1 left-1 bg-gold/20 backdrop-blur-sm border border-gold/30 px-1 py-0.5 rounded text-xs text-gold font-semibold">
                    FEATURED
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > 8 && (
          <div className="text-center mt-4">
            <button className="text-white/70 hover:text-gold text-sm font-medium transition-colors duration-300">
              +{products.length - 8} More Dresses →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductNavigation;
