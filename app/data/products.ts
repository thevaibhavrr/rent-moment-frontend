import { apiService } from '../services/api';
import { Category, Product, PaginatedResponse } from '../types';
import { cache, CACHE_KEYS } from '../utils/cache';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    return await apiService.getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get category by ID
export async function getCategoryById(id: string): Promise<Category> {
  try {
    return await apiService.getCategory(id);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category> {
  try {
    return await apiService.getCategoryBySlug(slug);
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    throw error;
  }
}

// Get all products with pagination and filters
export async function getProducts(
  page: number = 1,
  limit: number = 12,
  filters: {
    search?: string;
    category?: string;
    featured?: boolean;
    sort?: string;
    order?: string;
  } = {}
): Promise<PaginatedResponse<Product>> {
  try {
    return await apiService.getProducts(page, limit, filters);
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      totalPages: 1,
      currentPage: 1,
      total: 0
    };
  }
}

// Get products by category
export async function getProductsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Product>> {
  try {
    return await apiService.getProductsByCategory(categoryId, page, limit);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return {
      products: [],
      totalPages: 1,
      currentPage: 1,
      total: 0
    };
  }
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product> {
  try {
    return await apiService.getProductBySlug(slug);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product> {
  try {
    return await apiService.getProduct(id);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

// Cache management utilities
export function clearCache(): void {
  cache.clear();
  console.log('All cache cleared');
}

export function clearCategoriesCache(): void {
  cache.delete(CACHE_KEYS.CATEGORIES);
  console.log('Categories cache cleared');
}

export function clearProductsCache(): void {
  // Clear all product-related caches
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.includes('products') || key.includes('product_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('Products cache cleared');
}

export function getCacheInfo(): { key: string; size: number; expiresAt: Date }[] {
  return cache.getCacheInfo();
}

// Check if data is cached
export function isCategoriesCached(): boolean {
  return cache.has(CACHE_KEYS.CATEGORIES);
}

export function isProductCached(productId: string): boolean {
  return cache.has(`product_${productId}`);
} 