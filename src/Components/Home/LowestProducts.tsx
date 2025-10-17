

import useProducts from "../../hooks/useProducts";
import SwiperSlider from "../Sliders/SwiperSlider";


const LowestProducts = () => {
  const { products: data, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  const products = Array.isArray(data) ? data : [];

  const validProducts = products.filter(
    (p) => p.price !== undefined && p.price !== null && !isNaN(Number(p.price))
  );

  return (
    <SwiperSlider
      title="Lowest Price Products"
      products={validProducts}
      sortFn={(a, b) => Number(a.price) - Number(b.price)}
      limit={8}
    />
  );
};

export default LowestProducts;
