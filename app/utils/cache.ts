interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // in milliseconds
}

class CacheManager {
  private static instance: CacheManager;
  private readonly CACHE_PREFIX = 'rent_moment_cache_';
  private readonly DEFAULT_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private getCacheKey(key: string): string {
    return `${this.CACHE_PREFIX}${key}`;
  }

  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.expiresIn;
  }

  set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRY): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiresIn
      };
      
      const cacheKey = this.getCacheKey(key);
      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const cacheKey = this.getCacheKey(key);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      
      if (this.isExpired(cacheItem)) {
        this.delete(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      this.delete(key);
      return null;
    }
  }

  delete(key: string): void {
    try {
      const cacheKey = this.getCacheKey(key);
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn('Failed to delete cached data:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  // Get cache info for debugging
  getCacheInfo(): { key: string; size: number; expiresAt: Date }[] {
    const info: { key: string; size: number; expiresAt: Date }[] = [];
    
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheItem: CacheItem<any> = JSON.parse(cached);
            const originalKey = key.replace(this.CACHE_PREFIX, '');
            info.push({
              key: originalKey,
              size: cached.length,
              expiresAt: new Date(cacheItem.timestamp + cacheItem.expiresIn)
            });
          }
        }
      });
    } catch (error) {
      console.warn('Failed to get cache info:', error);
    }
    
    return info;
  }

  // Check if cache exists and is valid
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Get remaining time until expiry (in milliseconds)
  getTimeUntilExpiry(key: string): number {
    try {
      const cacheKey = this.getCacheKey(key);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        return 0;
      }

      const cacheItem: CacheItem<any> = JSON.parse(cached);
      const remaining = cacheItem.expiresIn - (Date.now() - cacheItem.timestamp);
      return Math.max(0, remaining);
    } catch (error) {
      return 0;
    }
  }
}

// Export singleton instance
export const cache = CacheManager.getInstance();

// Helper function to create cache keys
export const createCacheKey = (...parts: (string | number)[]): string => {
  return parts.join('_');
};

// Cache key constants
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  PRODUCT_BY_ID: 'product',
  CATEGORY_BY_SLUG: 'category_slug',
  PRODUCTS_BY_CATEGORY: 'products_category',
  FEATURED_PRODUCTS: 'featured_products',
  USER_DATA: 'user_data'
} as const;
