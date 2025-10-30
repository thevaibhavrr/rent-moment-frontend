# 3D Hero Section Features

## Overview
The new 3D Hero section provides an immersive, interactive experience showcasing featured products with advanced 3D carousel functionality.

## Key Features

### 🎨 3D Carousel
- **Perspective-based 3D transforms** for realistic depth
- **Smooth transitions** between products with CSS 3D transforms
- **Auto-play functionality** with pause on hover
- **Navigation controls** (arrows, dots, play/pause)
- **Responsive design** that works on all devices

### 🛍️ Product Showcase
- **Dynamic product selection** - click any product to see details
- **Real-time price display** with original price strikethrough
- **Featured product badges** for highlighted items
- **Smooth content transitions** when switching products

### 🎭 Visual Effects
- **Floating elements** with CSS animations
- **Gradient overlays** for better text readability
- **Glow effects** on interactive elements
- **Smooth hover animations** with 3D transforms
- **Loading states** with elegant spinners

### 🔧 Technical Implementation

#### API Integration
- **Featured products endpoint**: `/api/products/featured`
- **Custom hook**: `useFeaturedProducts` for data fetching
- **Error handling** with fallback UI
- **Loading states** with skeleton screens

#### Components
- **Hero.tsx**: Main hero component with 3D carousel integration
- **ProductCarousel3D.tsx**: 3D carousel component with advanced animations
- **useFeaturedProducts.ts**: Custom hook for API integration

#### Styling
- **CSS 3D transforms** for perspective effects
- **Tailwind CSS** with custom animations
- **Responsive design** with mobile-first approach
- **Accessibility features** with proper ARIA labels

## Usage

### Basic Implementation
```tsx
import Hero from './components/Hero';

function App() {
  return (
    <div>
      <Hero />
    </div>
  );
}
```

### Custom Configuration
The hero section automatically:
- Fetches featured products from the API
- Displays them in a 3D carousel
- Handles loading and error states
- Provides interactive navigation

## API Endpoints

### GET /api/products/featured
Returns featured products for the hero section.

**Query Parameters:**
- `limit` (optional): Number of products to return (default: 6)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "images": ["image_urls"],
        "price": 999,
        "originalPrice": 1999,
        "isFeatured": true,
        "categories": [...],
        "slug": "product-slug"
      }
    ]
  }
}
```

## Customization

### Styling
- Modify colors in `tailwind.config.ts`
- Update animations in `index.css`
- Customize 3D transforms in `ProductCarousel3D.tsx`

### Behavior
- Adjust auto-play timing in `ProductCarousel3D.tsx`
- Modify transition durations in CSS
- Customize hover effects and animations

## Browser Support
- Modern browsers with CSS 3D transform support
- Graceful degradation for older browsers
- Mobile-optimized touch interactions

## Performance
- Optimized image loading with lazy loading
- Efficient 3D transforms using GPU acceleration
- Minimal re-renders with React optimization
- Responsive images with proper sizing

## Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- ARIA labels for interactive elements
