import { useEffect, useRef, useState } from 'react';

import bag1 from '../../assets/bag5.avif';
import bag2 from '../../assets/bag6.webp';
import leather1 from '../../assets/leather1.webp';
import leather2 from '../../assets/leather2.avif';
import { Link } from 'react-router-dom';

const LeatherGoodsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, -rect.top / (rect.height - window.innerHeight))
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = Math.min(1, scrollProgress * 2);
  const slideUp = (1 - fadeIn) * 100;
  const parallax = scrollProgress * 150;

  return (
    <div className="bg-stone-50">
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Hero Section with Split Design */}
          <div className="relative h-full w-full bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100">
            
            {/* Animated Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 191, 36, 0.1) 35px, rgba(251, 191, 36, 0.1) 70px)',
                transform: `translateX(${-scrollProgress * 200}px)`
              }}
            />

            {/* Main Content Grid */}
            <div className="relative h-full w-full flex flex-col lg:flex-row">
              
              {/* Left Side - Featured Product */}
              <div className="flex-1 relative overflow-hidden">
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{
                    transform: `translateY(${slideUp}px)`,
                    opacity: fadeIn
                  }}
                >
                  <div className="max-w-xl w-full">
                    
                    {/* Main Product Image */}
                    <div 
                      className="relative mb-8 group"
                      style={{
                        transform: `translateY(${-parallax * 0.3}px)`
                      }}
                    >
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={bag1} 
                          alt="Artisan Leather Bag" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Floating Accent */}
                      <div 
                        className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"
                        style={{
                          transform: `scale(${1 + scrollProgress * 0.5})`,
                          opacity: scrollProgress * 0.8
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div 
                      className="text-center space-y-4"
                      style={{
                        transform: `translateY(${slideUp * 0.5}px)`,
                        opacity: fadeIn
                      }}
                    >
                      <h3 className="text-4xl md:text-5xl font-light text-amber-700 tracking-wider">
                        Artisan Collection
                      </h3>
                      <p className="text-stone-400 text-lg">Handcrafted Leather Excellence</p>
                      <div className="text-5xl font-bold text-amber-800">$149.00</div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Side - Product Showcase Grid */}
              <div className="flex-1 relative p-4 lg:p-8">
                <div className="h-full grid grid-cols-2 gap-4">
                  
                  {/* Mini Leather Goods */}
                  <div 
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                    style={{
                      transform: `translateX(${(1 - fadeIn) * 50}px)`,
                      opacity: fadeIn
                    }}
                  >
                    <img 
                      src={bag2} 
                      alt="Mini Leather Goods" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-light text-amber-100 tracking-widest mb-1">MINI</h4>
                      <p className="text-sm text-stone-300">Compact Essentials</p>
                    </div>
                    <div 
                      className="absolute top-4 right-4 w-12 h-12 border-2 border-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        transform: 'rotate(45deg)'
                      }}
                    />
                  </div>

                  {/* Leather Belts */}
                  <div 
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                    style={{
                      transform: `translateX(${(1 - fadeIn) * 50}px)`,
                      opacity: fadeIn,
                      transitionDelay: '100ms'
                    }}
                  >
                    <img 
                      src={leather1} 
                      alt="Leather Belts" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-light text-amber-100 tracking-widest mb-1">BELTS</h4>
                      <p className="text-sm text-stone-300">Premium Quality</p>
                    </div>
                    <div 
                      className="absolute top-4 right-4 w-12 h-12 border-2 border-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        transform: 'rotate(45deg)'
                      }}
                    />
                  </div>

                  {/* Belt Detail - Spans 2 columns */}
                  <div 
                    className="col-span-2 relative rounded-xl overflow-hidden group cursor-pointer"
                    style={{
                      transform: `translateY(${(1 - fadeIn) * 50}px)`,
                      opacity: fadeIn,
                      transitionDelay: '200ms'
                    }}
                  >
                    <img 
                      src={leather2} 
                      alt="Belt Detail" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-between p-6">
                      <div>
                        <h4 className="text-3xl font-light text-amber-100 tracking-widest mb-2">LEATHER GOODS</h4>
                        <p className="text-stone-300">Timeless Craftsmanship</p>
                      </div>
                      <div 
                        className="text-6xl text-amber-500/20 group-hover:text-amber-500/40 transition-colors duration-500"
                        style={{
                          transform: `rotate(${scrollProgress * 180}deg)`
                        }}
                      >
                        ✦
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-amber-500/30 rounded-full blur-sm"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2 + i) * 30}px)`,
                  opacity: scrollProgress * 0.6
                }}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeatherGoodsSection;