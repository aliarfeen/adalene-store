import React, { useState, useEffect } from "react";
import type { Product } from "../../Types";
import { Button } from "../Common/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Features/products/productSlice";
import { toast, ToastContainer } from "react-toastify";
import apiFactory from "../../Api/apiFactory";

// --- Placeholder image ---
const PLACEHOLDER_IMAGE_URL = "https://i.imgur.com/g8D0kK5.png";

const ProductPreview: React.FC<Product> = ({
  image = PLACEHOLDER_IMAGE_URL,
  title = "I'm a product",
  id = "1",
  price = 250.0,
  description = "I'm a product description...",
  resource,
  category,
  bestSeller,
  quantity = 10,
  rating,
  comments,
}) => {
  const dispatch = useDispatch();
  const cart = localStorage.getItem("cart");
  const parsedCart = cart ? JSON.parse(cart) : [];
  const pathname = window.location.pathname;
  let currentUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
  useEffect(
    () => {
      currentUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

    }, [pathname]
  )

  const favorites = currentUser.favourites || [];

  let initialOrderQuantity = 1;
  const [addedToFavorites, setAddedToFavorites] = useState(favorites.some((p: Product) => p.id === id));
  console.log(currentUser);
  const handleFavorite = (product: Product) => {
    if (currentUser.role !== "customer") {
      toast.error("Only customers can add to favorites!");
      return;
    }

    setAddedToFavorites(!addedToFavorites);

    const favorites = currentUser.favourites || [];

    if (!addedToFavorites) {
      //  إضافة المنتج
      const updatedFavs = [...favorites, product];
      apiFactory.updateUser({
        ...currentUser,
        favourites: updatedFavs,
      });
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ ...currentUser, favourites: updatedFavs })
      );
    } else {
      //  حذف المنتج
      const updatedFavs = favorites.filter((p: Product) => p.id !== product.id);
      apiFactory.updateUser({
        ...currentUser,
        favourites: updatedFavs,
      });
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ ...currentUser, favourites: updatedFavs })
      );
    }

    //  التحديث الفوري للـ Navbar بدون reload
    window.dispatchEvent(new Event("storage"));
  };

  // const handleFavorite = (product: Product) => {
  //   if (currentUser.role !== "customer") {
  //     toast.error("Successfully toasted!");
  //     return;
  //   } else {
  //     setAddedToFavorites(!addedToFavorites);
  //     if (!addedToFavorites) {
  //       const favorites = currentUser.favourites || [];
  //       favorites.push(product);
  //       apiFactory.updateUser({
  //         ...currentUser,
  //         favourites: favorites,
  //       });
  //       localStorage.setItem(
  //         "loggedUser",
  //         JSON.stringify({ ...currentUser, favourites: favorites })
  //       );
  //     }
  //     if (addedToFavorites) {
  //       const favorites = currentUser.favourites || [];
  //       apiFactory.updateUser({
  //         ...currentUser,
  //         favourites: favorites.filter((p: Product) => p.id !== product.id),
  //       });
  //       localStorage.setItem(
  //         "loggedUser",
  //         JSON.stringify({
  //           ...currentUser,
  //           favourites: favorites.filter((p: Product) => p.id !== product.id),
  //         })
  //       );
  //     }
  //   }
  // };

  // Find if the product is already in the cart and set its orderQuantity
  const existingCartItem = parsedCart.find((e: Product) => e.id === id);
  if (existingCartItem) {
    initialOrderQuantity = 1;
  }

  const [clientorderQuantity, setorderQantity] = useState(initialOrderQuantity);
  const [blur, setBlur] = useState(true);

  const quantityDiffernce = quantity - clientorderQuantity;

  useEffect(() => {
    const timer = setTimeout(() => setBlur(false), 750);
    return () => clearTimeout(timer);
  }, []);

  const addToCartAndNotify = () => {
    if (quantityDiffernce <= -1) {
      toast.error(`${title} is out of stock!`);
      return;
    }

    dispatch(
      addToCart({
        id,
        image,
        title,
        price,
        quantity,
        resource,
        description,
        category,
        bestSeller,
        rating,
        comments,
        orderQuantity: clientorderQuantity,
      })
    );

    toast.success(`(${title}) was added to cart!`);
  };

  const handleQuantityChange = (delta: number) => {
    setorderQantity((prev: number) => {
      // Calculate the next value based on user action
      const newQuantity = prev + delta;

      // Don't allow increasing beyond available stock
      if (newQuantity > quantity) {
        toast.error(`${title} is out of stock!`);

        return prev;
      }

      // Don't allow decreasing below 1
      if (delta < 0 && newQuantity < 1) return prev;

      return newQuantity;
    });
  };

  const formattedPrice = `${price.toFixed(2)} EGP`;

  // --- Stock Labels Logic ---
  const stockLabel =
    quantityDiffernce <= 0
      ? { text: "Out of Stock", color: "bg-red-600" }
      : quantityDiffernce <= 5
        ? { text: "Low Stock", color: "bg-yellow-500" }
        : null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
      <ToastContainer position="bottom-left" autoClose={2000} />
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* --- Product Image --- */}
        <div className="relative w-full md:w-1/2 flex justify-center items-start">
          {bestSeller && (
            <div className="absolute top-4 left-4 bg-orange-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
              Best Seller
            </div>
          )}

          {stockLabel && (
            <div
              className={`absolute top-4 right-4 ${stockLabel.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10`}
            >
              {stockLabel.text}
            </div>
          )}

          <img
            src={image}
            alt={title}
            className={`w-96 h-96 object-cover max-w-lg shadow-lg transition-all duration-500 ${blur ? "blur-md scale-105" : "blur-0 scale-100"
              }`}
          />
        </div>

        {/* --- Product Details --- */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-normal mb-1 text-gray-800">{title}</h1>
          <p className="text-sm mb-1 text-gray-500">SKU: ADALENE_{id}</p>
          <p className="text-xl font-medium mb-4 text-red-600">
            {formattedPrice}
          </p>

          <p className="text-base mb-2 text-gray-700">{description}</p>
          <p className="text-base mb-2 text-yellow-500">
            {" "}
            Only {quantityDiffernce >= 0 ? quantityDiffernce : 0} items left !
          </p>

          <hr className="my-6 border-t border-gray-200" />

          {/* --- Quantity Selector --- */}
          <div className="mb-6">
            <label
              htmlFor="quantity-input"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Quantity <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center justify-between max-w-fit border border-gray-300 rounded overflow-hidden">
              <button
                className="p-2 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handleQuantityChange(-1)}
                disabled={clientorderQuantity <= 1}
              >
                –
              </button>
              <div className="p-2">{clientorderQuantity}</div>
              <button
                className="p-2 border-l border-gray-300 hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex flex-col space-y-3">
            <Button
              className={`py-3 px-6 text-white text-base font-semibold rounded shadow-md transition-colors duration-200 
                ${quantityDiffernce <= -1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-800 hover:bg-gray-800"
                }`}
              onClick={addToCartAndNotify}
              text={quantityDiffernce <= -1 ? "Unavailable" : "Add to Cart"}
            />
            <Button
              className={`py-3 px-6  text-base font-semibold rounded shadow-md transition-colors duration-200 `}
              onClick={() =>
                handleFavorite({
                  id,
                  image,
                  title,
                  price,
                  quantity,
                  resource,
                  description,
                  category,
                  bestSeller,
                  rating,
                  comments,
                  orderQuantity: clientorderQuantity,
                })
              }
              text={
                !addedToFavorites ? "Add to Favorite" : "Remove from Favorite"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
