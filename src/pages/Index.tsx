import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { useAllCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch categories and initial products to determine loading state
  const { data: categoriesData, isLoading: categoriesLoading } = useAllCategories();
  const { isLoading: productsLoading } = useProducts({
    category: activeCategory === "All" ? undefined : activeCategory,
    page: 1,
    limit: 20,
    sort: 'createdAt',
    order: 'desc'
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categoriesData?.categories) {
      // Check if the parameter is a category ID or slug
      const category = categoriesData.categories.find(
        (cat) => cat._id === categoryParam || cat.slug === categoryParam
      );
      
      if (category) {
        // Use the slug for the active category (as expected by CategoryBar)
        setActiveCategory(category.slug);
      } else {
        // If not found, default to "All"
        setActiveCategory("All");
      }
    } else if (!categoryParam) {
      setActiveCategory("All");
    }
  }, [searchParams, categoriesData]);

  // Show initial loading state when both categories and products are loading
  const isInitialLoading = categoriesLoading && productsLoading;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        
        {/* Loading Indicator */}
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="luxury-container">
            <div className="flex items-center justify-center space-x-4">
              <Spinner size="lg" />
              <span className="text-lg font-medium text-gray-700">Loading your luxury collection...</span>
            </div>
          </div>
        </div>
        
        {/* Category Bar Skeleton */}
        <div className="bg-white border-b border-gray-100">
          <div className="luxury-container">
            <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-1">
              {[...Array(7)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-20 rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <section className="py-12 bg-gray-50">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-80 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
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

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CategoryBar 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductGrid category={activeCategory} />
      <Footer />
    </div>
  );
};

export default Index;
