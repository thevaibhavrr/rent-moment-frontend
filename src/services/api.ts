// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = 'https://rent-moment-backend-971455500628.asia-south1.run.app/api';



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
  isHighlighted: boolean;
  highlightOrder: number;
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

export interface Supercategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BeautyCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  supercategory: string | Supercategory;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  products: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface WinterCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface SummerCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClothCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface WomanCareCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface KidsCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PerfumeCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
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

  async getFeaturedProducts(limit?: number): Promise<ApiResponse<{ products: Product[] }>> {
    const params = limit ? `?limit=${limit}` : '';
    return this.request<{ products: Product[] }>(`/products/featured${params}`);
  }

  async getHighlightedProducts(limit?: number): Promise<ApiResponse<{ products: Product[] }>> {
    const params = limit ? `?limit=${limit}` : '';
    return this.request<{ products: Product[] }>(`/products/highlighted${params}`);
  }

  // Highlighted Products Management
  async highlightProduct(productId: string): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>(`/products/highlight/${productId}`, {
      method: 'POST'
    });
  }

  async unhighlightProduct(productId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/products/highlight/${productId}`, {
      method: 'DELETE'
    });
  }

  async updateHighlightOrder(products: Array<{ id: string; order: number }>): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/products/highlight/order', {
      method: 'PUT',
      body: JSON.stringify({ products })
    });
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

  // Supercategories API (Beauty Section)
  async getSupercategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ supercategories: Supercategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/supercategories${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ supercategories: Supercategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getSupercategoryById(id: string): Promise<ApiResponse<{ supercategory: Supercategory }>> {
    return this.request<{ supercategory: Supercategory }>(`/supercategories/${id}`);
  }

  // Beauty Categories API
  async getBeautyCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    supercategory?: string;
  } = {}): Promise<ApiResponse<{ categories: BeautyCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/beauty-categories${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ categories: BeautyCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getBeautyCategoryById(id: string): Promise<ApiResponse<{ category: BeautyCategory }>> {
    return this.request<{ category: BeautyCategory }>(`/beauty-categories/${id}`);
  }

  // Routine Categories API (Beauty Section)
  async getRoutineCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: RoutineCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/routine-categories${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ categories: RoutineCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getRoutineCategoryById(id: string): Promise<ApiResponse<{ category: RoutineCategory }>> {
    return this.request<{ category: RoutineCategory }>(`/routine-categories/${id}`);
  }

  // Winter Categories API
  async getWinterCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: WinterCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/winter-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: WinterCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getWinterCategoryById(id: string): Promise<ApiResponse<{ category: WinterCategory }>> {
    return this.request<{ category: WinterCategory }>(`/winter-categories/${id}`);
  }

  // Summer Categories API
  async getSummerCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: SummerCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/summer-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: SummerCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getSummerCategoryById(id: string): Promise<ApiResponse<{ category: SummerCategory }>> {
    return this.request<{ category: SummerCategory }>(`/summer-categories/${id}`);
  }

  // Cloth Categories API
  async getClothCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: ClothCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/cloth-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: ClothCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getClothCategoryById(id: string): Promise<ApiResponse<{ category: ClothCategory }>> {
    return this.request<{ category: ClothCategory }>(`/cloth-categories/${id}`);
  }

  // Woman Care Categories API
  async getWomanCareCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: WomanCareCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/woman-care-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: WomanCareCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getWomanCareCategoryById(id: string): Promise<ApiResponse<{ category: WomanCareCategory }>> {
    return this.request<{ category: WomanCareCategory }>(`/woman-care-categories/${id}`);
  }

  // Kids Categories API
  async getKidsCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: KidsCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/kids-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: KidsCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getKidsCategoryById(id: string): Promise<ApiResponse<{ category: KidsCategory }>> {
    return this.request<{ category: KidsCategory }>(`/kids-categories/${id}`);
  }

  // Perfume Categories API
  async getPerfumeCategories(params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<{ categories: PerfumeCategory[]; totalPages: number; currentPage: number; total: number }>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    const endpoint = `/perfume-categories${queryString ? `?${queryString}` : ''}`;
    return this.request<{ categories: PerfumeCategory[]; totalPages: number; currentPage: number; total: number }>(endpoint);
  }

  async getPerfumeCategoryById(id: string): Promise<ApiResponse<{ category: PerfumeCategory }>> {
    return this.request<{ category: PerfumeCategory }>(`/perfume-categories/${id}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; message: string }>> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;

