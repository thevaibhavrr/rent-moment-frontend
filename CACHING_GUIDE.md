# LocalStorage Caching Implementation

## Overview
This implementation adds localStorage-based caching to the frontend application to prevent repeated API calls when users navigate between pages. Data is cached for 10 minutes to ensure a good balance between performance and data freshness.

## Features

### 1. Cache Manager (`utils/cache.ts`)
- **Singleton pattern**: Single instance manages all caching operations
- **Automatic expiration**: Data expires after 10 minutes (configurable)
- **Type-safe**: Full TypeScript support with generics
- **Error handling**: Graceful fallback when localStorage is unavailable
- **Cache utilities**: Methods to check, clear, and inspect cache

### 2. API Service Integration (`services/api.ts`)
- **Transparent caching**: All API calls automatically check cache first
- **Smart cache keys**: Unique keys based on parameters (page, filters, etc.)
- **Console logging**: Development-friendly logging to track cache hits/misses
- **Fallback behavior**: Falls back to API when cache is empty or expired

### 3. Data Layer (`data/products.ts`)
- **Cache utilities**: Helper functions to manage cache
- **Cache status**: Functions to check if data is cached
- **Selective clearing**: Clear specific cache types (categories, products, etc.)

### 4. Development Tools (`components/CacheDebugger.tsx`)
- **Real-time monitoring**: Shows cache status and expiration times
- **Cache management**: Buttons to clear specific or all cache
- **Development only**: Only shows in development mode
- **Visual feedback**: Shows cache size and time remaining

## How It Works

### Cache Flow
1. **First Request**: API call is made, data is cached with timestamp
2. **Subsequent Requests**: Cache is checked first
3. **Cache Hit**: Data is returned immediately from localStorage
4. **Cache Miss/Expired**: API call is made, new data is cached

### Cache Keys
- `categories`: All categories
- `category_slug_{slug}`: Individual category by slug
- `products_{page}_{limit}_{filters}`: Products with pagination and filters
- `product_{id}`: Individual product by ID
- `products_category_{categoryId}_{page}_{limit}`: Products by category

### Expiration Strategy
- **Default**: 10 minutes (600,000ms)
- **Automatic cleanup**: Expired items are removed when accessed
- **Manual clearing**: Available through debugger or programmatically

## Usage Examples

### Basic Usage
```typescript
// Data fetching functions automatically use cache
const categories = await getCategories(); // First call: API + cache
const categories2 = await getCategories(); // Second call: cache only

// Check if data is cached
if (isCategoriesCached()) {
  console.log('Categories are cached');
}
```

### Cache Management
```typescript
// Clear specific cache
clearCategoriesCache();
clearProductsCache();

// Clear all cache
clearCache();

// Get cache information
const info = getCacheInfo();
console.log('Cache info:', info);
```

### Development Debugging
- The CacheDebugger component shows in development mode
- Click the 🗄️ icon in bottom-right corner
- Monitor cache status, size, and expiration times
- Clear cache for testing

## Benefits

### Performance
- **Faster page loads**: Cached data loads instantly
- **Reduced API calls**: Less server load and bandwidth usage
- **Better UX**: No loading spinners for cached data

### User Experience
- **Instant navigation**: Moving between pages is much faster
- **Offline resilience**: Cached data available even with poor connectivity
- **Consistent state**: Same data across page refreshes

### Development
- **Easy debugging**: Visual cache status and management
- **Configurable**: Easy to adjust cache duration
- **Type-safe**: Full TypeScript support

## Configuration

### Cache Duration
```typescript
// In utils/cache.ts
private readonly DEFAULT_EXPIRY = 10 * 60 * 1000; // 10 minutes

// Or per-call
cache.set(key, data, 5 * 60 * 1000); // 5 minutes
```

### Cache Keys
```typescript
// In utils/cache.ts
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  // Add new keys as needed
} as const;
```

## Browser Compatibility
- **localStorage**: Supported in all modern browsers
- **Fallback**: Graceful degradation when localStorage is unavailable
- **Size limits**: localStorage typically has 5-10MB limit (sufficient for this use case)

## Monitoring
- **Console logs**: All cache operations are logged in development
- **Cache debugger**: Visual interface for monitoring
- **Cache info**: Programmatic access to cache statistics

## Best Practices
1. **Cache frequently accessed data**: Categories, featured products
2. **Use appropriate expiration**: Balance freshness vs performance
3. **Clear cache on user actions**: When user adds/removes items
4. **Monitor cache size**: Ensure it doesn't grow too large
5. **Test cache behavior**: Verify cache hits/misses work correctly

## Troubleshooting

### Cache Not Working
- Check browser console for errors
- Verify localStorage is available
- Check cache debugger for status

### Data Not Updating
- Clear cache manually or wait for expiration
- Check if API response format changed
- Verify cache keys are consistent

### Performance Issues
- Monitor cache size in debugger
- Clear old cache entries
- Adjust cache expiration time
