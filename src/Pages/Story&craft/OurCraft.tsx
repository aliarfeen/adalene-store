import { useEffect, useRef, useState } from 'react';

import craft1 from '../../assets/ourstory&Craft/ourCraft1.avif';
import craft2 from '../../assets/ourstory&Craft/ourCraft2.avif';
import craft3 from '../../assets/ourstory&Craft/ourcraft3.avif'

const OurCraft = () => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gentler animations - text stays more readable
  const textOpacity = 1; // Keep text fully visible
  const imageParallax = scrollProgress * 60;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800 tracking-wide">
          Our Craft
        </h1>
      </div>
      
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-1">

            {/* Top Left - Craftsmanship Text */}
            <div className="relative bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden min-h-[50vh] md:min-h-0">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12"
                style={{
                  opacity: textOpacity,
                }}
              >
                <div className="max-w-lg text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-amber-900 mb-4 sm:mb-6 tracking-wide">
                    Master Craftsmanship
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed">
                    Every leather piece is meticulously handcrafted by skilled artisans. 
                    We select only premium full-grain leather and use traditional 
                    techniques passed down through generations to ensure lasting quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Top Right - Image 1 */}
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${imageParallax}px)`,
                }}
              >
                <img 
                  src={craft1} 
                  alt="Handcrafted Leather Goods" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Left - Image 2 */}
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${-imageParallax * 0.8}px)`,
                }}
              >
                <img 
                  src={craft2} 
                  alt="Leather Belts and Accessories" 
                  className="w-full h-full object-cover object-center"
                  style={{
                    objectPosition: 'center 40%'
                  }}
                />
              </div>
            </div>

            {/* Bottom Right - Quality Text */}
            <div className="relative bg-gradient-to-tl from-gray-100 to-gray-200 overflow-hidden min-h-[50vh] md:min-h-0">
              <div
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-12"
                style={{
                  opacity: textOpacity,
                }}
              >
                <div className="max-w-md text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 mb-3 sm:mb-4 tracking-wide">
                    Timeless Quality
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    From wallets to belts, each item is built to develop character 
                    over time. We believe in creating pieces that age beautifully 
                    and become more personal with every use.
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Left - Attention Text */}
            <div className="relative bg-gradient-to-br from-stone-50 to-amber-50 overflow-hidden">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12"
                style={{
                  opacity: textOpacity,
                }}
              >
                <div className="max-w-lg text-center">
                  <h3 className="text-3xl sm:text-4xl font-light text-stone-800 mb-6 tracking-wide">
                    Attention to Detail
                  </h3>
                  <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                    Every stitch, every edge, every finish is executed with precision. 
                    Our commitment to detail ensures durability and elegance in 
                    products designed to last a lifetime.
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Right - Image 3 */}
            <div className="relative overflow-hidden md:row-span-2">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${imageParallax * 1.2}px)`,
                }}
              >
                <img 
                  src={craft3} 
                  alt="Premium Leather Craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCraft;