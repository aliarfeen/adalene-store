import { useEffect, useRef, useState } from 'react';

import bag1 from '../../assets/bag5.avif';
import bag2 from '../../assets/bag6.webp';
import leather1 from '../../assets/leather1.webp';
import leather2 from '../../assets/leather2.avif';

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

  // Dynamic calculations for animations
  const rotation = scrollProgress * 360;
  const scale = 1 + scrollProgress * 0.3;
  const opacity = 1 - scrollProgress * 0.3;
  const slideIn = scrollProgress * 100;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div ref={containerRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Responsive grid: 1 column on mobile, 2 on medium+ */}
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-2">

            {/* Top Left - Product Card */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 p-4"
                style={{
                  transform: `translateY(${scrollProgress * -50}px) scale(${scale})`,
                  opacity: opacity + 0.3,
                }}
              >
                <div
                  className="relative mb-4 sm:mb-8"
                  style={{ transform: `rotate(${rotation * 0.2}deg)` }}
                >
                  <div className="w-64 h-40 sm:w-80 sm:h-56 bg-amber-900 rounded-lg shadow-2xl overflow-hidden">
                    <img src={bag1} alt="Product" className="w-full h-full object-cover" />
                    <div
                      className="absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full blur-sm"
                      style={{
                        transform: `translate(${Math.sin(rotation * 0.05) * 20}px, ${Math.cos(rotation * 0.05) * 20}px)`,
                        opacity: scrollProgress * 0.5,
                      }}
                    ></div>
                  </div>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-light text-gray-800 mb-2 tracking-wide"
                  style={{ transform: `translateX(${-slideIn * 0.5}px)` }}
                >
                  Artisan Collection
                </h3>
                <p
                  className="text-2xl sm:text-3xl font-semibold text-amber-600"
                  style={{ transform: `translateX(${slideIn * 0.5}px)` }}
                >
                  $149.00
                </p>
              </div>
            </div>

            {/* Top Right - Mini Leather Goods */}
            <div className="relative bg-gradient-to-bl from-stone-700 to-stone-900 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollProgress * 80}px) scale(${1 + scrollProgress * 0.2})`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-stone-600 to-stone-800 relative">
                  <img src={bag2} alt="Mini Leather Goods" className="absolute inset-0 w-full h-full object-cover opacity-70" />

                  <div
                    className="absolute top-6 right-4 sm:top-8 sm:right-8 text-right"
                    style={{
                      opacity: 1 - scrollProgress * 0.5,
                      transform: `translateX(${scrollProgress * -30}px)`,
                    }}
                  >
                    <h2 className="text-2xl sm:text-4xl font-extralight tracking-[0.2em] sm:tracking-[0.4em] text-amber-100">MINI</h2>
                    <h2 className="text-2xl sm:text-4xl font-extralight tracking-[0.2em] sm:tracking-[0.4em] text-amber-100">LEATHER</h2>
                    <h2 className="text-2xl sm:text-4xl font-extralight tracking-[0.2em] sm:tracking-[0.4em] text-amber-100">GOODS</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left - Leather Belts */}
            <div className="relative bg-gradient-to-tr from-neutral-200 to-neutral-300 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollProgress * -60}px)`,
                }}
              >
                <div className="w-full h-full bg-neutral-800 relative">
                  <img src={leather1} alt="Leather Belts" className="absolute inset-0 w-full h-full object-cover" />

                  <div
                    className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 z-10"
                    style={{
                      transform: `translateY(${-slideIn * 0.5}px)`,
                      opacity: opacity + 0.5,
                    }}
                  >
                    <h2 className="text-3xl sm:text-5xl font-thin tracking-[0.2em] sm:tracking-[0.3em] text-black mb-1 sm:mb-2">LEATHER</h2>
                    <h2 className="text-3xl sm:text-5xl font-thin tracking-[0.2em] sm:tracking-[0.3em] text-amber-800">BELTS</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right - Belt Detail (Hexagon Shape) */}
            <div className="relative bg-gradient-to-tl from-amber-50 to-stone-100 overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 p-4"
                style={{
                  transform: `translateY(${scrollProgress * -50}px) scale(${scale})`,
                  opacity: opacity + 0.3,
                }}
              >
                <div
                  className="relative"
                  style={{ transform: `rotate(${rotation * 0.2}deg)` }}
                >
                  <div
                    className="relative w-40 h-44 sm:w-64 sm:h-72 bg-gradient-to-br from-amber-700 to-amber-950 shadow-2xl overflow-hidden"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    <img src={leather2} alt="Belt Detail" className="w-full h-full object-cover" />
                    <div
                      className="absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full blur-sm"
                      style={{
                        transform: `translate(${Math.sin(rotation * 0.05) * 20}px, ${Math.cos(rotation * 0.05) * 20}px)`,
                        opacity: scrollProgress * 0.5,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Scroll Progress Indicator */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
            <div className="w-32 sm:w-48 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-800 transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeatherGoodsSection;