import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import apiService, { Supercategory, BeautyCategory } from '@/services/api';

const SupercategoryPage = () => {
  const { supercategoryId } = useParams<{ supercategoryId: string }>();
  const navigate = useNavigate();
  const [supercategory, setSupercategory] = useState<Supercategory | null>(null);
  const [categories, setCategories] = useState<BeautyCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [supercategoryId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!supercategoryId) return;

      setLoading(true);
      try {
        // Fetch supercategory details
        const supercategoryResponse = await apiService.getSupercategoryById(supercategoryId);
        if (supercategoryResponse.success && supercategoryResponse.data) {
          setSupercategory(supercategoryResponse.data.supercategory);
        }

        // Fetch all beauty categories and filter by supercategory
        const categoriesResponse = await apiService.getBeautyCategories({ limit: 100 });
        if (categoriesResponse.success && categoriesResponse.data) {
          const filteredCategories = categoriesResponse.data.categories.filter((cat) => {
            const supercategoryRef = typeof cat.supercategory === 'string' 
              ? cat.supercategory 
              : cat.supercategory._id;
            return supercategoryRef === supercategoryId && cat.isActive;
          });
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Error fetching supercategory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supercategoryId]);

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to products page for this category
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <BeautyHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!supercategory) {
    return (
      <div className="min-h-screen bg-white">
        <BeautyHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Supercategory not found.</p>
            <button
              onClick={() => navigate('/beauty')}
              className="mt-4 text-pink-600 hover:text-pink-700"
            >
              Back to Beauty
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BeautyHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button and Supercategory Title */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/beauty')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              {supercategory.name}
            </h1>
            {supercategory.description && (
              <p className="text-gray-600 mt-2">{supercategory.description}</p>
            )}
          </div>
        </div>

        {/* Supercategory Hero Image */}
        {supercategory.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={supercategory.image}
              alt={supercategory.name}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x400?text=' + encodeURIComponent(supercategory.name);
              }}
            />
          </div>
        )}

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              Categories ({categories.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    {/* Circular Image Container */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-pink-500 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(category.name);
                        }}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"></div>
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center mb-1 group-hover:text-pink-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    {category.description && (
                      <p className="text-xs text-gray-500 text-center line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No categories found for this supercategory.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SupercategoryPage;

