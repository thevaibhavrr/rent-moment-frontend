import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

const NewYear2026: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'start' | 'main' | 'end'>('start');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [endParticles, setEndParticles] = useState<BurstParticle[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(0);

  // Check if animation should be shown (1 hour cooldown)
  useEffect(() => {
    const lastShown = localStorage.getItem('newyear2026_last_shown');
    if (lastShown) {
      const lastShownTime = parseInt(lastShown);
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (currentTime - lastShownTime < oneHour) {
        // Don't show animation if less than 1 hour has passed
        setIsVisible(false);
        return;
      }
    }
  }, []);

  const handleClose = () => {
    // Store timestamp when animation is closed
    localStorage.setItem('newyear2026_last_shown', Date.now().toString());

    setAnimationPhase('end');
    setContentOpacity(0);
    setTimeout(() => setIsVisible(false), 800);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    console.log('Background clicked - closing animation');
    handleClose();
  };

  // Animation timing control (only for initial animation)
  useEffect(() => {
    const startTimer = setTimeout(() => setAnimationPhase('main'), 800);
    const contentTimer = setTimeout(() => setShowContent(true), 1000);
    const opacityTimer = setTimeout(() => setContentOpacity(1), 1200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(contentTimer);
      clearTimeout(opacityTimer);
    };
  }, []);

  // Creative start animation - central burst
  useEffect(() => {
    if (animationPhase === 'start') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

      const newParticles: BurstParticle[] = [];
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24;
        newParticles.push({
          id: i,
          x: centerX,
          y: centerY,
          angle,
          speed: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
        });
      }
      setBurstParticles(newParticles);
    }
  }, [animationPhase]);

  // End animation - farewell particles
  useEffect(() => {
    if (animationPhase === 'end') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

      const farewellParticles: BurstParticle[] = [];
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16;
        farewellParticles.push({
          id: i + 100, // Different IDs from start particles
          x: centerX,
          y: centerY,
          angle,
          speed: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 3,
        });
      }
      setEndParticles(farewellParticles);
    }
  }, [animationPhase]);

  // Animate burst particles
  useEffect(() => {
    if (burstParticles.length > 0) {
      const interval = setInterval(() => {
        setBurstParticles(prev =>
          prev.map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            speed: particle.speed * 0.95, // slow down
          })).filter(particle => particle.speed > 0.5) // remove slow particles
        );
      }, 16);

      return () => clearInterval(interval);
    }
  }, [burstParticles]);

  // Animate end particles (farewell burst)
  useEffect(() => {
    if (endParticles.length > 0) {
      const interval = setInterval(() => {
        setEndParticles(prev =>
          prev.map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            speed: particle.speed * 0.98, // slower slowdown for elegant fade
          })).filter(particle => particle.speed > 0.3) // keep particles longer
        );
      }, 16);

      return () => clearInterval(interval);
    }
  }, [endParticles]);

  // Create floating particles during main phase
  useEffect(() => {
    if (animationPhase === 'main') {
      const createParticle = () => {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 3 + 2),
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 100,
          maxLife: 100,
        };
        setParticles(prev => [...prev.slice(-20), newParticle]); // keep max 20 particles
      };

      const interval = setInterval(createParticle, 200);

      return () => clearInterval(interval);
    }
  }, [animationPhase]);

  // Animate floating particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.05, // gravity
          life: particle.life - 1,
        })).filter(particle => particle.life > 0 && particle.y > -50)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black/40 cursor-pointer"
      onClick={handleBackgroundClick}
      style={{ zIndex: 9999 }}
    >
      {/* Particles Container */}
      <div className="absolute inset-0">
        {/* Burst Particles from Center */}
        {burstParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 15px ${particle.color}, 0 0 30px ${particle.color}50`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life / particle.maxLife,
              boxShadow: `0 0 10px ${particle.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Farewell End Particles */}
        {endParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 12px ${particle.color}, 0 0 24px ${particle.color}50`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Corner Decorative Elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-gold rounded-full animate-ping"></div>
        <div className="absolute top-12 right-12 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 left-12 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 right-8 w-3 h-3 bg-gold rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div
          className={`text-center transition-all duration-1000 relative z-20 ${
            showContent && animationPhase !== 'end'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4'
          } ${animationPhase === 'end' ? 'scale-105' : ''}`}
          style={{
            opacity: contentOpacity,
            transition: animationPhase === 'end' ? 'all 0.8s ease-in-out' : 'all 1s ease-out'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on card content
        >
          {/* Elegant Container with Close Button */}
          <div
            className={`bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30 backdrop-blur-sm max-w-2xl mx-4 transition-all duration-800 relative ${
              animationPhase === 'end' ? 'shadow-gold/50 border-gold/50' : ''
            }`}
            style={{
              boxShadow: animationPhase === 'end'
                ? '0 0 40px rgba(255, 215, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.2), 0 25px 50px rgba(0, 0, 0, 0.5)'
                : '0 25px 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Close Button in Top Corner */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              <span className="text-white text-xl font-bold leading-none">×</span>
            </button>
            {/* Happy New Year Text */}
            <div className="mb-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-gold to-yellow-500 animate-pulse drop-shadow-2xl">
                HAPPY NEW YEAR
              </h1>
            </div>

            {/* Animated 2026 with Counter Effect */}
            <div className="flex justify-center items-center space-x-1 md:space-x-2 mb-4">
              {[2, 0, 2, 6].map((digit, index) => (
                <div key={index} className="relative">
                  <div
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl transition-all duration-500"
                    style={{
                      textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)',
                      animation: showContent ? `bounce 0.6s ease-in-out ${index * 0.1}s` : 'none',
                    }}
                  >
                    {digit}
                  </div>
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-black text-gold opacity-50 blur-sm"
                    style={{
                      animation: showContent ? `pulse 2s infinite ${index * 0.2}s` : 'none',
                    }}
                  >
                    {digit}
                  </div>
                </div>
              ))}
            </div>

            {/* Celebration Emojis with staggered animation */}
            <div className="flex justify-center space-x-2 md:space-x-4 mb-6">
              {['🎉', '✨', '🎊', '🌟', '🎆'].map((emoji, index) => (
                <span
                  key={index}
                  className="text-2xl md:text-4xl animate-bounce drop-shadow-lg"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '0.8s',
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            {/* 30% Offer Banner with better design */}
            <div className="mb-4">
              <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white px-4 md:px-6 py-3 rounded-xl shadow-2xl border-2 border-yellow-400 animate-bounce">
                <div className="text-lg md:text-2xl font-bold animate-pulse flex items-center justify-center gap-2">
                  <span>🎁</span>
                  <span>30% OFF NEW YEAR SPECIAL!</span>
                  <span>🎁</span>
                </div>
                <div className="text-xs md:text-sm font-semibold mt-1 opacity-90">
                  Limited Time Offer - Valid Till Jan 31st, 2026
                </div>
              </div>
            </div>

            {/* Enhanced Discount Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                💰 Save ₹3000+
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg" style={{animationDelay: '0.2s'}}>
                🏷️ All Categories
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg" style={{animationDelay: '0.4s'}}>
                ⚡ Book Now!
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="mb-4">
              <button className="bg-gradient-to-r from-yellow-400 via-gold to-yellow-500 text-black px-6 py-3 rounded-full font-bold text-base transition-all duration-300 hover:from-yellow-500 hover:to-gold hover:scale-105 transform shadow-2xl hover:shadow-yellow-400/50 animate-pulse border-2 border-white/30">
                <span className="flex items-center gap-2">
                  🎊 Claim 30% OFF Now
                  <span className={`transition-transform duration-300 ${animationPhase === 'end' ? 'animate-bounce' : ''}`}>→</span>
                </span>
              </button>
            </div>

            {/* Inspirational Message */}
            <p className="text-sm md:text-base text-white/90 font-light animate-pulse leading-relaxed mb-6">
              Start your year with luxury fashion at unbeatable prices! <br className="hidden md:block" />
              Wishing you joy, prosperity, and unforgettable moments in 2026! 🌟
            </p>

            {/* Close Button at Bottom */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Close Animation
              </button>
              <p className="text-xs text-white/60 text-center">
                Click anywhere outside to close
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYear2026;
