
import { Link } from "react-router-dom";
import { Button } from "../Common/Button";
import useProducts from "../../hooks/useProducts";
import SwiperSlider from "../Sliders/SwiperSlider";


const BestSellerSlider = () => {
  const { products: data, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  const products = Array.isArray(data) ? data : [];

  // ✅ Filter only best seller products
  const bestSellers = products.filter((p) => p.bestSeller);

  if (bestSellers.length === 0) {
    return <p>No Best Seller products available.</p>;
  }

  return (
    <div className="my-10 px-5 m-5">

      <SwiperSlider
        title="Best Sellers"
        products={bestSellers}
        limit={8} 
      />

  
      <div className="flex justify-center items-center mt-6">
        <Link to="/products">
          <Button text="Shop All" />
        </Link>
      </div>
    </div>
  );
};

export default BestSellerSlider;
