import heroImage from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury clothing collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
            Rent the Magic.
            <br />
            <span className="text-gold">Own the Moment.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover luxury fashion rentals for every special occasion. 
            Premium designer pieces at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-luxury text-lg px-10 py-4">
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;