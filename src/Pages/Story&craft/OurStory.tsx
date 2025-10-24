import { useEffect, useRef, useState } from 'react';
import ourstory1 from '../../assets/ourstory&Craft/ourStory1.avif';
import ourstory2 from '../../assets/ourstory&Craft/ourStory2.avif';

const OurStory = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, -rect.top / (rect.height - window.innerHeight))
        );
        // Smooth easing function for very smooth animation
        const smoothProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        setScrollProgress(smoothProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth animation values
  const imageScale = 1 + scrollProgress * 0.2;
  const imageFade = 1 - scrollProgress * 0.3;
  const textFade = 1 - scrollProgress * 0.2;
  const parallaxOffset = scrollProgress * 60;



  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-gray-800 tracking-wide">
          Our Story
        </h1>
      </div>
      
      <div ref={containerRef} className="relative min-h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
          {/* Responsive grid: 1 column on mobile, 2 on medium+ */}
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Left Section - Text (Fixed) */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-hidden">
              <div className="max-w-md w-full text-center">
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-4 sm:mb-6 tracking-wide transition-opacity duration-300"
                  style={{ opacity: textFade }}
                >
                  Our Story
                </h3>
                <p 
                  className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed transition-opacity duration-300"
                  style={{ opacity: textFade }}
                >
                  Crafting timeless leather goods with passion and precision. 
                  Each piece tells a story of dedication, quality materials, 
                  and expert craftsmanship that stands the test of time.
                </p>
              </div>
            </div>

            {/* Right Section - Images with Parallax (Full Height) */}
            <div className="relative w-full h-full overflow-hidden bg-gray-800">
              
              {/* Top Image - 50% height */}
              <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden flex items-center justify-center">
                <div
                  className="w-full h-full flex items-center justify-center transition-all duration-200"
                  style={{
                    transform: `translateY(${parallaxOffset * 0.5}px) scale(${imageScale})`,
                    opacity: imageFade
                  }}
                >
                  <img 
                    src={ourstory1}
                    alt="Mini Leather Goods"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Bottom Image - 50% height */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden border-t border-gray-300 flex items-center justify-center">
                <div
                  className="w-full h-full flex items-center justify-center transition-all duration-200"
                  style={{
                    transform: `translateY(${-parallaxOffset * 0.4}px) scale(${imageScale})`,
                    opacity: imageFade
                  }}
                >
                  <img 
                    src={ourstory2}
                    alt="Leather Belts"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Section - Additional Content */}
        <div className="relative bg-gradient-to-b from-amber-50 to-stone-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-amber-900 mb-4 sm:mb-6 tracking-wide">
              Handcrafted Excellence
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
              From selecting the finest leather to the final stitch, 
              every detail matters. Our artisans bring decades of experience 
              to create pieces that become better with age.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;