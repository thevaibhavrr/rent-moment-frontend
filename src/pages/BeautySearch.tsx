// import { useNavigate } from 'react-router-dom';
// import { useState, useMemo } from 'react';
// import { ArrowLeft, Search, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import BeautyHeader from '@/components/BeautyHeader';
// import Footer from '@/components/Footer';

// // Import product data from CategoryProducts
// const allClothingProducts = [
//   {
//     _id: 'wd1',
//     name: 'Floral Maxi Dress',
//     description: 'Elegant floral print maxi dress perfect for summer occasions. Flowy and comfortable.',
//     image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 1299,
//     originalPrice: 1999,
//     category: 'Woman Dress'
//   },
//   {
//     _id: 'wd2',
//     name: 'Cocktail Party Dress',
//     description: 'Stylish cocktail dress for evening parties. Perfect fit and elegant design.',
//     image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 1499,
//     originalPrice: 2499,
//     category: 'Woman Dress'
//   },
//   {
//     _id: 'j1',
//     name: 'High Waist Skinny Jeans',
//     description: 'Comfortable high waist skinny jeans. Perfect fit and stretchable fabric.',
//     image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 899,
//     originalPrice: 1499,
//     category: 'Jeans'
//   },
//   {
//     _id: 'ts1',
//     name: 'Casual Cotton T-Shirt',
//     description: 'Comfortable cotton t-shirt. Perfect for everyday wear.',
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 499,
//     originalPrice: 799,
//     category: 'T-Shirt'
//   },
//   {
//     _id: 'k1',
//     name: 'Printed Cotton Kurti',
//     description: 'Beautiful printed cotton kurti. Traditional yet modern design.',
//     image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 799,
//     originalPrice: 1299,
//     category: 'Kurti'
//   },
//   {
//     _id: 's1',
//     name: 'Silk Saree',
//     description: 'Elegant silk saree for special occasions. Premium quality fabric.',
//     image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 2499,
//     originalPrice: 3999,
//     category: 'Saree'
//   },
//   {
//     _id: 'm1',
//     name: 'Maternity Maxi Dress',
//     description: 'Comfortable maternity maxi dress. Stretchy fabric perfect for expecting mothers.',
//     image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 1199,
//     originalPrice: 1999,
//     category: 'Maternity'
//   },
//   {
//     _id: 'ct1',
//     name: 'Casual Crop Top',
//     description: 'Trendy casual crop top. Perfect for summer outfits.',
//     image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     price: 599,
//     originalPrice: 999,
//     category: 'Crop Tops'
//   }
// ];

// // Clothing categories for beauty search
// const clothingCategories = [
//   {
//     id: 1,
//     name: 'Woman Dress',
//     image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Elegant dresses for every occasion'
//   },
//   {
//     id: 2,
//     name: 'Jeans',
//     image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Comfortable and stylish jeans'
//   },
//   {
//     id: 3,
//     name: 'T-Shirt',
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Casual and trendy t-shirts'
//   },
//   {
//     id: 4,
//     name: 'Kurti',
//     image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Traditional and modern kurtis'
//   },
//   {
//     id: 5,
//     name: 'Saree',
//     image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Elegant sarees for special occasions'
//   },
//   {
//     id: 6,
//     name: 'Maternity',
//     image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Comfortable maternity wear'
//   },
//   {
//     id: 7,
//     name: 'Crop Tops',
//     image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Trendy crop tops'
//   }
// ];

// const BeautySearch = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter products based on search query
//   const filteredProducts = useMemo(() => {
//     if (!searchQuery.trim()) {
//       return allClothingProducts;
//     }
//     const query = searchQuery.toLowerCase();
//     return allClothingProducts.filter(product =>
//       product.name.toLowerCase().includes(query) ||
//       product.description.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//     );
//   }, [searchQuery]);

//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/category/${encodeURIComponent(categoryName)}`);
//   };

//   const handleProductClick = (categoryName: string) => {
//     navigate(`/category/${encodeURIComponent(categoryName)}`);
//   };

//   const calculateDiscount = (original: number, current: number) => {
//     return Math.round(((original - current) / original) * 100);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//       <BeautyHeader />

//       <div className="flex-1 container mx-auto px-4 py-6 md:py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-sm md:text-base">Back</span>
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-2xl mx-auto">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search products by name, category, or description..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-[#FFDBAC] transition-all text-base"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Categories - Circular Layout */}
//         <div className="mb-10">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
//           <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
//             {clothingCategories.map((category, index) => (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => handleCategoryClick(category.name)}
//                 className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 cursor-pointer"
//               >
//                 <div className="relative w-full h-full rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-4">
//                     <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
//                   </div>
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Products List - Name on Left, Image on Right */}
//         <div className="mb-8">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
//             {searchQuery ? `Search Results (${filteredProducts.length})` : 'All Products'}
//           </h2>
          
//           {filteredProducts.length > 0 ? (
//             <div className="space-y-4">
//               {filteredProducts.map((product, index) => {
//                 const discount = calculateDiscount(product.originalPrice, product.price);
//                 return (
//                   <motion.div
//                     key={product._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     onClick={() => handleProductClick(product.category)}
//                     className="bg-white rounded-xl border border-gray-200 hover:border-[#FFDBAC] hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
//                   >
//                     <div className="flex flex-col md:flex-row">
//                       {/* Left Side - Product Info */}
//                       <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
//                         <div>
//                           <div className="flex items-center gap-3 mb-2">
//                             <span className="px-3 py-1 bg-[#FFDBAC]/20 text-[#FFDBAC] text-xs font-semibold rounded-full">
//                               {product.category}
//                             </span>
//                             {discount > 0 && (
//                               <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
//                                 {discount}% OFF
//                               </span>
//                             )}
//                           </div>
//                           <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#FFDBAC] transition-colors">
//                             {product.name}
//                           </h3>
//                           <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
//                             {product.description}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-baseline gap-2">
//                             <span className="text-2xl md:text-3xl font-bold text-gray-900">
//                               ₹{product.price}
//                             </span>
//                             <span className="text-lg text-gray-500 line-through">
//                               ₹{product.originalPrice}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right Side - Product Image */}
//                       <div className="w-full md:w-64 lg:w-80 h-48 md:h-full flex-shrink-0">
//                         <div className="relative w-full h-full overflow-hidden bg-gray-100">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-600 text-lg mb-2">No products found</p>
//               <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BeautySearch;

import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';

// Import product data from CategoryProducts
const allClothingProducts = [
  {
    _id: 'wd1',
    name: 'Floral Maxi Dress',
    description: 'Elegant floral print maxi dress perfect for summer occasions. Flowy and comfortable.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 1999,
    category: 'Woman Dress'
  },
  {
    _id: 'wd2',
    name: 'Cocktail Party Dress',
    description: 'Stylish cocktail dress for evening parties. Perfect fit and elegant design.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 1499,
    originalPrice: 2499,
    category: 'Woman Dress'
  },
  {
    _id: 'j1',
    name: 'High Waist Skinny Jeans',
    description: 'Comfortable high waist skinny jeans. Perfect fit and stretchable fabric.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 899,
    originalPrice: 1499,
    category: 'Jeans'
  },
  {
    _id: 'ts1',
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt. Perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 499,
    originalPrice: 799,
    category: 'T-Shirt'
  },
  {
    _id: 'k1',
    name: 'Printed Cotton Kurti',
    description: 'Beautiful printed cotton kurti. Traditional yet modern design.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 799,
    originalPrice: 1299,
    category: 'Kurti'
  },
  {
    _id: 's1',
    name: 'Silk Saree',
    description: 'Elegant silk saree for special occasions. Premium quality fabric.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 2499,
    originalPrice: 3999,
    category: 'Saree'
  },
  {
    _id: 'm1',
    name: 'Maternity Maxi Dress',
    description: 'Comfortable maternity maxi dress. Stretchy fabric perfect for expecting mothers.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 1199,
    originalPrice: 1999,
    category: 'Maternity'
  },
  {
    _id: 'ct1',
    name: 'Casual Crop Top',
    description: 'Trendy casual crop top. Perfect for summer outfits.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 599,
    originalPrice: 999,
    category: 'Crop Tops'
  }
];

// Clothing categories for beauty search
const clothingCategories = [
  {
    id: 1,
    name: 'Woman Dress',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant dresses for every occasion'
  },
  {
    id: 2,
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable and stylish jeans'
  },
  {
    id: 3,
    name: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Casual and trendy t-shirts'
  },
  {
    id: 4,
    name: 'Kurti',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Traditional and modern kurtis'
  },
  {
    id: 5,
    name: 'Saree',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant sarees for special occasions'
  },
  {
    id: 6,
    name: 'Maternity',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable maternity wear'
  },
  {
    id: 7,
    name: 'Crop Tops',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Trendy crop tops'
  }
];

const BeautySearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase();
    return allClothingProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <BeautyHeader />

      <div className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm md:text-base">Back</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-[#FFDBAC] transition-all text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Show categories only when there's no search query */}
        {!hasSearchQuery && (
          <>
            {/* Categories - Circular Layout */}
            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
              <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                {clothingCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/category/${encodeURIComponent(category.name)}`)}
                    className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 cursor-pointer"
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-4">
                        <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

           
          </>
        )}

        {/* Search Results - Only show when there's a search query */}
        {hasSearchQuery && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Search Results ({filteredProducts.length})
            </h2>
            
            {filteredProducts.length > 0 ? (
              <div className="space-y-2">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-white rounded-lg border border-gray-200 hover:border-[#FFDBAC] hover:shadow-md transition-all duration-300 cursor-pointer p-4 group"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left Side - Product Name Only */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FFDBAC] transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      {/* Right Side - Small Product Image (40px) */}
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-2">No products found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BeautySearch;