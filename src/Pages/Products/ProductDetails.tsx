import ProductPrieview from "../../Components/ProductDetails/ProductPreview";
import InfoContainer from "../../Components/ProductDetails/InfoColumn";
import type { Product } from "../../Types";
import ScrollToTop from "../../Components/Common/ScrollToTop";
import SwiperSlider from "../../Components/Sliders/SwiperSlider";
import useProducts from "../../hooks/useProducts";
import ProductRatingCard from "../../Components/ProductDetails/ProductRatingCard";
import CommentSection from "../../Components/ProductDetails/CommentSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  
  const { pathname } = useLocation();
  let product: Product = JSON.parse(localStorage.getItem("product") || "{}");
  const { products } = useProducts();

  const filterdDataByCategory = products.filter(
    (p) => p.category === product.category
  );
  useEffect(() => {
    product = JSON.parse(localStorage.getItem("product") || "{}");
  }, [pathname]);
  return (
    <div>
      <ScrollToTop />
      <ProductPrieview
        bestSeller={product.bestSeller}
        resource={"products"}
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        image={product.image}
        category={product.category}
        quantity={product.quantity}
        orderQuantity={product.orderQuantity}
        rating={product.rating}
        comments={product.comments}
      />
      <div className="flex flex-col xl:flex-row justify-around">
        <ProductRatingCard product={product} />
        <CommentSection product={product} />
      </div>

      <InfoContainer />
      <SwiperSlider
        title="Related Products"
        products={filterdDataByCategory || []}
        sortFn={(a, b) => Number(a.price) - Number(b.price)}
        limit={filterdDataByCategory.length}
      />
    </div>
  );
};

export default ProductDetails;
