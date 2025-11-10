import { useEffect, useRef, useState } from 'react';
import craft1 from '../../assets/ourstory&Craft/ourCraft1.avif';
import craft2 from '../../assets/ourstory&Craft/ourCraft2.avif';
import craft3 from '../../assets/ourstory&Craft/ourcraft3.avif';
import { Helmet } from 'react-helmet';

const OurCraft = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max( // Cast to HTMLDivElement
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

  // Smooth animations with easing
  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeProgress = easeInOutQuad(scrollProgress);
  
  const imageParallax = easeProgress * 50;

  // Your images
  const images = {
    craft1: craft1,
    craft2: craft2,
    craft3: craft3
  };

  return (
    <>
    <Helmet>
      <title>Our Craft</title>
    </Helmet>
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 tracking-wide">
          Our Craft
        </h1>
      </div>
      
      <div ref={containerRef} className="relative h-auto md:h-[300vh]">
        <div className="md:sticky md:top-0 h-auto md:h-screen w-full overflow-hidden">
          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col">
            {/* Card 1 */}
            <div className="w-full h-64 sm:h-80 flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-6">
                <div className="max-w-sm text-center">
                  <h3 className="text-2xl sm:text-3xl font-light text-amber-900 mb-4 tracking-wide">
                    Master Craftsmanship
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Every leather piece is meticulously handcrafted by skilled artisans. 
                    We select only premium full-grain leather and use traditional 
                    techniques passed down through generations to ensure lasting quality.
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <img 
                  src={images.craft1} 
                  alt="Handcrafted Leather Goods" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full h-64 sm:h-80 flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img 
                  src={images.craft2} 
                  alt="Leather Belts and Accessories" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-gradient-to-tl from-gray-100 to-gray-200 flex items-center justify-center p-6">
                <div className="max-w-sm text-center">
                  <h3 className="text-xl sm:text-2xl font-light text-gray-800 mb-3 tracking-wide">
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

            {/* Card 3 */}
            <div className="w-full h-80 sm:h-96 overflow-hidden">
              <img 
                src={images.craft3} 
                alt="Premium Leather Craftsmanship" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 4 */}
            <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center p-6">
              <div className="max-w-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-light text-stone-800 mb-4 tracking-wide">
                  Attention to Detail
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Every stitch, every edge, every finish is executed with precision. 
                  Our commitment to detail ensures durability and elegance in 
                  products designed to last a lifetime.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Grid */}
          <div className="hidden md:grid h-screen w-full grid-cols-2 auto-rows-fr gap-1">
            {/* Top Left - Craftsmanship Text */}
            <div className="relative bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden flex items-center justify-center p-12">
              <div className="max-w-lg text-center">
                <h3 className="text-3xl md:text-4xl font-light text-amber-900 mb-6 tracking-wide">
                  Master Craftsmanship
                </h3>
                <p className="text-base md:text-lg text-stone-700 leading-relaxed">
                  Every leather piece is meticulously handcrafted by skilled artisans. 
                  We select only premium full-grain leather and use traditional 
                  techniques passed down through generations to ensure lasting quality.
                </p>
              </div>
            </div>

            {/* Top Right - Image 1 */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-100"
                style={{
                  transform: `translateY(${imageParallax}px)`,
                }}
              >
                <img 
                  src={images.craft1} 
                  alt="Handcrafted Leather Goods" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Left - Image 2 */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-100"
                style={{
                  transform: `translateY(${-imageParallax * 0.8}px)`,
                }}
              >
                <img 
                  src={images.craft2} 
                  alt="Leather Belts and Accessories" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Bottom Right - Quality Text */}
            <div className="relative bg-gradient-to-tl from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center p-12">
              <div className="max-w-md text-center">
                <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4 tracking-wide">
                  Timeless Quality
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  From wallets to belts, each item is built to develop character 
                  over time. We believe in creating pieces that age beautifully 
                  and become more personal with every use.
                </p>
              </div>
            </div>

            {/* Extra Left - Attention Text */}
            <div className="relative bg-gradient-to-br from-stone-50 to-amber-50 overflow-hidden flex items-center justify-center p-12">
              <div className="max-w-lg text-center">
                <h3 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-wide">
                  Attention to Detail
                </h3>
                <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                  Every stitch, every edge, every finish is executed with precision. 
                  Our commitment to detail ensures durability and elegance in 
                  products designed to last a lifetime.
                </p>
              </div>
            </div>

            {/* Extra Right - Image 3 */}
            <div className="relative overflow-hidden md:row-span-2">
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-100"
                style={{
                  transform: `translateY(${imageParallax * 1.2}px)`,
                }}
              >
                <img 
                  src={images.craft3} 
                  alt="Premium Leather Craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OurCraft;