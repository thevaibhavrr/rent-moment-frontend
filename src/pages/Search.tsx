import { useState, useEffect } from "react";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: categoriesData, isLoading: categoriesLoading } = useAllCategories();
  const { data: searchResults, isLoading: searchLoading } = useProducts({
    search: searchQuery || undefined,
    category: selectedCategory === "All" ? undefined : selectedCategory,
    page: currentPage,
    limit: 20
  });

  // Reset page when search query or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="luxury-container py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by category, style, or color"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pr-12"
                autoFocus
              />
              <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="luxury-container py-8">
        {searchQuery ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              {searchResults && (
                <p className="text-sm text-gray-500">
                  Showing {searchResults.products.length} of {searchResults.total} products
                </p>
              )}
            </div>
            
            {searchLoading ? (
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
            ) : searchResults?.products && searchResults.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {searchResults.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No results found. Try searching for different keywords.
                </p>
              </div>
            )}

            {/* Pagination for search results */}
            {searchResults && searchResults.totalPages > 1 && (
              <Pagination
                currentPage={searchResults.currentPage}
                totalPages={searchResults.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={searchResults.hasNextPage}
                hasPrevPage={searchResults.hasPrevPage}
              />
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-8">
              Browse by Category
            </h2>
            
            {categoriesLoading ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* All category */}
                <Link
                  to={`/?category=All`}
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-gold hover:shadow-card transition-all duration-300"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-playfair font-semibold text-gray-900 group-hover:text-gold transition-colors">
                      All
                    </h3>
                    <p className="text-gray-500 mt-2">
                      All items
                    </p>
                  </div>
                </Link>
                
                {/* Dynamic categories */}
                {categoriesData?.categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/?category=${category.slug}`}
                    className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-gold hover:shadow-card transition-all duration-300"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-playfair font-semibold text-gray-900 group-hover:text-gold transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Browse collection
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Red Lehenga", "Wedding Saree", "Cocktail Dress", "Designer Gown", "Party Wear"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gold hover:text-gold transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;