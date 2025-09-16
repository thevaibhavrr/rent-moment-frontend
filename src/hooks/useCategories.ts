import { useQuery } from '@tanstack/react-query';
import { apiService, Category, CategoriesResponse } from '@/services/api';

export const useCategories = (params: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
} = {}) => {
  return useQuery<CategoriesResponse, Error>({
    queryKey: ['categories', params],
    queryFn: async () => {
      const response = await apiService.getCategories(params);
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - categories change less frequently
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCategory = (id: string) => {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await apiService.getCategoryById(id);
      return response.data.category;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery<Category, Error>({
    queryKey: ['category', 'slug', slug],
    queryFn: async () => {
      const response = await apiService.getCategoryBySlug(slug);
      return response.data.category;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useAllCategories = () => {
  return useCategories({
    limit: 100, // Get all categories
    sort: 'sortOrder',
    order: 'asc',
  });
};

