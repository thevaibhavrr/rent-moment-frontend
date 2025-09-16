import { useQuery } from '@tanstack/react-query';
import { apiService, Product, ProductsResponse } from '@/services/api';

export const useProducts = (params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  featured?: boolean;
} = {}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await apiService.getProducts(params);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await apiService.getProductById(id);
      return response.data.product;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', 'slug', slug],
    queryFn: async () => {
      const response = await apiService.getProductBySlug(slug);
      return response.data.product;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductsByCategory = (
  categoryId: string,
  params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}
) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', 'category', categoryId, params],
    queryFn: async () => {
      const response = await apiService.getProductsByCategory(categoryId, params);
      return response.data;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit: number = 8) => {
  return useProducts({
    featured: true,
    limit,
    sort: 'createdAt',
    order: 'desc',
  });
};

