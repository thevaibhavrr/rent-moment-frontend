import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Heart, ShoppingBag, Star, ArrowLeft, Plus, Minus, Search, X } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';
import { Product } from '@/services/api';
import { useLocation } from 'react-router-dom';

// Local type that allows string arrays for sizes
type LocalProduct = Omit<Product, 'sizes'> & {
  sizes: string[] | Array<{ size: string; isAvailable: boolean; quantity: number }>;
};

const categoryProducts: Record<string, LocalProduct[]> = {
  'Winter Moisturizers': [
    {
      _id: '1',
      name: 'Cetaphil Face Moisturizing Cream',
      description: 'Rich, non-greasy formula for extremely dry, sensitive skin. Provides 24-hour hydration and strengthens skin barrier.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 845,
      originalPrice: 995,
      deposit: 0,
      color: 'White',
      sizes: ['100g', '200g', '450g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'winter', 'dry skin', 'sensitive skin', 'Face Moisturizers'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-moisturizing-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      name: 'NIVEA Body Moisturizing Cream',
      description: 'Classic German formula with almond oil. Provides intensive moisture protection against harsh winter weather.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 285,
      originalPrice: 350,
      deposit: 0,
      color: 'Blue/White',
      sizes: ['50ml', '100ml', '200ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'classic', 'winter care', 'almond oil', 'Body Moisturizers'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-creme-winter',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      name: 'The Body Shop Vitamin E Moisture Cream',
      description: 'Intensely hydrating cream with wheat germ oil. Perfect for dry winter skin with 72-hour moisture lock.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 1495,
      originalPrice: 1795,
      deposit: 0,
      color: 'Pink',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['vitamin e', 'bodyshop', 'moisture lock', 'wheat germ', 'Face Moisturizers'],
      isFeatured: false,
      isHighlighted: true,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'bodyshop-vitamin-e-moisture-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wm4',
      name: 'Olay Regenerist Night Cream',
      description: 'Advanced anti-aging night cream with amino-peptides. Repairs skin while you sleep for a youthful glow.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 1299,
      originalPrice: 1599,
      deposit: 0,
      color: 'White',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['olay', 'night cream', 'anti-aging', 'Night Creams'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'olay-regenerist-night-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wm5',
      name: 'Neutrogena Hand Cream Intensive Repair',
      description: 'Fast-absorbing hand cream with concentrated glycerin. Heals dry, cracked hands in just one day.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 399,
      originalPrice: 499,
      deposit: 0,
      color: 'White',
      sizes: ['56g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'hand cream', 'repair', 'Hand Creams'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-hand-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wm6',
      name: 'La Roche-Posay SPF 50 Moisturizer',
      description: 'Daily moisturizer with SPF 50 protection. Hydrates while protecting from harmful UV rays.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 1599,
      originalPrice: 1999,
      deposit: 0,
      color: 'White',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['la roche-posay', 'spf', 'moisturizer', 'SPF Moisturizers'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'la-roche-posay-spf-moisturizer',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Winter Body Lotions': [
    {
      _id: '4',
      name: 'Vaseline Intensive Care Body Lotion',
      description: 'Advanced healing formula with micro-droplets of vaseline jelly. Absorbs deeply to heal dry winter skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 325,
      originalPrice: 399,
      deposit: 0,
      color: 'White',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['vaseline', 'body lotion', 'intensive care', 'winter', 'Intensive Care'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'vaseline-intensive-care-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '5',
      name: 'NIVEA Essentially Enriched Body Lotion',
      description: 'Deeply nourishing lotion with almond oil and moisturizers. Specially formulated for very dry skin in winter.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 445,
      originalPrice: 525,
      deposit: 0,
      color: 'Blue',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'body lotion', 'almond oil', 'dry skin', 'Nourishing Body'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-essentially-enriched-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wbl3',
      name: 'Jergens Ultra Healing Body Lotion',
      description: 'Lightweight formula that absorbs quickly. Provides 24-hour moisture without feeling greasy.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 399,
      originalPrice: 499,
      deposit: 0,
      color: 'White',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['jergens', 'ultra healing', 'lightweight', 'Lightweight'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'jergens-ultra-healing-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wbl4',
      name: 'Aveeno Daily Moisturizing Lotion',
      description: 'Fragrance-free formula with colloidal oatmeal. Gentle enough for sensitive skin, effective for dry skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 549,
      originalPrice: 699,
      deposit: 0,
      color: 'White',
      sizes: ['354ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['aveeno', 'daily', 'sensitive', 'Sensitive Skin'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'aveeno-daily-moisturizing-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Lip Bams': [
    {
      _id: '6',
      name: 'NIVEA Original Care SPF Lip Balm',
      description: 'Classic lip care with shea butter and hydrating formula. SPF 15 protects from winter sun damage.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 199,
      originalPrice: 249,
      deposit: 0,
      color: 'Blue',
      sizes: ['4.8g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'lip balm', 'spf15', 'shea butter', 'SPF Lip Balms'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-original-care-lip-balm',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '7',
      name: 'The Body Shop Strawberry Tinted Lip Balm',
      description: '100% vegan lip balm with community trade sugar. Sweet strawberry flavor with intense hydration and subtle tint.',
    images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 595,
      originalPrice: 695,
      deposit: 0,
      color: 'Pink',
      sizes: ['10ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['bodyshop', 'strawberry', 'vegan', 'lip care', 'Tinted Balms'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'bodyshop-strawberry-lip-balm',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'lb3',
      name: 'Blistex Medicated Lip Balm',
      description: 'Medicated formula with SPF 15. Soothes and heals chapped, cracked lips with camphor and menthol.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 149,
      originalPrice: 199,
      deposit: 0,
      color: 'White',
      sizes: ['4.25g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['blistex', 'medicated', 'healing', 'Medicated'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'blistex-medicated-lip-balm',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'lb4',
      name: 'ChapStick Cherry Flavored Lip Balm',
      description: 'Classic cherry-flavored lip balm. Provides long-lasting moisture with a delicious cherry taste.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 99,
      originalPrice: 149,
      deposit: 0,
      color: 'Red',
      sizes: ['4g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['chapstick', 'cherry', 'flavored', 'Flavored'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'chapstick-cherry-lip-balm',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Face Creams': [
    {
      _id: '8',
      name: "L'OREAL Paris Revitalift Anti-Aging Face Cream",
      description: 'Anti-aging face cream with hyaluronic acid. Reduces wrinkles and provides 48-hour hydration.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 699,
      originalPrice: 899,
      deposit: 0,
      color: 'White',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['loreal', 'anti-aging', 'hyaluronic acid', 'revitalift', 'Anti-Aging'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'loreal-revitalift-face-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '9',
      name: 'Ponds Brightening Face Cream',
      description: 'Brightening face cream with vitamin B3. Evens skin tone and reduces dark spots for radiant skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 299,
      originalPrice: 349,
      deposit: 0,
      color: 'White',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['ponds', 'brightening', 'vitamin b3', 'Brightening'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ponds-brightening-face-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fc3',
      name: 'Neutrogena Hydrating Face Cream',
      description: 'Deeply hydrating face cream with hyaluronic acid. Provides intense moisture for dry skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 799,
      originalPrice: 999,
      deposit: 0,
      color: 'White',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'hydrating', 'hyaluronic acid', 'Hydrating'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-hydrating-face-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fc4',
      name: 'Cetaphil Oil Control Matte Face Cream',
      description: 'Oil-free matte finish face cream. Controls shine and provides hydration without greasiness.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 649,
      originalPrice: 799,
      deposit: 0,
      color: 'White',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'oil control', 'matte', 'Matte Finish'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-oil-control-matte-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fc5',
      name: 'Aveeno Calm + Restore Face Cream',
      description: 'Gentle face cream for sensitive skin. Soothes irritation and provides essential hydration.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 899,
      originalPrice: 1099,
      deposit: 0,
      color: 'White',
      sizes: ['48g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['aveeno', 'calm', 'sensitive', 'Sensitive Skin'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'aveeno-calm-restore-face-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Facewash': [
    {
      _id: '10',
      name: 'Cetaphil Gentle Skin Cleanser',
      description: 'Soap-free, non-irritating formula ideal for sensitive skin. Maintains skin pH balance while cleansing.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 545,
      originalPrice: 645,
      deposit: 0,
      color: 'White',
      sizes: ['125ml', '250ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'gentle', 'sensitive skin', 'cleanser', 'Gentle Cleansers'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-gentle-cleanser',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '11',
      name: 'Neutrogena Deep Clean Facial Cleanser',
      description: 'Oil-free formula with gentle microbeads. Removes 99% of dirt, oil, and makeup without over-drying.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 425,
      originalPrice: 499,
      deposit: 0,
      color: 'Orange',
      sizes: ['200ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'deep clean', 'oil free', 'microbeads', 'Deep Cleansing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-deep-clean-cleanser',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fw3',
      name: 'Neutrogena Oil-Free Acne Wash',
      description: 'Acne-fighting cleanser with salicylic acid. Clears breakouts and prevents new ones from forming.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 499,
      originalPrice: 599,
      deposit: 0,
      color: 'Orange',
      sizes: ['200ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'acne', 'salicylic acid', 'Acne Control'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-acne-wash',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fw4',
      name: 'St. Ives Fresh Skin Apricot Scrub',
      description: 'Exfoliating face scrub with natural apricot. Removes dead skin cells and reveals fresh, glowing skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 249,
      originalPrice: 349,
      deposit: 0,
      color: 'Orange',
      sizes: ['150g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['st ives', 'apricot', 'scrub', 'Exfoliating'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'st-ives-apricot-scrub',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Moisturizer': [
    {
      _id: '12',
      name: 'Neutrogena Hydro Boost Water Gel',
      description: 'Oil-free, non-comedogenic water gel with hyaluronic acid. Provides intense hydration without clogging pores.',
        images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 899,
      originalPrice: 1099,
      deposit: 0,
      color: 'Blue',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'hydro boost', 'water gel', 'hyaluronic acid', 'Gel Moisturizers'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-hydro-boost-gel',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'm2',
      name: 'Cetaphil Daily Facial Moisturizer',
      description: 'Lightweight daily moisturizer with SPF 30. Provides hydration and sun protection in one step.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 749,
      originalPrice: 899,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'daily', 'spf30', 'Daily Moisturizers', 'SPF Moisturizers'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-daily-moisturizer-spf',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'm3',
      name: 'NIVEA Rich Nourishing Cream',
      description: 'Rich, creamy moisturizer for dry skin. Provides intensive nourishment and long-lasting hydration.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 349,
      originalPrice: 449,
      deposit: 0,
      color: 'Blue',
      sizes: ['200ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'rich', 'nourishing', 'Cream Moisturizers'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-rich-nourishing-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Serum': [
    {
      _id: '13',
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      description: 'High-strength vitamin and mineral formula. Reduces blemishes and congestion while regulating oil.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 650,
      originalPrice: 790,
      deposit: 0,
      color: 'Clear',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'niacinamide', 'zinc', 'blemish control', 'Niacinamide'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-niacinamide-serum',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 's2',
      name: 'The Ordinary Vitamin C Suspension 23%',
      description: 'High-potency vitamin C serum. Brightens skin, reduces hyperpigmentation, and evens skin tone.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 750,
      originalPrice: 890,
      deposit: 0,
      color: 'White',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'vitamin c', 'brightening', 'Vitamin C'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-vitamin-c-serum',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 's3',
      name: 'The Ordinary Hyaluronic Acid 2% + B5',
      description: 'Intense hydration serum with hyaluronic acid and vitamin B5. Plumps and hydrates skin effectively.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 550,
      originalPrice: 690,
      deposit: 0,
      color: 'Clear',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'hyaluronic acid', 'hydration', 'Hyaluronic Acid'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-hyaluronic-acid-serum',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 's4',
      name: 'The Ordinary Retinol 0.5% in Squalane',
      description: 'Anti-aging retinol serum in squalane. Reduces fine lines, wrinkles, and improves skin texture.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 850,
      originalPrice: 990,
      deposit: 0,
      color: 'Yellow',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'retinol', 'anti-aging', 'Retinol'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-retinol-serum',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Makeup': [
    {
      _id: '14',
      name: 'Maybelline New York Fit Me Matte + Poreless Foundation',
      description: 'Mattifying foundation with micro-powders that blur pores. Natural, seamless coverage for normal to oily skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 499,
      originalPrice: 599,
      deposit: 0,
      color: 'Various',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['maybelline', 'foundation', 'matte', 'poreless', 'Foundation'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'maybelline-fit-me-foundation',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mk2',
      name: 'Maybelline Fit Me Concealer',
      description: 'Natural-looking concealer that matches your skin tone. Covers imperfections and dark circles seamlessly.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 299,
      originalPrice: 399,
      deposit: 0,
      color: 'Various',
      sizes: ['6.8ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['maybelline', 'concealer', 'coverage', 'Concealer'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'maybelline-fit-me-concealer',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mk3',
      name: 'Lakme 9 to 5 Lipstick',
      description: 'Long-lasting matte lipstick with rich color payoff. Stays put for up to 9 hours without fading.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 399,
      originalPrice: 499,
      deposit: 0,
      color: 'Various',
      sizes: ['4.5g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['lakme', 'lipstick', 'matte', 'Lipstick'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'lakme-9to5-lipstick',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mk4',
      name: 'Maybelline Lash Sensational Mascara',
      description: 'Volumizing mascara that lengthens and curls lashes. Creates dramatic, full lashes with one stroke.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 449,
      originalPrice: 549,
      deposit: 0,
      color: 'Black',
      sizes: ['9.5ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['maybelline', 'mascara', 'lash', 'Mascara'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'maybelline-lash-sensational-mascara',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Shampoo': [
    {
      _id: '15',
      name: 'Dove Hair Fall Rescue Shampoo',
      description: 'Nutritive solution with caffeine complex. Reduces hair fall and strengthens hair from root to tip.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 399,
      originalPrice: 475,
      deposit: 0,
      color: 'White',
      sizes: ['340ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['dove', 'shampoo', 'hair fall', 'caffeine', 'Anti-Hairfall'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'dove-hair-fall-rescue-shampoo',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sh2',
      name: 'Pantene Smooth & Sleek Shampoo',
      description: 'Smoothing shampoo with pro-vitamin formula. Tames frizz and leaves hair silky smooth.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 349,
      originalPrice: 425,
      deposit: 0,
      color: 'White',
      sizes: ['340ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['pantene', 'smooth', 'sleek', 'Smoothing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'pantene-smooth-sleek-shampoo',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sh3',
      name: 'L\'Oreal Paris Volume Filler Shampoo',
      description: 'Volumizing shampoo that adds body and lift to fine, flat hair. Creates fuller-looking hair instantly.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 449,
      originalPrice: 549,
      deposit: 0,
      color: 'White',
      sizes: ['250ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['loreal', 'volume', 'filler', 'Volumizing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'loreal-volume-filler-shampoo',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sh4',
      name: 'Matrix Total Results Color Obsessed Shampoo',
      description: 'Color-protecting shampoo that preserves hair color vibrancy. Prevents fading and maintains color intensity.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 599,
      originalPrice: 749,
      deposit: 0,
      color: 'Purple',
      sizes: ['300ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['matrix', 'color', 'protect', 'Color Protection'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'matrix-color-obsessed-shampoo',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Bodywash': [
    {
      _id: '16',
      name: 'Dove Deeply Nourishing Body Wash',
      description: 'Nutri-moisture technology with 100% mild cleansers. Nourishes deep into the surface layers of skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 375,
      originalPrice: 445,
      deposit: 0,
      color: 'White',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['dove', 'body wash', 'nourishing', 'nutri-moisture', 'Moisturizing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'dove-deeply-nourishing-bodywash',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bw2',
      name: 'St. Ives Energizing Body Wash',
      description: 'Exfoliating body wash with natural citrus. Removes dead skin cells and leaves skin refreshed.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 299,
      originalPrice: 399,
      deposit: 0,
      color: 'Orange',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['st ives', 'energizing', 'exfoliating', 'Exfoliating'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'st-ives-energizing-bodywash',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bw3',
      name: 'NIVEA Refreshing Body Wash',
      description: 'Invigorating body wash with natural extracts. Energizes and refreshes skin with every wash.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 325,
      originalPrice: 425,
      deposit: 0,
      color: 'Blue',
      sizes: ['400ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'refreshing', 'energizing', 'Refreshing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-refreshing-bodywash',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bw4',
      name: 'Cetaphil Gentle Cleansing Body Wash',
      description: 'Fragrance-free, gentle body wash for sensitive skin. Cleanses without stripping natural moisture.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 549,
      originalPrice: 699,
      deposit: 0,
      color: 'White',
      sizes: ['295ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'gentle', 'sensitive', 'Sensitive Skin'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-gentle-bodywash',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Skin Care': [
    {
      _id: '17',
      name: 'Cetaphil Gentle Skin Cleanser',
      description: 'Soap-free cleanser ideal for sensitive skin. Maintains skin pH balance while removing dirt and makeup.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 545,
      originalPrice: 645,
      deposit: 0,
      color: 'White',
      sizes: ['250ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'cleanser', 'gentle', 'Cleansers'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-gentle-cleanser-skincare',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '18',
      name: 'The Ordinary Glycolic Acid 7% Toning Solution',
      description: 'Exfoliating toner with glycolic acid. Brightens skin, reduces dark spots, and improves texture.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 750,
      originalPrice: 890,
      deposit: 0,
      color: 'Clear',
      sizes: ['240ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'toner', 'glycolic acid', 'Toners'],
      isFeatured: false,
      isHighlighted: true,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-glycolic-toner',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sc3',
      name: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+',
      description: 'Broad spectrum sunscreen with SPF 50+. Lightweight, non-greasy formula that protects from UV rays.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 699,
      originalPrice: 899,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'sunscreen', 'spf50', 'Sunscreens'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-ultra-sheer-sunscreen',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sc4',
      name: 'L\'Oreal Paris Clay Mask',
      description: 'Purifying clay mask that deep cleanses pores. Removes impurities and excess oil for clear skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 499,
      originalPrice: 649,
      deposit: 0,
      color: 'Green',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['loreal', 'clay mask', 'purifying', 'Masks'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'loreal-clay-mask',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'sc5',
      name: 'Cetaphil Daily Hydrating Lotion',
      description: 'Lightweight daily moisturizer with hyaluronic acid. Provides all-day hydration for normal to dry skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 649,
      originalPrice: 799,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'moisturizer', 'hydrating', 'Moisturizers'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-daily-hydrating-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Hair Care': [
    {
      _id: '19',
      name: 'TRESemmé Keratin Smooth Shampoo',
      description: 'Professional salon-quality shampoo with keratin protein. Reduces frizz by up to 90% for 3 days.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 399,
      originalPrice: 499,
      deposit: 0,
      color: 'White',
      sizes: ['580ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['tresemme', 'keratin', 'frizz control', 'Shampoos'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'tresemme-keratin-smooth-shampoo',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '20',
      name: "L'Oreal Paris Total Repair 5 Hair Mask",
      description: 'Professional repairing mask with ceramide and protein. Repairs 5 signs of damaged hair in 1 use.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 599,
      originalPrice: 699,
      deposit: 0,
      color: 'White',
      sizes: ['200g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['loreal', 'hair mask', 'total repair', 'ceramide', 'Hair Masks'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'loreal-total-repair-hair-mask',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'hc3',
      name: 'Pantene Smooth & Sleek Conditioner',
      description: 'Deep conditioning formula that detangles and smooths hair. Leaves hair silky and manageable.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 349,
      originalPrice: 425,
      deposit: 0,
      color: 'White',
      sizes: ['340ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['pantene', 'conditioner', 'smooth', 'Conditioners'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'pantene-smooth-conditioner',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'hc4',
      name: 'Parachute Advansed Hair Oil',
      description: 'Coconut-based hair oil enriched with vitamin E. Nourishes hair from root to tip and prevents breakage.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 199,
      originalPrice: 249,
      deposit: 0,
      color: 'Clear',
      sizes: ['200ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['parachute', 'hair oil', 'coconut', 'Hair Oils'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'parachute-advansed-hair-oil',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Lip Care': [
    {
      _id: '21',
      name: 'NIVEA Original Care Lip Balm',
      description: 'Classic lip balm with shea butter. Provides long-lasting hydration and protection for soft, smooth lips.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 199,
      originalPrice: 249,
      deposit: 0,
      color: 'Blue',
      sizes: ['4.8g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'lip balm', 'shea butter', 'Lip Balms'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-original-lip-balm',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '22',
      name: 'Burt Bees Lip Scrub Exfoliator',
      description: '100% natural exfoliating lip scrub with honey and fine sugar crystals. Gently removes dry, flaky skin.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 695,
      originalPrice: 795,
      deposit: 0,
      color: 'Brown',
      sizes: ['4g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['burt bees', 'lip scrub', 'exfoliator', 'natural', 'Lip Scrubs'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'burt-bees-lip-scrub',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'lc3',
      name: 'Laneige Lip Sleeping Mask',
      description: 'Overnight lip treatment mask with vitamin C. Repairs and hydrates lips while you sleep.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 1299,
      originalPrice: 1599,
      deposit: 0,
      color: 'Pink',
      sizes: ['20g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['laneige', 'lip mask', 'overnight', 'Lip Treatments'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'laneige-lip-sleeping-mask',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'lc4',
      name: 'Maybelline Baby Lips Tinted Balm',
      description: 'Tinted lip balm with SPF 20. Adds a hint of color while keeping lips soft and protected.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 199,
      originalPrice: 249,
      deposit: 0,
      color: 'Various',
      sizes: ['4g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['maybelline', 'baby lips', 'tinted', 'Tinted Balms'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'maybelline-baby-lips-tinted',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Eye Care': [
    {
      _id: '23',
      name: "Kiehl's Creamy Eye Treatment with Avocado",
      description: 'Rich, creamy formula with avocado oil and shea butter. Visibly reduces dark circles and puffiness.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 4200,
      originalPrice: 4800,
      deposit: 0,
      color: 'Green',
      sizes: ['28g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['kiehls', 'eye cream', 'avocado', 'dark circles', 'Eye Creams'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'kiehls-avocado-eye-treatment',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '24',
      name: 'The Ordinary Caffeine Solution 5% + EGCG',
      description: 'High-strength caffeine and epigallocatechin gallate. Reduces look of eye contour pigmentation and puffiness.',
        images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 750,
      originalPrice: 890,
      deposit: 0,
      color: 'Clear',
      sizes: ['30ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['the ordinary', 'caffeine', 'eye serum', 'puffiness', 'Eye Serums'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'ordinary-caffeine-eye-serum',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'ec3',
      name: 'Garnier SkinActive Hydrating Eye Mask',
      description: 'Instant hydrating eye mask with hyaluronic acid. Reduces puffiness and refreshes tired eyes in 15 minutes.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 299,
      originalPrice: 399,
      deposit: 0,
      color: 'White',
      sizes: ['6 sheets'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['garnier', 'eye mask', 'hydrating', 'Eye Masks'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'garnier-hydrating-eye-mask',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'ec4',
      name: 'Olay Eyes Ultimate Eye Cream',
      description: 'Advanced anti-aging eye cream that targets under-eye concerns. Reduces dark circles, fine lines, and puffiness.',
      images: ['https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg','https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg'],
      price: 999,
      originalPrice: 1299,
      deposit: 0,
      color: 'White',
      sizes: ['15ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['olay', 'eye cream', 'anti-aging', 'Under Eye'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'olay-eyes-ultimate-cream',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Woman Dress': [
    {
      _id: 'wd1',
      name: 'Floral Maxi Dress',
      description: 'Elegant floral print maxi dress perfect for summer occasions. Flowy and comfortable.',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 1299,
      originalPrice: 1999,
      deposit: 500,
      color: 'Floral',
      sizes: ['S', 'M', 'L', 'XL'],
      rentalDuration: 3,
      condition: 'New',
      tags: ['dress', 'maxi', 'floral', 'summer'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'floral-maxi-dress',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wd2',
      name: 'Cocktail Party Dress',
      description: 'Stylish cocktail dress for evening parties. Perfect fit and elegant design.',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 1499,
      originalPrice: 2499,
      deposit: 600,
      color: 'Black',
      sizes: ['S', 'M', 'L'],
      rentalDuration: 2,
      condition: 'New',
      tags: ['dress', 'cocktail', 'party', 'evening'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cocktail-party-dress',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Jeans': [
    {
      _id: 'j1',
      name: 'High Waist Skinny Jeans',
      description: 'Comfortable high waist skinny jeans. Perfect fit and stretchable fabric.',
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 899,
      originalPrice: 1499,
      deposit: 400,
      color: 'Blue',
      sizes: ['28', '30', '32', '34'],
      rentalDuration: 5,
      condition: 'New',
      tags: ['jeans', 'skinny', 'high-waist'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'high-waist-skinny-jeans',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'T-Shirt': [
    {
      _id: 'ts1',
      name: 'Casual Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt. Perfect for everyday wear.',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 499,
      originalPrice: 799,
      deposit: 200,
      color: 'White',
      sizes: ['S', 'M', 'L', 'XL'],
      rentalDuration: 7,
      condition: 'New',
      tags: ['tshirt', 'cotton', 'casual'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'casual-cotton-tshirt',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Kurti': [
    {
      _id: 'k1',
      name: 'Printed Cotton Kurti',
      description: 'Beautiful printed cotton kurti. Traditional yet modern design.',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 799,
      originalPrice: 1299,
      deposit: 300,
      color: 'Printed',
      sizes: ['S', 'M', 'L', 'XL'],
      rentalDuration: 5,
      condition: 'New',
      tags: ['kurti', 'cotton', 'printed', 'traditional'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'printed-cotton-kurti',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Saree': [
    {
      _id: 's1',
      name: 'Silk Saree',
      description: 'Elegant silk saree for special occasions. Premium quality fabric.',
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 2499,
      originalPrice: 3999,
      deposit: 1000,
      color: 'Red',
      sizes: ['One Size'],
      rentalDuration: 2,
      condition: 'New',
      tags: ['saree', 'silk', 'traditional', 'occasion'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'silk-saree',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Maternity': [
    {
      _id: 'm1',
      name: 'Maternity Maxi Dress',
      description: 'Comfortable maternity maxi dress. Stretchy fabric perfect for expecting mothers.',
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 1199,
      originalPrice: 1999,
      deposit: 500,
      color: 'Navy Blue',
      sizes: ['M', 'L', 'XL'],
      rentalDuration: 7,
      condition: 'New',
      tags: ['maternity', 'dress', 'comfortable'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'maternity-maxi-dress',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Crop Tops': [
    {
      _id: 'ct1',
      name: 'Casual Crop Top',
      description: 'Trendy casual crop top. Perfect for summer outfits.',
      images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 599,
      originalPrice: 999,
      deposit: 250,
      color: 'Pink',
      sizes: ['S', 'M', 'L'],
      rentalDuration: 5,
      condition: 'New',
      tags: ['crop-top', 'casual', 'summer'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'casual-crop-top',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Face Sunscreens': [
    {
      _id: 'fs1',
      name: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+',
      description: 'Lightweight, non-greasy face sunscreen with SPF 50+. Provides broad spectrum protection against UVA and UVB rays.',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 699,
      originalPrice: 899,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'sunscreen', 'spf50', 'face', 'dry-touch'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-ultra-sheer-face-sunscreen',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fs2',
      name: 'La Roche-Posay Anthelios Ultra Light SPF 60',
      description: 'Ultra-lightweight face sunscreen with SPF 60. Suitable for sensitive skin and provides long-lasting protection.',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 1599,
      originalPrice: 1999,
      deposit: 0,
      color: 'White',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['la roche-posay', 'sunscreen', 'spf60', 'face', 'sensitive'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'la-roche-posay-anthelios-face',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'fs3',
      name: 'Cetaphil Sun SPF 50+ Face Lotion',
      description: 'Gentle face sunscreen with SPF 50+. Perfect for sensitive skin, non-comedogenic and fragrance-free.',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 849,
      originalPrice: 1099,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'sunscreen', 'spf50', 'face', 'sensitive'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-sun-face-lotion',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Body Sunscreens': [
    {
      _id: 'bs1',
      name: 'Neutrogena Beach Defense SPF 70 Body Sunscreen',
      description: 'Water-resistant body sunscreen with SPF 70. Perfect for beach and outdoor activities.',
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 899,
      originalPrice: 1199,
      deposit: 0,
      color: 'Yellow',
      sizes: ['177ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'sunscreen', 'spf70', 'body', 'water-resistant'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-beach-defense-body',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bs2',
      name: 'Banana Boat Sport Performance SPF 50',
      description: 'High-performance body sunscreen with SPF 50. Sweat and water resistant for active lifestyles.',
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 649,
      originalPrice: 899,
      deposit: 0,
      color: 'Orange',
      sizes: ['237ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['banana boat', 'sunscreen', 'spf50', 'body', 'sport'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'banana-boat-sport-body',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bs3',
      name: 'Coppertone Sport SPF 50 Body Lotion',
      description: 'Broad spectrum body sunscreen with SPF 50. Provides long-lasting protection during outdoor activities.',
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 599,
      originalPrice: 799,
      deposit: 0,
      color: 'Blue',
      sizes: ['237ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['coppertone', 'sunscreen', 'spf50', 'body', 'sport'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'coppertone-sport-body',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'SPF Moisturizers': [
    {
      _id: 'spf1',
      name: 'Cetaphil Daily Facial Moisturizer SPF 30',
      description: 'Daily face moisturizer with SPF 30. Hydrates and protects in one step, perfect for everyday use.',
      images: ['https://images.unsplash.com/photo-1570172619644-dfd2ed8abbbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 749,
      originalPrice: 899,
      deposit: 0,
      color: 'White',
      sizes: ['88ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['cetaphil', 'moisturizer', 'spf30', 'daily', 'face'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'cetaphil-daily-spf-moisturizer',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'spf2',
      name: 'Olay Complete Daily Moisturizer SPF 30',
      description: 'Complete daily moisturizer with SPF 30. Provides hydration and sun protection for all skin types.',
      images: ['https://images.unsplash.com/photo-1570172619644-dfd2ed8abbbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 599,
      originalPrice: 799,
      deposit: 0,
      color: 'White',
      sizes: ['118ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['olay', 'moisturizer', 'spf30', 'daily', 'complete'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'olay-complete-spf-moisturizer',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'spf3',
      name: 'Neutrogena Hydro Boost Water Gel SPF 30',
      description: 'Hydrating water gel with SPF 30. Lightweight formula that provides intense hydration and sun protection.',
      images: ['https://images.unsplash.com/photo-1570172619644-dfd2ed8abbbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 999,
      originalPrice: 1299,
      deposit: 0,
      color: 'Blue',
      sizes: ['50g'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['neutrogena', 'hydro boost', 'spf30', 'water gel', 'hydrating'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'neutrogena-hydro-boost-spf',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Sun Protection Kits': [
    {
      _id: 'spk1',
      name: 'Complete Sun Protection Kit',
      description: 'Complete sun protection kit including face sunscreen, body sunscreen, lip balm with SPF, and after-sun lotion.',
      images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 2499,
      originalPrice: 3499,
      deposit: 0,
      color: 'Multi',
      sizes: ['Kit'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['kit', 'sunscreen', 'complete', 'protection', 'bundle'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'complete-sun-protection-kit',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'spk2',
      name: 'Travel Sun Protection Kit',
      description: 'Compact travel-sized sun protection kit perfect for vacations. Includes face and body sunscreen in travel sizes.',
      images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 1299,
      originalPrice: 1799,
      deposit: 0,
      color: 'Multi',
      sizes: ['Travel Kit'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['kit', 'travel', 'sunscreen', 'compact', 'vacation'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'travel-sun-protection-kit',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "Men's Perfume": [
    {
      _id: 'mp1',
      name: 'Davidoff Cool Water Men Eau de Toilette',
      description: 'Fresh and aquatic fragrance for men. A classic scent with notes of sea water, mint, and lavender.',
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 2499,
      originalPrice: 3299,
      deposit: 0,
      color: 'Blue',
      sizes: ['100ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['davidoff', 'cool water', 'men', 'eau de toilette', 'fresh'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'davidoff-cool-water-men',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mp2',
      name: 'Hugo Boss Bottled Men Eau de Toilette',
      description: 'Sophisticated and elegant fragrance with apple, plum, and oakmoss notes. Perfect for the modern gentleman.',
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 3499,
      originalPrice: 4499,
      deposit: 0,
      color: 'Brown',
      sizes: ['100ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['hugo boss', 'bottled', 'men', 'elegant', 'sophisticated'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'hugo-boss-bottled-men',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mp3',
      name: 'Calvin Klein Eternity Men Eau de Toilette',
      description: 'Timeless fragrance with fresh citrus and warm woody notes. A signature scent for confident men.',
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 2199,
      originalPrice: 2999,
      deposit: 0,
      color: 'White',
      sizes: ['100ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['calvin klein', 'eternity', 'men', 'citrus', 'woody'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'calvin-klein-eternity-men',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "Women's Perfume": [
    {
      _id: 'wp1',
      name: 'Chanel Coco Mademoiselle Eau de Parfum',
      description: 'Elegant and feminine fragrance with notes of orange, rose, and patchouli. A timeless classic.',
      images: ['https://images.unsplash.com/photo-1595425970377-c970029bfaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 8999,
      originalPrice: 10999,
      deposit: 0,
      color: 'Pink',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['chanel', 'coco mademoiselle', 'women', 'eau de parfum', 'elegant'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'chanel-coco-mademoiselle',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wp2',
      name: 'Dior J\'adore Eau de Parfum',
      description: 'Luxurious floral fragrance with ylang-ylang, rose, and jasmine. A sophisticated and sensual scent.',
      images: ['https://images.unsplash.com/photo-1595425970377-c970029bfaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 7999,
      originalPrice: 9999,
      deposit: 0,
      color: 'Gold',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['dior', 'jadore', 'women', 'floral', 'luxurious'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'dior-jadore',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'wp3',
      name: 'Victoria\'s Secret Bombshell Eau de Parfum',
      description: 'Fruity and floral fragrance with passionfruit, peony, and vanilla. Bold and confident scent.',
      images: ['https://images.unsplash.com/photo-1595425970377-c970029bfaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 2999,
      originalPrice: 3999,
      deposit: 0,
      color: 'Pink',
      sizes: ['50ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['victorias secret', 'bombshell', 'women', 'fruity', 'floral'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'victorias-secret-bombshell',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Body Sprays': [
    {
      _id: 'bs1',
      name: 'Axe Body Spray Dark Temptation',
      description: 'Long-lasting body spray with chocolate and vanilla notes. Provides 48-hour freshness.',
      images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 299,
      originalPrice: 399,
      deposit: 0,
      color: 'Black',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['axe', 'dark temptation', 'body spray', 'men', 'fresh'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'axe-dark-temptation-body-spray',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bs2',
      name: 'Fogg Body Spray Impressio',
      description: 'Refreshing body spray with a unique fragrance. Perfect for daily use and instant freshness.',
      images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 249,
      originalPrice: 349,
      deposit: 0,
      color: 'Blue',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['fogg', 'impressio', 'body spray', 'fresh', 'daily'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'fogg-impressio-body-spray',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'bs3',
      name: 'Nivea Body Spray Fresh Active',
      description: 'Lightweight body spray with a fresh and clean scent. Provides all-day freshness and confidence.',
      images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 199,
      originalPrice: 299,
      deposit: 0,
      color: 'Green',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'fresh active', 'body spray', 'fresh', 'clean'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-fresh-active-body-spray',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  'Deodorants': [
    {
      _id: 'd1',
      name: 'Nivea Men Deodorant Fresh Active',
      description: '48-hour protection deodorant with fresh active formula. Keeps you dry and fresh all day long.',
      images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 179,
      originalPrice: 249,
      deposit: 0,
      color: 'Blue',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['nivea', 'men', 'deodorant', 'fresh active', '48-hour'],
      isFeatured: true,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'nivea-men-fresh-active-deodorant',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'd2',
      name: 'Dove Men+Care Deodorant Clean Comfort',
      description: 'Gentle deodorant with 48-hour protection. Formulated with 1/4 moisturizing cream for skin care.',
      images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 199,
      originalPrice: 279,
      deposit: 0,
      color: 'Blue',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['dove', 'men care', 'deodorant', 'clean comfort', 'moisturizing'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'dove-men-care-clean-comfort',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'd3',
      name: 'Rexona Women Deodorant Cotton Dry',
      description: 'Long-lasting protection deodorant for women. Keeps you fresh and dry with a soft cotton scent.',
      images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      price: 149,
      originalPrice: 199,
      deposit: 0,
      color: 'Pink',
      sizes: ['150ml'],
      rentalDuration: 0,
      condition: 'New',
      tags: ['rexona', 'women', 'deodorant', 'cotton dry', 'fresh'],
      isFeatured: false,
      isHighlighted: false,
      highlightOrder: 0,
      isAvailable: true,
      views: 0,
      slug: 'rexona-women-cotton-dry',
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
// Generate random rating between 3.5 and 5.0
const getRandomRating = (): number => {
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
};

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<LocalProduct | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Decode category name from URL
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : '';
  const subcategoryName = searchParams.get('subcategory');
  
  // Determine if this is a beauty-related page
  const beautyCategories = ['Skin Care', 'Hair Care', 'Lip Care', 'Eye Care', 'Winter Moisturizers', 'Winter Body lotions', 'Lip Bams', 'Face Creams', 'Facewash', 'Moisturizer', 'Serum', 'Makeup', 'Shampoo', 'Bodywash'];
  const clothingCategories = ['Woman Dress', 'Jeans', 'T-Shirt', 'Kurti', 'Saree', 'Maternity', 'Crop Tops'];
  const isBeautyPage = beautyCategories.includes(decodedCategoryName) || location.pathname.startsWith('/beauty');
  const isClothingPage = clothingCategories.includes(decodedCategoryName);
  
  // Get all products for the category
  const allProducts = categoryProducts[decodedCategoryName] || [];
  
  // Get unique tags from all products for filter options
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allProducts.forEach(product => {
      product.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [allProducts]);
  
  // Filter products
  const products = useMemo(() => {
    let filtered = allProducts;
    
    // Filter by subcategory if provided
    if (subcategoryName) {
      const decodedSubcategory = decodeURIComponent(subcategoryName);
      filtered = filtered.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(decodedSubcategory.toLowerCase());
        const tagMatch = product.tags.some(tag => 
          tag.toLowerCase().includes(decodedSubcategory.toLowerCase())
        );
        return nameMatch || tagMatch;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }
    
    return filtered;
  }, [allProducts, subcategoryName, searchQuery, selectedTags]);

  const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const handleAddToBag = (product: LocalProduct) => {
    if (!isAuthenticated) {
      setPendingProduct(product);
      setShowRegistrationModal(true);
      return;
    }

    // Convert LocalProduct to Product for cart
    const productForCart: Product = {
      ...product,
      sizes: typeof product.sizes[0] === 'string' 
        ? product.sizes.map(size => ({ size, isAvailable: true, quantity: 10 }))
        : product.sizes as Array<{ size: string; isAvailable: boolean; quantity: number }>
    };
    addToCart(productForCart);
  };

  const handleRegistrationSuccess = () => {
    if (pendingProduct) {
      const productForCart: Product = {
        ...pendingProduct,
        sizes: typeof pendingProduct.sizes[0] === 'string' 
          ? pendingProduct.sizes.map(size => ({ size, isAvailable: true, quantity: 10 }))
          : pendingProduct.sizes as Array<{ size: string; isAvailable: boolean; quantity: number }>
      };
      addToCart(productForCart);
      setPendingProduct(null);
    }
  };

  const handleIncreaseQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.product._id === productId);
    if (cartItem) {
      updateQuantity(productId, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.product._id === productId);
    if (cartItem) {
      updateQuantity(productId, cartItem.quantity - 1);
    }
  };

  const handleWishlistToggle = (product: LocalProduct) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      // Convert LocalProduct to Product for wishlist
      const productForWishlist: Product = {
        ...product,
        sizes: typeof product.sizes[0] === 'string' 
          ? product.sizes.map(size => ({ size, isAvailable: true, quantity: 10 }))
          : product.sizes as Array<{ size: string; isAvailable: boolean; quantity: number }>
      };
      addToWishlist(productForWishlist);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [categoryName, subcategoryName]);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {isBeautyPage ? <BeautyHeader /> : <Header />}
  
      <div className="container mx-auto px-4 py-8">
        {/* Back Button and Category Title */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {decodedCategoryName || 'Products'}
            </h1>
            {subcategoryName && (
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Subcategory: {decodeURIComponent(subcategoryName)}
              </p>
            )}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Horizontal Scrollable Tag Filters */}
        {availableTags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`flex-shrink-0 px-4 py-2 text-sm rounded-full border transition-colors whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? 'bg-[#FFDBAC] border-[#FFDBAC] text-gray-900 font-semibold'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-[#FFDBAC]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {(selectedTags.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {products.length} of {allProducts.length} products
        </div>
  
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 ">
            {products.map((product) => {
              const rating = getRandomRating();
              const discountPercentage = calculateDiscountPercentage(
                product.originalPrice,
                product.price
              );
              const inWishlist = isInWishlist(product._id);
              const cartItem = cartItems.find(item => item.product._id === product._id);
              const quantity = cartItem?.quantity || 0;
              const isInCart = quantity > 0;
  
              return (
                <div
                  key={product._id}
                  className="border border-gray-200 p-4 bg-white hover:border-gray-300 transition-colors flex flex-col h-full"
                >
                  {/* Product Image - Fixed height */}
                  <div className="mb-3 md:mb-4 aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
  
                  {/* Product Info - Flex grow to take remaining space */}
                  <div className="flex flex-col flex-grow space-y-2 md:space-y-3">
                    {/* Product Name */}
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] flex items-start">
                      {product.name}
                    </h3>
  
                    {/* Description */}
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
  
                    {/* Size Display - Consistent spacing */}
                    <div className={`${product.sizes && product.sizes.length > 0 ? 'min-h-[2rem]' : 'min-h-[1rem]'}`}>
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-500">Size:</span>
                          <div className="flex gap-1 flex-wrap">
                            {product.sizes.map((sizeItem, idx) => {
                              const size = typeof sizeItem === 'string' ? sizeItem : sizeItem.size;
                              return (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700"
                                >
                                  {size}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
  
                    {/* Rating - Fixed height */}
                    <div className="flex items-center gap-2 min-h-[1.5rem]">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">{rating}</span>
                    </div>
  
                    {/* Price Section - Fixed height */}
                    <div className="flex items-center gap-2 md:gap-3 min-h-[2rem]">
                      <span className="text-base md:text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-green-600">
                        {discountPercentage}% OFF
                      </span>
                    </div>
  
                    {/* Action Buttons - Fixed at bottom */}
                    <div className="flex gap-2 pt-2 md:pt-3 mt-auto">
                      {isInCart ? (
                        <div className="flex-1 flex items-center justify-between gap-2 px-2 md:px-3 py-2 border border-gray-300 bg-white rounded">
                          <button
                            onClick={() => handleDecreaseQuantity(product._id)}
                            className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                          </button>
                          <span className="text-xs md:text-sm font-semibold text-gray-900 min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(product._id)}
                            className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToBag(product)}
                          className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-xs md:text-base font-medium transition-colors bg-[#FFDBAC] text-gray-900 hover:bg-[#e6c59a]"
                        >
                          <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                          Add to Bag
                        </button>
                      )}
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className={`px-2 md:px-4 py-2 border transition-colors flex-shrink-0 ${inWishlist
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        <Heart
                          className={`w-4 h-4 md:w-5 md:h-5 ${inWishlist ? 'fill-red-500' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">
              No products found.
            </p>
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-[#FFDBAC] hover:underline"
              >
                Clear filters to see all products
              </button>
            )}
          </div>
        )}
      </div>
  
      <Footer />
      
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => {
          setShowRegistrationModal(false);
          setPendingProduct(null);
        }}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
};

export default CategoryProducts;

