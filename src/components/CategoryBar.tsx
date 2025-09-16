import { useState, useEffect } from "react";
import { useAllCategories } from "@/hooks/useCategories";
import { Category } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

interface CategoryBarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CategoryBar = ({ activeCategory = "All", onCategoryChange }: CategoryBarProps) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const { data: categoriesData, isLoading, error } = useAllCategories();

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-100">
        <div className="luxury-container">
          <div className="flex items-center justify-center py-4 space-x-3">
            <Spinner size="sm" />
            <span className="text-sm text-gray-500">Loading categories...</span>
          </div>
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
    );
  }

  // Show error state
  if (error) {
    console.error('Error loading categories:', error);
    // Fallback to static categories on error
    const fallbackCategories = [
      "All",
      "Lahenga",
      "Saree", 
      "Indo-Western",
      "Gowns",
      "Party Wear",
      "Accessories"
    ];

    return (
      <div className="bg-white border-b border-gray-100">
        <div className="luxury-container">
          <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-1">
            {fallbackCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-nav whitespace-nowrap ${
                  selectedCategory === category ? "active text-gold" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const categories = categoriesData?.categories || [];

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="luxury-container">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-1">
          {/* Always show "All" category first */}
          <button
            onClick={() => handleCategoryClick("All")}
            className={`category-nav whitespace-nowrap ${
              selectedCategory === "All" ? "active text-gold" : ""
            }`}
          >
            All
          </button>
          
          {/* Show dynamic categories from API */}
          {categories.map((category: Category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`category-nav whitespace-nowrap ${
                selectedCategory === category.slug ? "active text-gold" : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;