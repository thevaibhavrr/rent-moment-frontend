import { useLocation, useNavigate } from "react-router-dom";
import { Shirt, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const BottomActionBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Active state detection - more robust checking
  const pathname = location.pathname;
  const isBeautyActive = pathname.startsWith('/beauty');
  const isClothActive = !isBeautyActive && (pathname === '/' || pathname === '');

  // Custom gold color values
  const goldColor = "#FFD700";
  const goldLight = "rgba(255, 215, 0, 0.4)";
  const goldLighter = "rgba(255, 215, 0, 0.2)";
  const goldDark = "rgba(255, 215, 0, 0.6)";

  // Simple click handlers with immediate navigation
  const handleClothClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isClothActive) {
      navigate('/', { replace: false });
    }
  };

  const handleBeautyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isBeautyActive) {
      navigate('/beauty', { replace: false });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[88%] max-w-md">
      <div 
        className="backdrop-blur-xl rounded-full p-1 shadow-2xl  relative"
        style={{
          background: 'rgba(0, 0, 0, 0.9)'
        }}
      >
        <div className="flex items-center justify-between gap-2 relative">
          {/* Active background indicator */}
          <motion.div
            layoutId="activeTab"
            className="absolute inset-y-0 w-[calc(50%-4px)] rounded-full  shadow-lg pointer-events-none z-0"
        
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            animate={{
              x: isBeautyActive ? 'calc(100% + 8px)' : '0%'
            }}
          />

          {/* Cloth Tab Button */}
          <button
            onClick={handleClothClick}
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full transition-all duration-300 group relative z-10 cursor-pointer"
            style={{
              color: isClothActive ? goldColor : 'rgba(255, 255, 255, 0.75)',
              transform: isClothActive ? 'scale(1.05)' : 'scale(1)'
            }}
            aria-label="Shop Cloth"
          >
            <Shirt 
              className="w-[18px] h-[18px] transition-all duration-300"
              style={{
                filter: isClothActive ? `drop-shadow(0 0 8px ${goldLight})` : 'none',
                color: isClothActive ? goldColor : 'currentColor'
              }}
            />
            <span className="font-medium text-[15px]">
              Cloth
            </span>
            
            {/* Active indicator dot */}
            {isClothActive && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right w-2 h-2 rounded-full "
                style={{
                  backgroundColor: goldColor,
                }}
              />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-gradient-to-b from-gray-600 to-gray-800 z-10" />

          {/* Beauty Tab Button */}
          <button
            onClick={handleBeautyClick}
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full transition-all duration-300 group relative z-10 cursor-pointer"
            style={{
              color: isBeautyActive ? goldColor : 'rgba(255, 255, 255, 0.75)',
              transform: isBeautyActive ? 'scale(1.05)' : 'scale(1)'
            }}
            aria-label="Go to Beauty page"
          >
            <Sparkles 
              className="w-[18px] h-[18px] transition-all duration-300"
              style={{
                filter: isBeautyActive ? `drop-shadow(0 0 8px ${goldLight})` : 'none',
                color: isBeautyActive ? goldColor : 'currentColor'
              }}
            />
            <span className="font-medium text-[15px]">
              Beauty
            </span>
            
            {/* Active indicator dot */}
            {isBeautyActive && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-(20px) w-2 h-2 rounded-full border border-white"
                style={{
                  backgroundColor: goldColor
                }}
              />
            )}
          </button>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-2 rounded-full blur-xl -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${goldLighter}, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))`
        }}
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BottomActionBar;
