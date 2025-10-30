import { useState, useEffect } from 'react';
import { apiService, Product } from '../services/api';

export const useHighlightedProducts = (limit?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHighlightedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getHighlightedProducts(limit);
        setProducts(response.data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch highlighted products');
        console.error('Error fetching highlighted products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProducts();
  }, [limit]);

  return { products, loading, error };
};
