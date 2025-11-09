import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Subcategory data structure
const subcategoriesData: Record<string, Array<{
  id: string;
  name: string;
  image: string;
  description?: string;
}>> = {
  'Winter Moisturizers': [
    {
      id: '1',
      name: 'Face Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Hydrating face creams for winter'
    },
    {
      id: '2',
      name: 'Body Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Rich body creams and lotions'
    },
    {
      id: '3',
      name: 'Hand Creams',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Intensive hand care'
    },
    {
      id: '4',
      name: 'Night Creams',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Overnight repair creams'
    },
    {
      id: '5',
      name: 'SPF Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Sun protection with hydration'
    }
  ],
  'Winter Body lotions': [
    {
      id: '1',
      name: 'Intensive Care',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Deep moisturizing lotions'
    },
    {
      id: '2',
      name: 'Nourishing Body',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Rich nourishing formulas'
    },
    {
      id: '3',
      name: 'Lightweight',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Quick-absorbing lotions'
    },
    {
      id: '4',
      name: 'Sensitive Skin',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Gentle for sensitive skin'
    }
  ],
  'Lip Bams': [
    {
      id: '1',
      name: 'SPF Lip Balms',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Sun protection for lips'
    },
    {
      id: '2',
      name: 'Tinted Balms',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Color with care'
    },
    {
      id: '3',
      name: 'Medicated',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Healing lip treatments'
    },
    {
      id: '4',
      name: 'Flavored',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Delicious flavors'
    }
  ],
  'Face Creams': [
    {
      id: '1',
      name: 'Anti-Aging',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Reduce fine lines'
    },
    {
      id: '2',
      name: 'Brightening',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Even skin tone'
    },
    {
      id: '3',
      name: 'Hydrating',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Deep hydration'
    },
    {
      id: '4',
      name: 'Matte Finish',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Oil-free formulas'
    },
    {
      id: '5',
      name: 'Sensitive Skin',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Gentle formulations'
    }
  ],
  'Facewash': [
    {
      id: '1',
      name: 'Gentle Cleansers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Mild for daily use'
    },
    {
      id: '2',
      name: 'Acne Control',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Fight breakouts'
    },
    {
      id: '3',
      name: 'Deep Cleansing',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Remove impurities'
    },
    {
      id: '4',
      name: 'Exfoliating',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Remove dead skin'
    }
  ],
  'Moisturizer': [
    {
      id: '1',
      name: 'Daily Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Everyday hydration'
    },
    {
      id: '2',
      name: 'Gel Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Lightweight gels'
    },
    {
      id: '3',
      name: 'Cream Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Rich creams'
    },
    {
      id: '4',
      name: 'SPF Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Sun protection'
    }
  ],
  'Serum': [
    {
      id: '1',
      name: 'Vitamin C',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Brightening serums'
    },
    {
      id: '2',
      name: 'Hyaluronic Acid',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Intense hydration'
    },
    {
      id: '3',
      name: 'Niacinamide',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Pore minimizing'
    },
    {
      id: '4',
      name: 'Retinol',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Anti-aging power'
    }
  ],
  'Makeup': [
    {
      id: '1',
      name: 'Foundation',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Perfect coverage'
    },
    {
      id: '2',
      name: 'Concealer',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Hide imperfections'
    },
    {
      id: '3',
      name: 'Lipstick',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Color your lips'
    },
    {
      id: '4',
      name: 'Mascara',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Lengthen lashes'
    }
  ],
  'Shampoo': [
    {
      id: '1',
      name: 'Anti-Hairfall',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Reduce hair fall'
    },
    {
      id: '2',
      name: 'Smoothing',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Smooth & silky'
    },
    {
      id: '3',
      name: 'Volumizing',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Add volume'
    },
    {
      id: '4',
      name: 'Color Protection',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Protect color'
    }
  ],
  'Bodywash': [
    {
      id: '1',
      name: 'Moisturizing',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Hydrating wash'
    },
    {
      id: '2',
      name: 'Exfoliating',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Remove dead skin'
    },
    {
      id: '3',
      name: 'Refreshing',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Energizing scents'
    },
    {
      id: '4',
      name: 'Sensitive Skin',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Gentle formulas'
    }
  ],
  'Skin Care': [
    {
      id: '1',
      name: 'Cleansers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Face cleansers'
    },
    {
      id: '2',
      name: 'Toners',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Balance & refresh'
    },
    {
      id: '3',
      name: 'Moisturizers',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Hydrate skin'
    },
    {
      id: '4',
      name: 'Sunscreens',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'UV protection'
    },
    {
      id: '5',
      name: 'Masks',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Deep treatment'
    }
  ],
  'Hair Care': [
    {
      id: '1',
      name: 'Shampoos',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Clean & nourish'
    },
    {
      id: '2',
      name: 'Conditioners',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Smooth & detangle'
    },
    {
      id: '3',
      name: 'Hair Masks',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Deep conditioning'
    },
    {
      id: '4',
      name: 'Hair Oils',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Nourish & repair'
    }
  ],
  'Lip Care': [
    {
      id: '1',
      name: 'Lip Balms',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Basic lip care'
    },
    {
      id: '2',
      name: 'Lip Scrubs',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Exfoliate lips'
    },
    {
      id: '3',
      name: 'Lip Treatments',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Intensive care'
    },
    {
      id: '4',
      name: 'Tinted Balms',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Color & care'
    }
  ],
  'Eye Care': [
    {
      id: '1',
      name: 'Eye Creams',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Reduce dark circles'
    },
    {
      id: '2',
      name: 'Eye Serums',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Targeted treatment'
    },
    {
      id: '3',
      name: 'Eye Masks',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Instant refresh'
    },
    {
      id: '4',
      name: 'Under Eye',
      image: 'https://i.pinimg.com/474x/f0/e6/c2/f0e6c2a65895d8f016d7b50159a78d7d.jpg',
      description: 'Specialized care'
    }
  ]
};

const Subcategories = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Decode category name from URL
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : '';
  const subcategories = subcategoriesData[decodedCategoryName] || [];
  
  // Determine if this is a beauty-related page
  const beautyCategories = ['Skin Care', 'Hair Care', 'Lip Care', 'Eye Care'];
  const isBeautyPage = beautyCategories.includes(decodedCategoryName) || location.pathname.startsWith('/beauty');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [categoryName]);

  const handleSubcategoryClick = (subcategoryName: string) => {
    // Navigate to products page with both category and subcategory
    navigate(`/category/${encodeURIComponent(decodedCategoryName)}?subcategory=${encodeURIComponent(subcategoryName)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {isBeautyPage ? <BeautyHeader /> : <Header />}

      <div className="container mx-auto px-4 py-8">
        {/* Back Button and Category Title */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {decodedCategoryName || 'Subcategories'}
          </h1>
        </div>

        {/* Subcategories Grid - Circular Layout */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSubcategoryClick(subcategory.name)}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  {/* Circular Image Container */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-[#FFDBAC] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"></div>
                  </div>
                  
                  {/* Subcategory Name */}
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center mb-1 group-hover:text-[#FFDBAC] transition-colors">
                    {subcategory.name}
                  </h3>
                  
                  {/* Description */}
                  {subcategory.description && (
                    <p className="text-xs text-gray-500 text-center line-clamp-2">
                      {subcategory.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No subcategories found for this category.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Subcategories;

