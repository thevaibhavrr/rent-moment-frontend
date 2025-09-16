import { Search, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import WhatsAppIcon from "./WhatsAppIcon";

const Header = () => {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "7909921367";
    const message = "Hi! I'm interested in renting some products. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="luxury-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Rent the Moment" 
              className="h-12 md:h-10 w-auto"
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
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-6 h-6 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gray-900 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;