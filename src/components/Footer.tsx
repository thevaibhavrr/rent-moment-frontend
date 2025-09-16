import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-playfair font-bold">
              LuxeRent
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium clothing rental for special occasions. 
              Rent the Magic, own the moment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gold hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gold hover:text-gray-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gold hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">About Us</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-gold transition-colors">
                Our Story
              </Link>
              <Link to="/sustainability" className="block text-gray-300 hover:text-gold transition-colors">
                Sustainability
              </Link>
              <Link to="/careers" className="block text-gray-300 hover:text-gold transition-colors">
                Careers
              </Link>
              <Link to="/press" className="block text-gray-300 hover:text-gold transition-colors">
                Press
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Support</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-gray-300 hover:text-gold transition-colors">
                Contact Us
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-gold transition-colors">
                FAQ
              </Link>
              <Link to="/size-guide" className="block text-gray-300 hover:text-gold transition-colors">
                Size Guide
              </Link>
              <Link to="/shipping" className="block text-gray-300 hover:text-gold transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-300 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-300 hover:text-gold transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/rental-terms" className="block text-gray-300 hover:text-gold transition-colors">
                Rental Terms
              </Link>
              <Link to="/damage-policy" className="block text-gray-300 hover:text-gold transition-colors">
                Damage Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 LuxeRent. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ for fashion lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;