import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../Products/ProductCard";
import { Button } from "../Common/Button";
import { Link } from "react-router-dom";

const BestSellerSlider = () => {
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
  const bestSellers = products.filter((p) => p.bestSeller);

  if (bestSellers.length === 0) {
    return <p>No Best Seller products available.</p>;
  }

  return (
    <div className="my-10 px-5 m-5">
         <h1 className="text-4xl md:text-5xl font-serif text-center text-amber-950 mb-16">Best Sellers</h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}

        breakpoints={{
          320: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 2 }, // small
          1024: { slidesPerView: 3 }, // medium
          1280: { slidesPerView: 4 }, // large
        }}
      >
        {bestSellers.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-6">
      <Link to='/products'> <Button text="Shop All" /></Link> 
      </div>

    </div>
  );
};

export default BestSellerSlider;
