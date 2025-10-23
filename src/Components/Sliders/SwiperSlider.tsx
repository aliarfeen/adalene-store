import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../Products/ProductCard";
import type { Product } from "../../Types";

import "swiper/css";
import "swiper/css/navigation";

type ProductSliderProps = {
  title: string;
  products: Product[];
  sortFn?: (a: Product, b: Product) => number;
  limit?: number;
};

const SwiperSlider = ({ title, products, sortFn, limit = 8 }: ProductSliderProps) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  const sortedProducts = [...products];
  if (sortFn) sortedProducts.sort(sortFn);

  const sliced = sortedProducts.slice(0, limit);

  return (
    <div className="my-10 px-5 m-5">
      <h1 className="text-4xl md:text-5xl text-center text-amber-950 mb-16">
        {title}
      </h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {sliced.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
