# API Integration Guide

This document describes how the luxe-rent-couture frontend has been integrated with the backend API.

## Backend API Endpoints

The frontend now connects to the following backend endpoints:

### Products API
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/category/:categoryId` - Get products by category

### Categories API
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category by ID
- `GET /api/categories/slug/:slug` - Get category by slug

## Frontend Integration

### API Service Layer
- **File**: `src/services/api.ts`
- **Purpose**: Centralized API communication with proper TypeScript interfaces
- **Features**: Error handling, request/response typing, environment configuration

### React Query Hooks
- **File**: `src/hooks/useProducts.ts`
- **Purpose**: Data fetching hooks for products with caching and error handling
- **File**: `src/hooks/useCategories.ts`
- **Purpose**: Data fetching hooks for categories with caching and error handling

### Updated Components

#### CategoryBar Component
- Now fetches categories from the API
- Shows loading states and error fallbacks
- Uses category slugs for navigation

#### ProductCard Component
- Updated to work with real API data structure
- Displays actual product information (price, images, rental duration)
- Uses product IDs for navigation

#### ProductGrid Component
- Fetches products based on selected category
- Implements loading states and error handling
- Supports pagination and filtering

#### ProductDetail Page
- Fetches individual product data by ID
- Displays real product information and images
- Shows actual sizes and availability

#### Search Page
- Implements real search functionality
- Shows dynamic categories from API
- Displays search results with real product data

## Environment Configuration

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update the URL to your deployed backend:

```env
VITE_API_URL=https://your-backend-url.com/api
```

## Features Implemented

### ✅ Real Data Integration
- Products are fetched from the backend API
- Categories are dynamically loaded
- Product details show real information

### ✅ Loading States
- Skeleton loading for products and categories
- Proper loading indicators during API calls

### ✅ Error Handling
- Graceful error handling with fallback UI
- Retry mechanisms for failed requests
- User-friendly error messages

### ✅ Caching
- React Query provides automatic caching
- Optimized data fetching with stale-while-revalidate
- Reduced API calls through intelligent caching

### ✅ TypeScript Support
- Full TypeScript interfaces for API responses
- Type-safe data handling throughout the application
- IntelliSense support for better development experience

## Running the Application

1. **Start the Backend Server**:
   ```bash
   cd cloth-backend
   npm start
   ```

2. **Start the Frontend Development Server**:
   ```bash
   cd luxe-rent-couture
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## API Response Format

The backend API returns data in the following format:

```typescript
{
  success: boolean;
  data: {
    products: Product[];
    totalPages: number;
    currentPage: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message?: string;
}
```

## Product Data Structure

```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  deposit?: number;
  color: string;
  sizes: Array<{
    size: string;
    isAvailable: boolean;
    quantity: number;
  }>;
  rentalDuration: number;
  condition: string;
  brand?: string;
  material?: string;
  tags: string[];
  careInstructions?: string;
  isFeatured: boolean;
  isAvailable: boolean;
  views: number;
  slug: string;
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
```

## Category Data Structure

```typescript
interface Category {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Next Steps

1. **Authentication Integration**: Add user authentication and protected routes
2. **Cart Functionality**: Implement shopping cart with API integration
3. **Order Management**: Add order placement and tracking
4. **User Profile**: Implement user profile management
5. **Payment Integration**: Add payment processing
6. **Admin Panel**: Connect to the existing admin panel for content management

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration includes your frontend URL
2. **API Connection**: Verify the backend server is running on the correct port
3. **Environment Variables**: Check that `.env.local` is properly configured
4. **Network Issues**: Ensure both frontend and backend are accessible

### Debug Mode

To enable debug logging, add this to your environment:

```env
VITE_DEBUG=true
```

This will log all API requests and responses to the browser console.

