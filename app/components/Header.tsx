'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, X, Heart, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { getCartItemCount } = useCart();

  const cartItemCount = getCartItemCount();
  const hasItems = cartItemCount > 0;

  // Handle scroll to hide/show header
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If there are items in cart, always show header
      if (hasItems) {
        setIsVisible(true);
        return;
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasItems]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);



  return (
    <header className={`bg-white shadow-lg border-b border-gray-100 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${hasItems ? 'shadow-xl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-24 h-24 relative">
              <Image
                src="/logo.png"
                alt="Rent the moment"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Rent the moment
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for dresses, lehengas, shoes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/checkout/guest" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          
           
          </div>

          {/* Mobile Cart Icon */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/checkout/guest" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
            <button
              className="p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for dresses, lehengas, shoes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Categories
              </Link>
              <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                About
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link href="/checkout/guest" onClick={() => setIsMenuOpen(false)} className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="tel:7909921367"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 font-bold flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Link>
                <Link
                  href="https://wa.me/917909921367"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-bold flex items-center"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2" />
                  WhatsApp
                </Link>
                <Link
                  href="/list-item"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-black text-white border border-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 font-bold"
                >
                  List Item
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 