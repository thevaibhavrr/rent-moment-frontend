import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/services/api";

interface ProductGridProps {
  category?: string;
}

const ProductGrid = ({ category = "All" }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the API hook to fetch products with pagination
  const { data: productsData, isLoading, error } = useProducts({
    category: category === "All" ? undefined : category,
    page: currentPage,
    limit: 20, // 20 products per page
    sort: 'createdAt',
    order: 'desc'
  });

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const products = productsData?.products || [];

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              {category === "All" ? "Featured Collection" : category}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium designer pieces for rent
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="product-card animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
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
    <section className="py-12 bg-gray-50">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            {category === "All" ? "Featured Collection" : category}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium designer pieces for rent
          </p>
          {productsData && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {products.length} of {productsData.total} products
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {products.map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category
            </p>
          </div>
        )}

        {/* Pagination */}
        {productsData && productsData.totalPages > 1 && (
          <Pagination
            currentPage={productsData.currentPage}
            totalPages={productsData.totalPages}
            onPageChange={handlePageChange}
            hasNextPage={productsData.hasNextPage}
            hasPrevPage={productsData.hasPrevPage}
          />
        )}
      </div>
    </section>
  );
};

export default ProductGrid;