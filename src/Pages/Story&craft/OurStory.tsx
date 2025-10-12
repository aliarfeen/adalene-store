import { useEffect, useRef, useState } from 'react';

import ourstory1 from '../../assets/ourstory&Craft/ourStory1.avif';
import ourstory2 from '../../assets/ourstory&Craft/ourStory2.avif';

const OurStory = () => {
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
        // Smooth out the progress with easing
        const smoothProgress = progress * progress * (3 - 2 * progress);
        setScrollProgress(smoothProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic calculations for animations (increased multipliers for faster movement)
  const scale = 1 + scrollProgress * 0.5;
  const opacity = 1 - scrollProgress * 0.5;
  const slideIn = scrollProgress * 150;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800 tracking-wide">
          Our Story
        </h1>
      </div>
      
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Responsive grid: 1 column on mobile, 2 on medium+ */}
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-2">

            {/* Top Left - Text Paragraph */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200 p-8 sm:p-12"
                style={{
                  transform: `translateY(${scrollProgress * -80}px)`,
                  opacity: opacity + 0.3,
                }}
              >
                <div className="max-w-lg text-center">
                  <h3
                    className="text-3xl sm:text-4xl font-light text-gray-800 mb-6 tracking-wide"
                    style={{ transform: `translateX(${-slideIn * 0.5}px)` }}
                  >
                    Our Story
                  </h3>
                  <p
                    className="text-base sm:text-lg text-gray-600 leading-relaxed"
                    style={{ 
                      transform: `translateY(${slideIn * 0.3}px)`,
                      opacity: opacity + 0.5
                    }}
                  >
                    Crafting timeless leather goods with passion and precision. 
                    Each piece tells a story of dedication, quality materials, 
                    and expert craftsmanship that stands the test of time.
                  </p>
                </div>
              </div>
            </div>

            {/* Top Right - Mini Leather Goods */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollProgress * 120}px) scale(${1 + scrollProgress * 0.3})`,
                }}
              >
                <img 
                  src={ourstory1} 
                  alt="Mini Leather Goods" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Left - Leather Belts */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollProgress * -90}px)`,
                }}
              >
                <img 
                  src={ourstory2} 
                  alt="Leather Belts" 
                  className="w-full h-full object-cover object-center"
                  style={{
                    objectPosition: 'center 40%'
                  }}
                />
              </div>
            </div>

            {/* Bottom Right - Text Paragraph */}
            <div className="relative bg-gradient-to-tl from-amber-50 to-stone-100 overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center p-8 sm:p-12"
                style={{
                  transform: `translateY(${scrollProgress * 50}px) scale(${scale})`,
                  opacity: opacity + 0.4,
                }}
              >
                <div className="max-w-md text-center">
                  <h3
                    className="text-2xl sm:text-3xl font-light text-amber-900 mb-4 tracking-wide"
                    style={{ 
                      opacity: 1 - scrollProgress * 0.3
                    }}
                  >
                    Handcrafted Excellence
                  </h3>
                  <p
                    className="text-sm sm:text-base text-stone-700 leading-relaxed"
                    style={{ 
                      transform: `translateY(${slideIn * 0.2}px)`,
                    }}
                  >
                    From selecting the finest leather to the final stitch, 
                    every detail matters. Our artisans bring decades of experience 
                    to create pieces that become better with age.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;