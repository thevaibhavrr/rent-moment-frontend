import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

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
