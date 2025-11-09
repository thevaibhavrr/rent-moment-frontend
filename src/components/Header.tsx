import { Search, Heart, User2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import WhatsAppIcon from "./WhatsAppIcon";

const Header = () => {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { isVisible, isAtTop } = useScrollHeader();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "7909921367";
    const message = "Hi! I'm interested in renting some products. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header 
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isAtTop ? 'h-20 md:h-24' : 'h-16 md:h-20'}`}
    >
      <div className="luxury-container h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              // src="/new-logo.jpeg" 
              src="/logo.png"
              alt="Rent the Moment" 
              className={`w-auto transition-all duration-300 ${
                isAtTop ? 'h-14 md:h-16' : 'h-12 md:h-14'
              }`}
            />
          </Link>

          {/* Search Bar - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by category, style, or color"
                className="search-input pr-12"
                onClick={handleSearchClick}
                readOnly
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Search Icon */}
            <button
              onClick={handleSearchClick}
              className="md:hidden p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-7 h-7 text-gray-600" />
            </button>
            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-7 h-7 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gray-900 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-7 h-7 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gray-900 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* User Profile */}
            {isAuthenticated && user ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User2 className="w-7 h-7 text-gray-600" />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  Hi {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User2 className="w-7 h-7 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;