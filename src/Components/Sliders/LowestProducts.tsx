import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../Products/ProductCard";

const LowestProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://68e4f1f88e116898997db023.mockapi.io/data"
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  const products = Array.isArray(data) ? data : [];

  // Ensure price is a valid number
  const validProducts = products.filter(
    (p) => p.price !== undefined && p.price !== null && !isNaN(Number(p.price))
  );

  //  Sort by lowest price
  const lowestProducts = [...validProducts].sort(
    (a, b) => Number(a.price) - Number(b.price)
  );

  // Show only first 8 cheapest
  const topLowest = lowestProducts.slice(0, 8);

  if (topLowest.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="my-10 px-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Lowest Price Products</h2>

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
        {topLowest.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LowestProducts;
