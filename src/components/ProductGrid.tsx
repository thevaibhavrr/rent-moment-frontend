import { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

interface ProductGridProps {
  category?: string;
}

const ProductGrid = ({ category = "All" }: ProductGridProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // Use the API hook to fetch products with pagination
  const { data: productsData, isLoading, error } = useProducts({
    category: category === "All" ? undefined : category,
    page: currentPage,
    limit: 20, // 20 products per page
    sort: 'createdAt',
    order: 'desc'
  });

  // Reset state when category changes
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [category]);

  // Update products when new data arrives
  useEffect(() => {
    if (productsData) {
      if (currentPage === 1) {
        // First page - replace all products
        setAllProducts(productsData.products);
      } else {
        // Subsequent pages - append products
        setAllProducts(prev => [...prev, ...productsData.products]);
      }
      setHasMore(productsData.hasNextPage);
      setIsLoadingMore(false);
    }
  }, [productsData, currentPage]);

  // Load more products
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && !isLoading) {
      setIsLoadingMore(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoadingMore, hasMore, isLoading]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  const products = allProducts;

  // Show initial loading state (only when no products are loaded yet)
  if (isLoading && products.length === 0) {
    return (
      <section className="py-12 bg-gray-50" data-section="products">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              {category === "All" ? "Featured Collection" : category}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium designer pieces for rent
            </p>
            
            {/* Loading spinner for category changes */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <Spinner size="md" />
              <span className="text-sm text-gray-500">Loading products...</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="product-card">
                <Skeleton className="h-64 w-full rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">
              Failed to load products. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-luxury-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12 pt-5 bg-gray-50" data-section="products">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            {category === "All" ? "Featured Collection" : category}
          </h2>
          
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {products.map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {products.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category
            </p>
          </div>
        )}

        {/* Infinite scroll trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center space-x-3">
                <Spinner size="md" />
                <span className="text-sm text-gray-500">Loading more products...</span>
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                Scroll down to load more products
              </div>
            )}
          </div>
        )}

        {/* End of results message */}
        {!hasMore && products.length > 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-400">
              You've reached the end of the collection
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;