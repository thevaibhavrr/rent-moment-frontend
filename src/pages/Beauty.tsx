
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BottomActionBar from '@/components/BottomActionBar';
import BeautyHeader from '@/components/BeautyHeader';
import apiService, {
  Supercategory,
  BeautyCategory,
  RoutineCategory,
  WinterCategory,
  SummerCategory,
  ClothCategory,
  WomanCareCategory,
  KidsCategory,
  PerfumeCategory
} from '@/services/api';

const SkincareWebsite = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [winterSlide, setWinterSlide] = useState(0);
  const [winterProgress, setWinterProgress] = useState(0);
  const [sunSlide, setSunSlide] = useState(0);
  const [sunProgress, setSunProgress] = useState(0);
  const [perfumeSlide, setPerfumeSlide] = useState(0);
  const [perfumeProgress, setPerfumeProgress] = useState(0);
  const [clothSlide, setClothSlide] = useState(0);
  const [clothProgress, setClothProgress] = useState(0);
  const [kidsSlide, setKidsSlide] = useState(0);
  const [kidsProgress, setKidsProgress] = useState(0);
  const [womanCareSlide, setWomanCareSlide] = useState(0);
  const [womanCareProgress, setWomanCareProgress] = useState(0);
  const [routineBuilderOpen, setRoutineBuilderOpen] = useState(false);
  const [supercategories, setSupercategories] = useState<Supercategory[]>([]);
  const [beautyCategories, setBeautyCategories] = useState<BeautyCategory[]>([]);
  const [routineCategories, setRoutineCategories] = useState<RoutineCategory[]>([]);
  const [winterCategories, setWinterCategories] = useState<WinterCategory[]>([]);
  const [summerCategories, setSummerCategories] = useState<SummerCategory[]>([]);
  const [clothCategories, setClothCategories] = useState<ClothCategory[]>([]);
  const [womanCareCategories, setWomanCareCategories] = useState<WomanCareCategory[]>([]);
  const [kidsCategories, setKidsCategories] = useState<KidsCategory[]>([]);
  const [perfumeCategories, setPerfumeCategories] = useState<PerfumeCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Generate stable snowflake positions
  const snowflakePositions = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 5,
      size: Math.random() * 0.5 + 0.5,
      xOffset: Math.random() * 50 - 25,
    }));
  }, []);

  // Hero slider data with premium images
  const heroSlides = [
    {
      id: 1,
      title: "Radiant Beauty Collection",
      subtitle: "Transform your skincare routine",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      cta: "Shop Now",
      link: "#products"
    },
    {
      id: 2,
      title: "Summer Glow Essentials",
      subtitle: "Protect and nourish your skin",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      cta: "Explore",
      link: "#products"
    },
    {
      id: 3,
      title: "Luxury Hydration Line",
      subtitle: "Quench your skin's thirst",
      image: "https://img.freepik.com/premium-psd/natural-cosmatic-web-banner-lanscape_674759-233.jpg",
      cta: "Discover",
      link: "#products"
    }
  ];

  // Winter protection slider data
  const winterSlides = [
    {
      id: 1,
      image: "https://www.nykaa.com/beauty-blog/wp-content/uploads/2024/10/wsc-banner.jpg",
      link: "#winter-products"
    },
    {
      id: 2,
      image: "https://skinkraft.com/cdn/shop/articles/Skin-In-Winter_1024x400.jpg?v=1579497674",
      link: "#winter-products"
    },
    {
      id: 3,
      image: "https://36best.com/upload/iblock/ec0/2hzsjfct4xjv172spn665cqezuf04l9r.jpg",
      link: "#winter-products"
    }
  ];

  // Sun protection slider data
  const sunSlides = [
    {
      id: 1,
      image: "https://img.freepik.com/free-vector/set-sunscreen-cream-lotion-oil-uva-uvb-protection-water-resistant-realistic-sea-shore-leaves-background_1268-15083.jpg?semt=ais_hybrid&w=740&q=80",
      link: "#sun-products"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/3d/ce/6b/3dce6b2448292e6e7322f056bcabae29.jpg",
      link: "#sun-products"
    },
    {
      id: 3,
      image: "https://img.freepik.com/premium-vector/luxury-sunscreen-product-ad-banner_317442-2018.jpg",
      link: "#sun-products"
    }
  ];

  // Transform routine categories from API to match the expected format
  const routineCategoriesDisplay = routineCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Transform categories from API to match the expected format
  const winterCategoriesDisplay = winterCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  const sunCategoriesDisplay = summerCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Perfume and deo slider data
  const perfumeSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#perfume-products"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1595425970377-c970029bfaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#perfume-products"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#perfume-products"
    }
  ];

  // Transform perfume categories from API
  const perfumeCategoriesDisplay = perfumeCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Cloth slider data
  const clothSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#cloth-products"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#cloth-products"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#cloth-products"
    }
  ];

  // Transform cloth categories from API
  const clothCategoriesDisplay = clothCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Kids slider data
  const kidsSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#kids-products"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503919005314-30d9339471c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#kids-products"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#kids-products"
    }
  ];

  // Transform kids categories from API
  const kidsCategoriesDisplay = kidsCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Woman Care slider data
  const womanCareSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#woman-care-products"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1570172619644-dfd2ed8abbbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#woman-care-products"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#woman-care-products"
    }
  ];

  // Transform woman care categories from API
  const womanCareCategoriesDisplay = womanCareCategories.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image
  }));

  // Fetch all categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const [
          supercategoriesResponse,
          categoriesResponse,
          routineCategoriesResponse,
          winterCategoriesResponse,
          summerCategoriesResponse,
          clothCategoriesResponse,
          womanCareCategoriesResponse,
          kidsCategoriesResponse,
          perfumeCategoriesResponse
        ] = await Promise.all([
          apiService.getSupercategories({ limit: 100 }),
          apiService.getBeautyCategories({ limit: 100 }),
          apiService.getRoutineCategories({ limit: 100 }),
          apiService.getWinterCategories({ limit: 100 }),
          apiService.getSummerCategories({ limit: 100 }),
          apiService.getClothCategories({ limit: 100 }),
          apiService.getWomanCareCategories({ limit: 100 }),
          apiService.getKidsCategories({ limit: 100 }),
          apiService.getPerfumeCategories({ limit: 100 })
        ]);

        if (supercategoriesResponse.success && supercategoriesResponse.data) {
          setSupercategories(supercategoriesResponse.data.supercategories || []);
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          setBeautyCategories(categoriesResponse.data.categories || []);
        }

        if (routineCategoriesResponse.success && routineCategoriesResponse.data) {
          setRoutineCategories(routineCategoriesResponse.data.categories || []);
        }

        if (winterCategoriesResponse.success && winterCategoriesResponse.data) {
          setWinterCategories(winterCategoriesResponse.data.categories || []);
        }

        if (summerCategoriesResponse.success && summerCategoriesResponse.data) {
          setSummerCategories(summerCategoriesResponse.data.categories || []);
        }

        if (clothCategoriesResponse.success && clothCategoriesResponse.data) {
          setClothCategories(clothCategoriesResponse.data.categories || []);
        }

        if (womanCareCategoriesResponse.success && womanCareCategoriesResponse.data) {
          setWomanCareCategories(womanCareCategoriesResponse.data.categories || []);
        }

        if (kidsCategoriesResponse.success && kidsCategoriesResponse.data) {
          setKidsCategories(kidsCategoriesResponse.data.categories || []);
        }

        if (perfumeCategoriesResponse.success && perfumeCategoriesResponse.data) {
          setPerfumeCategories(perfumeCategoriesResponse.data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to empty arrays on error
        setSupercategories([]);
        setBeautyCategories([]);
        setRoutineCategories([]);
        setWinterCategories([]);
        setSummerCategories([]);
        setClothCategories([]);
        setWomanCareCategories([]);
        setKidsCategories([]);
        setPerfumeCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Transform supercategories to match the expected format for display
  const categories = supercategories.map((supercategory) => {
    // Count categories under this supercategory
    const categoryCount = beautyCategories.filter(
      (cat) => (typeof cat.supercategory === 'string'
        ? cat.supercategory === supercategory._id
        : cat.supercategory._id === supercategory._id)
    ).length;

    return {
      id: supercategory._id,
      name: supercategory.name,
      icon: "✨",
      image: supercategory.image,
      description: supercategory.description || "Explore our collection",
      products: `${categoryCount} ${categoryCount === 1 ? 'Category' : 'Categories'}`
    };
  });

  // Premium products data with reliable images
  const products = {
    skinCare: [
      { id: 1, name: "Radiant Glow Serum", price: 42.99, image: "https://images.unsplash.com/photo-1570172619644-dfd2ed8abbbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.5, badge: "Bestseller", description: "Illuminate your skin with our vitamin C enriched serum" },
      { id: 2, name: "Hydrating Day Cream", price: 38.50, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.8, badge: "New", description: "24-hour moisture protection with SPF 30" },
      { id: 3, name: "Purifying Face Mask", price: 24.99, image: "https://images.unsplash.com/photo-1616394584738-fc6e612d71a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.2, description: "Deep cleanse pores and remove impurities" },
      { id: 4, name: "Vitamin C Booster", price: 35.00, image: "https://images.unsplash.com/photo-1608248597279-f99d5bf4eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.7, badge: "Limited", description: "Brighten and even skin tone" },
      { id: 5, name: "Retinol Night Cream", price: 48.75, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.6, description: "Reduce fine lines and wrinkles while you sleep" }
    ],
    hairCare: [
      { id: 6, name: "Nourishing Shampoo", price: 22.50, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", rating: 4.3, description: "Gentle cleansing for all hair types" },
      { id: 7, name: "Repairing Hair Mask", price: 28.99, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.7, badge: "Bestseller", description: "Intensive repair for damaged hair" },
      { id: 8, name: "Silky Smooth Conditioner", price: 24.00, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.5, description: "Detangle and add shine" },
      { id: 9, name: "Volume Boost Spray", price: 19.99, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", rating: 4.1, description: "Add body and lift to fine hair" },
      { id: 10, name: "Heat Protectant Serum", price: 26.50, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.4, badge: "New", description: "Protect hair from heat damage" }
    ],
    lipCare: [
      { id: 11, name: "Hydrating Lip Balm", price: 12.99, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.6, description: "Long-lasting moisture for soft lips" },
      { id: 12, name: "Plumping Lip Gloss", price: 18.50, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.2, badge: "Trending", description: "Enhance your natural lip volume" },
      { id: 13, name: "Nourishing Lip Mask", price: 15.99, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.8, description: "Overnight treatment for supple lips" },
      { id: 14, name: "Velvet Lip Scrub", price: 14.00, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.3, description: "Exfoliate and smooth lips" },
      { id: 15, name: "Long-lasting Lip Tint", price: 22.75, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.5, badge: "Bestseller", description: "Vibrant color that lasts all day" }
    ],
    eyeCare: [
      { id: 16, name: "Revitalizing Eye Cream", price: 32.99, image: "https://images.unsplash.com/photo-1620916566398-39f1686b2073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", rating: 4.7, badge: "Premium", description: "Reduce puffiness and dark circles" },
      { id: 17, name: "Hydrating Eye Patches", price: 24.50, image: "https://images.unsplash.com/photo-1616394584738-fc6e612d71a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.4, description: "Instant refreshment for tired eyes" },
      { id: 18, name: "Dark Circle Corrector", price: 28.99, image: "https://images.unsplash.com/photo-1608248597279-f99d5bf4eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.5, description: "Brighten the under-eye area" },
      { id: 19, name: "Lash Growth Serum", price: 35.00, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", rating: 4.6, badge: "Limited", description: "Promote longer, fuller lashes" },
      { id: 20, name: "Soothing Eye Gel", price: 26.75, image: "https://images.unsplash.com/photo-1620916566398-39f1686b2073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", rating: 4.3, description: "Cooling relief for sensitive eyes" }
    ]
  };

  // Testimonials data
  const testimonials = [
    { id: 1, name: "Emma Johnson", rating: 5, comment: "I've never felt more confident in my skin! The Radiant Glow Serum has completely transformed my skincare routine.", avatar: "EJ" },
    { id: 2, name: "Sophia Williams", rating: 5, comment: "The quality of these products is unmatched. My hair has never looked better since using the Nourishing Shampoo.", avatar: "SW" },
    { id: 3, name: "Olivia Davis", rating: 5, comment: "I'm obsessed with the Plumping Lip Gloss! It gives me the perfect pout without feeling sticky.", avatar: "OD" }
  ];


  // Auto-advance slider with progress
  useEffect(() => {
    setProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [currentSlide, heroSlides.length]);

  // Auto-advance winter slider with progress
  useEffect(() => {
    setWinterProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setWinterProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setWinterSlide((prev) => (prev + 1) % winterSlides.length);
      setWinterProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [winterSlide, winterSlides.length]);

  // Auto-advance sun protection slider with progress
  useEffect(() => {
    setSunProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setSunProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setSunSlide((prev) => (prev + 1) % sunSlides.length);
      setSunProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [sunSlide, sunSlides.length]);

  // Auto-advance perfume and deo slider with progress
  useEffect(() => {
    setPerfumeProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setPerfumeProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setPerfumeSlide((prev) => (prev + 1) % perfumeSlides.length);
      setPerfumeProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [perfumeSlide, perfumeSlides.length]);

  // Auto-advance cloth slider with progress
  useEffect(() => {
    setClothProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setClothProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setClothSlide((prev) => (prev + 1) % clothSlides.length);
      setClothProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [clothSlide, clothSlides.length]);

  // Auto-advance kids slider with progress
  useEffect(() => {
    setKidsProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setKidsProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setKidsSlide((prev) => (prev + 1) % kidsSlides.length);
      setKidsProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [kidsSlide, kidsSlides.length]);

  // Auto-advance woman care slider with progress
  useEffect(() => {
    setWomanCareProgress(0); // Reset progress when slide changes

    const SLIDE_DURATION = 5000; // 5 seconds
    const INTERVAL = 50; // Update every 50ms for smooth animation
    const INCREMENT = (100 / SLIDE_DURATION) * INTERVAL; // Calculate increment per interval

    const progressInterval = setInterval(() => {
      setWomanCareProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + INCREMENT;
      });
    }, INTERVAL);

    const slideInterval = setInterval(() => {
      setWomanCareSlide((prev) => (prev + 1) % womanCareSlides.length);
      setWomanCareProgress(0); // Reset progress on slide change
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [womanCareSlide, womanCareSlides.length]);

  // Show newsletter popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Show notification
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    const allProducts = [...products.skinCare, ...products.hairCare, ...products.lipCare, ...products.eyeCare];
    const product = allProducts.find(p => p.id === productId);

    if (product) {
      showNotification(
        wishlistItems.includes(productId)
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`
      );
    }
  };

  // Add to cart
  const addToCart = (productId) => {
    setCartItems(prev => [...prev, productId]);

    const allProducts = [...products.skinCare, ...products.hairCare, ...products.lipCare, ...products.eyeCare];
    const product = allProducts.find(p => p.id === productId);

    if (product) {
      showNotification(`${product.name} added to cart`);
    }
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    showNotification(`Thank you for subscribing with ${email}!`);
    setEmail('');
    setShowNewsletter(false);
  };

  // Filter products based on search
  const filteredProducts = {
    skinCare: products.skinCare.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    hairCare: products.hairCare.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    lipCare: products.lipCare.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    eyeCare: products.eyeCare.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  // Get all products for display
  const getAllProducts = () => {
    if (activeCategory === 'all') {
      return [...filteredProducts.skinCare, ...filteredProducts.hairCare, ...filteredProducts.lipCare, ...filteredProducts.eyeCare];
    } else if (activeCategory === 'skinCare') {
      return filteredProducts.skinCare;
    } else if (activeCategory === 'hairCare') {
      return filteredProducts.hairCare;
    } else if (activeCategory === 'lipCare') {
      return filteredProducts.lipCare;
    } else if (activeCategory === 'eyeCare') {
      return filteredProducts.eyeCare;
    }
    return [];
  };

  // Function to handle category click
  const handleCategoryClick = (categoryName: string) => {
    // Only these 4 main categories have subcategories
    const categoriesWithSubcategories = ['Skin Care', 'Hair Care', 'Lip Care', 'Eye Care'];

    if (categoriesWithSubcategories.includes(categoryName)) {
      // Navigate to subcategories page
      navigate(`/category/${encodeURIComponent(categoryName)}/subcategories`);
    } else {
      // Directly navigate to products page
      navigate(`/category/${encodeURIComponent(categoryName)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-20 right-4 z-50 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3"
        >
          <div className="bg-[#FFDBAC] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-800">{notification.message}</p>
        </motion.div>
      )}

      {/* Beauty Header */}
      <BeautyHeader />

      {/* Hero Section with Slider */}
      <section id="home" className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="relative h-64 md:h-[400px] overflow-hidden rounded-2xl md:rounded-3xl">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
              className={`absolute inset-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="relative h-full">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{slide.title}</h2>
                      <p className="text-xl md:text-2xl text-gray-600 mb-8">{slide.subtitle}</p>
                      <a href={slide.link} className="inline-block bg-[#FFDBAC] hover:bg-[#FFDBAC]/90 text-gray-800 font-semibold py-4 px-8 rounded-full transition transform hover:scale-105">
                        {slide.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center space-x-2 mt-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
            >
              {index === currentSlide && (
                <motion.div
                  key={`progress-${currentSlide}`}
                  className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Premium Categories Section */}
      <section className="py-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our curated collections designed to enhance your natural beauty</p>
          </div>

          {loadingCategories ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => navigate(`/beauty/supercategory/${category.id}`)}
              >
                <div className="relative h-80">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback image if API image fails to load
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(category.name);
                      }}
                  />
                  {/* Enhanced gradient with black shade from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{category.name}</h3>
                    <p className="text-white/90 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">{category.products}</span>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 transform transition-transform duration-300 group-hover:translate-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories available at the moment.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <button className="inline-flex items-center text-gray-800 font-medium hover:text-[#FFDBAC] transition">
              <span>View All Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Routine Builder Section */}
      <section className="py-6 bg-gradient-to-r from-[#FFDBAC]/20 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Build Your Routine</h2>
              <p className="text-gray-600">Create a personalized skincare routine tailored to your needs</p>
            </div>
            <button
              onClick={() => setRoutineBuilderOpen(!routineBuilderOpen)}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105"
            >
              Start Building
            </button>
          </div>

          {/* Routine Categories - Horizontal Scroll */}
          <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {routineCategoriesDisplay.length > 0 ? (
                routineCategoriesDisplay.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(category.name);
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-4">
                      <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                    </div>
                  </div>
                </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No routine categories available</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Winter Protection Section */}
      <section id="winter-protection" className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Snowfall Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {snowflakePositions.map((snowflake, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300 text-2xl opacity-80 drop-shadow-lg"
              style={{ left: `${snowflake.left}%`, top: '-50px' }}
              initial={{
                y: -50,
                x: 0,
                scale: snowflake.size,
                opacity: 0.8,
              }}
              animate={{
                y: 'calc(100vh + 100px)',
                x: snowflake.xOffset,
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: snowflake.duration * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: snowflake.delay,
                opacity: {
                  duration: snowflake.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              ❄
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Winter Protection Essentials</h2>

          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
            {winterSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === winterSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${index === winterSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full">
                  <img src={slide.image} alt="Winter Protection" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Winter Slider Controls */}
          <div className="flex justify-center space-x-2 mt-2">
            {winterSlides.map((_, index) => (
              <button
                key={index}
                className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
                onClick={() => {
                  setWinterSlide(index);
                  setWinterProgress(0);
                }}
              >
                {index === winterSlide && (
                  <motion.div
                    key={`winter-progress-${winterSlide}`}
                    className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${winterProgress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Snowfall Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {snowflakePositions.map((snowflake, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300 text-2xl opacity-80 drop-shadow-lg"
              style={{ left: `${snowflake.left}%`, top: '-50px' }}
              initial={{
                y: -50,
                x: 0,
                scale: snowflake.size,
                opacity: 0.8,
              }}
              animate={{
                y: 'calc(100vh + 100px)',
                x: snowflake.xOffset,
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: snowflake.duration * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: snowflake.delay,
                opacity: {
                  duration: snowflake.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              ❄
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {winterCategoriesDisplay.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -8 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sun Protection Section */}
      <section id="sun-protection" className="py-6 relative overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
      <motion.h2 
        className="text-3xl font-bold text-center text-gray-800 mb-8" 
        style={{ fontFamily: 'Playfair Display, serif' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} // Slightly slower
      >
        Sun Protection Essentials
      </motion.h2>

      <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
        {sunSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === sunSlide ? 1 : 0 }}
            transition={{ duration: 1.5 }} // Increased from 1 to 1.5
            className={`absolute inset-0 ${index === sunSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative h-full">
              <img src={slide.image} alt="Sun Protection" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sun Slider Controls */}
      <div className="flex justify-center space-x-2 mt-2">
        {sunSlides.map((_, index) => (
          <button
            key={index}
            className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
            onClick={() => {
              setSunSlide(index);
              setSunProgress(0);
            }}
          >
            {index === sunSlide && (
              <motion.div
                key={`sun-progress-${sunSlide}`}
                className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${sunProgress}%` }}
                transition={{ duration: 0.08, ease: 'linear' }} // Slightly slower
              />
            )}
          </button>
        ))}
      </div>
    </div>
</section>

      {/* Sun Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {sunCategoriesDisplay.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfume and Deo Section */}
      <section id="perfume-deo" className="py-12 relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-8" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Perfume & Fragrance Collection
          </motion.h2>

          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
            {perfumeSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === perfumeSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${index === perfumeSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full">
                  <img src={slide.image} alt="Perfume & Fragrance" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Perfume Slider Controls */}
          <div className="flex justify-center space-x-2 mt-2">
            {perfumeSlides.map((_, index) => (
              <button
                key={index}
                className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
                onClick={() => {
                  setPerfumeSlide(index);
                  setPerfumeProgress(0);
                }}
              >
                {index === perfumeSlide && (
                  <motion.div
                    key={`perfume-progress-${perfumeSlide}`}
                    className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${perfumeProgress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Perfume Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {perfumeCategoriesDisplay.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloth Section */}
      <section id="cloth" className="py-12 relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fashion & Clothing Collection
          </motion.h2>

          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
            {clothSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === clothSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${index === clothSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full">
                  <img src={slide.image} alt="Fashion & Clothing" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cloth Slider Controls */}
          <div className="flex justify-center space-x-2 mt-2">
            {clothSlides.map((_, index) => (
              <button
                key={index}
                className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
                onClick={() => {
                  setClothSlide(index);
                  setClothProgress(0);
                }}
              >
                {index === clothSlide && (
                  <motion.div
                    key={`cloth-progress-${clothSlide}`}
                    className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${clothProgress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cloth Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {clothCategoriesDisplay.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kids Section */}
      <section id="kids" className="py-12 relative overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Kids Collection
          </motion.h2>

          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
            {kidsSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === kidsSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${index === kidsSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full">
                  <img src={slide.image} alt="Kids Collection" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Kids Slider Controls */}
          <div className="flex justify-center space-x-2 mt-2">
            {kidsSlides.map((_, index) => (
              <button
                key={index}
                className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
                onClick={() => {
                  setKidsSlide(index);
                  setKidsProgress(0);
                }}
              >
                {index === kidsSlide && (
                  <motion.div
                    key={`kids-progress-${kidsSlide}`}
                    className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${kidsProgress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Kids Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {kidsCategoriesDisplay.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Woman Care Section */}
      <section id="woman-care" className="py-12 relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Woman Care Essentials
          </motion.h2>

          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
            {womanCareSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === womanCareSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${index === womanCareSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full">
                  <img src={slide.image} alt="Woman Care Essentials" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Woman Care Slider Controls */}
          <div className="flex justify-center space-x-2 mt-2">
            {womanCareSlides.map((_, index) => (
              <button
                key={index}
                className="relative h-2 w-8 rounded-full bg-gray-300 overflow-hidden"
                onClick={() => {
                  setWomanCareSlide(index);
                  setWomanCareProgress(0);
                }}
              >
                {index === womanCareSlide && (
                  <motion.div
                    key={`woman-care-progress-${womanCareSlide}`}
                    className="absolute top-0 left-0 h-full bg-[#FFDBAC] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${womanCareProgress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Woman Care Categories Section */}
      <section className="pb-5 relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {womanCareCategoriesDisplay.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                    <p className="text-white text-sm font-medium text-center px-2">{category.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-[#FFDBAC] rounded-full p-2 mr-2">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>LuxeGlow</h3>
              </div>
              <p className="text-gray-300">Premium skincare for radiant beauty</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#products" className="hover:text-white transition">Products</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition">Skin Care</a></li>
                <li><a href="#" className="hover:text-white transition">Hair Care</a></li>
                <li><a href="#" className="hover:text-white transition">Lip Care</a></li>
                <li><a href="#" className="hover:text-white transition">Eye Care</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>123 Beauty Street</li>
                <li>Luxe City, LC 12345</li>
                <li>contact@luxeglow.com</li>
                <li>(123) 456-7890</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} LuxeGlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setQuickViewProduct(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 object-cover rounded-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{quickViewProduct.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">({quickViewProduct.rating})</span>
                </div>
                <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-gray-800">${quickViewProduct.price}</span>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition"
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${wishlistItems.includes(quickViewProduct.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full font-medium transition"
                      onClick={() => {
                        addToCart(quickViewProduct.id);
                        setQuickViewProduct(null);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Product Details</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Premium quality ingredients</li>
                    <li>• Suitable for all skin types</li>
                    <li>• Cruelty-free and vegan</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Routine Builder */}
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-30 md:hidden transition-transform duration-300 ${routineBuilderOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          className="bg-[#FFDBAC] text-gray-800 p-3 rounded-r-full shadow-lg"
          onClick={() => setRoutineBuilderOpen(!routineBuilderOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {routineBuilderOpen && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="bg-white shadow-xl rounded-r-lg p-4 w-64 h-96 overflow-y-auto"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Routine Builder</h3>
            <div className="space-y-3">
              {routineCategoriesDisplay.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">{category.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Action Bar for switching between Cloth and Beauty pages */}
      <BottomActionBar />
    </div>
  );
};

export default SkincareWebsite; 