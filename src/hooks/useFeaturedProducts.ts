import { useState, useEffect } from 'react';
import { apiService, Product } from '../services/api';

export const useFeaturedProducts = (limit?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getFeaturedProducts(limit);
        setProducts(response.data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

  return { products, loading, error };
};
