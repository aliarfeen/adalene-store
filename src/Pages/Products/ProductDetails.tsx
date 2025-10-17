import ProductPrieview from "../../Components/ProductDetails/ProductPreview";
import InfoContainer from "../../Components/ProductDetails/InfoColumn";
import type { Product } from "../../Types";
import ScrollToTop from "../../Components/Common/ScrollToTop";
import SwiperSlider from "../../Components/Sliders/SwiperSlider";
import useProducts from "../../hooks/useProducts";

const ProductDetails = () => {
  const product: Product = JSON.parse(localStorage.getItem("product") || "{}");
  const {products} = useProducts();
  
  const filterdDataByCategory = products.filter((p)=> p.category === product.category)
  
  console.log(product.category);
  

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
        category={""}
        quantity={product.quantity}
        orderQuantity={0}
      />
      
      <InfoContainer />
      <SwiperSlider
        title="Related Products"
        products={ filterdDataByCategory || []}
        sortFn={(a, b) => Number(a.price) - Number(b.price)}
        limit={filterdDataByCategory.length}
      />
    </div>
  );
};

export default ProductDetails;
