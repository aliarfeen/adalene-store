import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import bestSeller1 from '../../assets/BestSeller/p-bag1.avif'
import bestSeller2 from '../../assets/BestSeller/p-bag2.avif'
import bestSeller3 from '../../assets/BestSeller/p-bag3.avif'
import bestSeller4 from '../../assets/BestSeller/p-bag4.avif'
import bestSeller5 from '../../assets/BestSeller/p-bag6.avif'
import bestSeller8 from '../../assets/BestSeller/p-bag5.avif'
import bestSeller6 from '../../assets/BestSeller/p-bag7.avif'
import bestSeller7 from '../../assets/BestSeller/p-bag8.avif'
import { Button } from '../Common/Button'


interface BestProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export const BestSellerSlider = () => {
  const bestSeller: BestProduct[] = [
    { id: 1, title: "Leather Bucket Bag", price: 250.00, description: "Premium leather bucket bag with adjustable strap", image: bestSeller1 },
    { id: 2, title: "Classic Tote Bag", price: 180.00, description: "Elegant tote bag perfect for everyday use", image: bestSeller2 },
    { id: 3, title: "Crossbody Satchel", price: 220.00, description: "Compact crossbody bag with multiple compartments", image: bestSeller3 },
    { id: 4, title: "Mini Shoulder Bag", price: 150.00, description: "Stylish mini bag for essential items", image: bestSeller4 },
    { id: 5, title: "Hobo Bag", price: 280.00, description: "Spacious hobo style bag with soft leather", image: bestSeller5 },
    { id: 6, title: "Hobo Bag", price: 280.00, description: "Spacious hobo style bag with soft leather", image: bestSeller8 },
    { id: 7, title: "Structured Handbag", price: 320.00, description: "Sophisticated structured bag for formal occasions", image: bestSeller6 },
    { id: 8, title: "Structured Handbag", price: 320.00, description: "Sophisticated structured bag for formal occasions", image: bestSeller7 },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, bestSeller.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [maxIndex])
  return (
    <div className="w-full bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Best Sellers</h2>
      <div className="max-w-7xl mx-auto relative">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {bestSeller.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden relative h-full">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-orange-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Best Seller
                    </span>
                  </div>
                  <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-gray-800 text-lg font-normal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-red-600 text-xl font-light italic">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-orange-800 w-8' : 'bg-gray-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button text="Shop All Page" />
        </div>
      </div>
    </div>
  )
}