
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { removeItem, setQty, clearCart } from "../../Features/cart/cartSlice";
import type { RootState } from "../../App/store";
import { Button } from "../../Components/Common/Button";

const Cart: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { items } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = useMemo(
    () => items?.reduce((acc: number, item: any) => acc + item.price * item.qty, 0) ?? 0,
    [items]
  );

  const total = Math.max(0, subtotal - discount);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <ToastContainer theme="colored" />
        <h1 className="text-2xl font-semibold text-[#b85c38] mb-3">👜 Your cart is empty</h1>
        <p className="text-gray-500">Add some products to see them here.</p>
      </div>
    );
  }

  const handleIncrease = (id: string) => {
    const item = items.find((i: any) => i.id === id);
    if (!item) return;
    if (item.qty >= 10) {
      toast.error("Maximum quantity is 10");
      return;
    }
    dispatch(setQty({ id, qty: item.qty + 1 }));
  };

  const handleDecrease = (id: string) => {
    const item = items.find((i: any) => i.id === id);
    if (!item) return;
    if (item.qty <= 1) {
      toast.error("Minimum quantity is 1");
      return;
    }
    dispatch(setQty({ id, qty: item.qty - 1 }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
    toast.info("Item removed from cart");
  };

  const handleClear = () => {
    dispatch(clearCart());
    setPromoApplied(false);
    setPromoCode("");
    setDiscount(0);
    toast.warn("Cart cleared");
  };

  const applyPromoCode = () => {
    const validCodes = ["dr.nasr", "engnourhan"];
    if (promoApplied) {
      toast.info("Promo code already applied");
      return;
    }
    if (validCodes.includes(promoCode.trim().toLowerCase())) {
      setDiscount(subtotal);
      setPromoApplied(true);
      toast.success("✅ Promo code applied! 100% discount");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid promo code");
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-10 bg-white font-serif">
      <ToastContainer theme="colored" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-semibold">Shopping Cart</h2>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded shadow-sm border hover:opacity-90"
            aria-label="Clear cart"
          >
            <FiTrash2 /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - products list */}
          <div className="lg:col-span-2">
            <div
              className={`space-y-6 custom-scroll ${
                items.length > 4 ? "max-h-[500px] overflow-y-auto pr-2" : ""
              }`}
            >
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-6"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      {item.category && (
                        <p className="text-sm text-gray-500">{item.category}</p>
                      )}
                      <p className="text-[#b85c38] mt-2 font-semibold">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="border rounded px-3 py-1 flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus />
                    </button>

                    <div className="w-10 text-center">{item.qty}</div>

                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="border rounded px-3 py-1 flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <FiPlus />
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-3 p-2 rounded text-[#b85c38] hover:bg-[#fff1ea]"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mt-8">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Enter a promo code
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="w-50 px-2 py-1.5 text-sm rounded-lg border border-gray-300 shadow-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f0d7cc] focus:border-[#f0d7cc] disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={promoApplied}
                />
                <Button
                  onClick={applyPromoCode}
                  className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                    promoApplied
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-[#f3e1d6] text-[#b85c38] hover:bg-[#e9c2b0]"
                  }`}
                  text={promoApplied ? "Applied" : "Apply"}
                />
              </div>

              {promoApplied && (
                <p className="mt-3 text-sm text-green-700">
                  Promo <span className="font-medium">{promoCode}</span> applied — 100% discount
                </p>
              )}
            </div>
          </div>

         {/* RIGHT - order summary */}
          <aside className="border rounded-xl p-6 shadow-sm bg-white">
             <h4 className="text-2xl font-semibold mb-4">Order Summary</h4> 
             <div className="flex justify-between mb-2"> 
              <span className="text-gray-600">Subtotal</span> 
              <span className="font-medium text-gray-600">${subtotal.toFixed(2)}</span> 
              </div>
               {discount > 0 && ( <div className="flex justify-between mb-2 text-orange-800"> 
                <span>Discount</span> 
                <span>- ${discount.toFixed(2)}</span> 
                </div>
               )} <hr className="my-4" />
                <div className="flex justify-between text-lg font-semibold mb-6"> 
                  <span>Total</span> <span>${total.toFixed(2)}</span> </div>
                   {/* ✅ Checkout Button */}
                    <Button className="w-full py-3 " onClick={handleCheckout} text="Checkout" /> 
         </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
