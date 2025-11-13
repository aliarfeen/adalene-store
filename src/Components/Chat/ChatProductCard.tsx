import slugify from "slugify";
import type { Product } from "../../Types/Product";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

interface Props {
  product: Product;
}

export default function ChatProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { setproduct } = useContext(ProductContext) ?? {};
      const goToDetails = () => {
        setproduct?.(product);
        localStorage.setItem("product", JSON.stringify(product));
        const slug = slugify(product.title ?? '', { lower: true, strict: true });
        navigate(`/product/${slug}`);
      };
    
  return (
    <div onClick={goToDetails} className="flex w-64 bg-gray-100 rounded-lg shadow-md overflow-hidden flex-shrink-0 cursor-pointer">
      {/* Left: product image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-24 h-24 object-cover"
      />

      {/* Right: product info */}
      <div className="p-2 flex flex-col justify-between flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-orange-800 font-bold">${product.price}</p>
        {product.bestSeller && (
          <span className="text-xs bg-orange-200 text-orange-800 px-1 rounded inline-block">
            Best Seller
          </span>
        )}
      </div>
    </div>
  );
}
