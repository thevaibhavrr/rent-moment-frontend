import { Search, ShoppingBag, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const BeautyHeader = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    navigate("/beauty/search");
  };


  const handleBagClick = () => {
    navigate('/cart');
  };

  return (
    <header 
      className={`bg-white shadow-sm sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-md' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/beauty" className="flex items-center">
            <img 
              src="/logo.png"
              alt="Rent the Moment" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
              }`}
            />
          </Link>

          {/* Search Icon - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 justify-center">
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-300 border border-gray-200 hover:border-[#FFDBAC] group"
            >
              <Search className="w-5 h-5 text-gray-500 group-hover:text-[#FFDBAC] transition-colors" />
              <span className="text-gray-600 text-sm">Search beauty products...</span>
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Mobile Search Icon */}
            <button
              onClick={handleSearchClick}
              className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-6 h-6 text-gray-600" />
            </button>

            {/* Profile Icon */}
            {isAuthenticated && user ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User2 className="w-6 h-6 text-gray-600" />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  Hi {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User2 className="w-6 h-6 text-gray-600" />
              </button>
            )}

            {/* Bag Icon */}
            <button
              onClick={handleBagClick}
              className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFDBAC] text-gray-900 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BeautyHeader;

