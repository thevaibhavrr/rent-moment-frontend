// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = 'https://cloth-backend-tpce.onrender.com/api';

export interface Product {
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
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  Owner?: {
    _id: string;
    name: string;
    mobilenumber: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CategoriesResponse {
  categories: Category[];
  totalPages: number;
  currentPage: number;
  total: number;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products API
  async getProducts(params: {
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
  } = {}): Promise<ApiResponse<ProductsResponse>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ProductsResponse>(endpoint);
  }

  async getProductById(id: string): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>(`/products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>(`/products/slug/${slug}`);
  }

  async getProductsByCategory(
    categoryId: string,
    params: {
      page?: number;
      limit?: number;
      sort?: string;
      order?: 'asc' | 'desc';
    } = {}
  ): Promise<ApiResponse<ProductsResponse>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/products/category/${categoryId}${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ProductsResponse>(endpoint);
  }

  // Categories API
  async getCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<CategoriesResponse>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    return this.request<CategoriesResponse>(endpoint);
  }

  async getCategoryById(id: string): Promise<ApiResponse<{ category: Category }>> {
    return this.request<{ category: Category }>(`/categories/${id}`);
  }

  async getCategoryBySlug(slug: string): Promise<ApiResponse<{ category: Category }>> {
    return this.request<{ category: Category }>(`/categories/slug/${slug}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; message: string }>> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;

