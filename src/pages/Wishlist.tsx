import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const handleWishlistToggle = (productId: string) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="luxury-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Collection</span>
            </Link>
            
            {wishlistItems.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="luxury-container py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your saved items for easy access and future rental
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start adding items you love to your wishlist
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Browse Collection</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isWishlisted={true}
                  onWishlistToggle={handleWishlistToggle}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-gold text-gold hover:bg-gold hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={clearWishlist}
                  className="inline-flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Wishlist</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
