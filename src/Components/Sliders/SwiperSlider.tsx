import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../Products/ProductCard";
import type { Product } from "../../Types";

// type Product = {
//   id: string | number;
//   name: string;
//   price: number | string;
//   image?: string;
// };

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

  let sortedProducts = [...products];

  if (sortFn) {
    sortedProducts.sort(sortFn);
  }

  const sliced = sortedProducts.slice(0, limit);

  return (
    <div className="my-10 px-5 m-5">
      <h1 className="text-4xl md:text-5xl text-center text-amber-950 mb-16">
        {title}
      </h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
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
