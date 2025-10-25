import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../App/store";
import { toast } from "react-toastify";
import type { ShippingData } from "../../Types/Cart";
import { Button } from "../../Components/Common/Button";
import apiFactory from "../../Api/apiFactory";
import { clearCart } from "../../Features/products/productSlice";
import type { Order, Product } from "../../Types";



//const user = localStorage.getItem('user')
// Validation Schema
const schema: yup.ObjectSchema<ShippingData> = yup.object({
  id: yup.string().optional(),
  resource: yup.string().optional(),
  fullName: yup.string().required("Full name is required").min(3),
  email: yup.string().required("Email is required").email("Invalid email address"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{11}$/, "Invalid phone number"),
  address: yup.string().required("Address is required").min(5),
  city: yup.string().required("City is required"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .matches(/^[0-9]{5,7}$/, "Invalid postal code"),
  note: yup.string().optional(),
});

const CheckoutPage: React.FC = () => {
  const items = useSelector((s: RootState) => s.product.items);
  const total = items.reduce((s, i) => s + i.price * i.orderQuantity, 0);
  const currentUser =JSON.parse(localStorage.getItem("loggedUser") || "null");
  const userId = currentUser.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });


    // const handleQty = function(array:Product[]){
    //   array.forEach(item => {
    //     apiFactory.
    //     item.orderQuantity = 1;
    //   });
    // }
  const onSubmit: SubmitHandler<ShippingData> = (data) => {
  const orderData = {
    id: Date.now().toString(),  
    userId: userId,
    userinfo: data, 
    items, 
    total,
    paymentMethod,
    status: "pending",
    date: new Date().toLocaleString(),
    resource: 'Order'
    
    
  };
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  existingOrders.push(orderData);
  apiFactory.sendOrders(orderData as Order)
  orderData.items.forEach((product: Product)=>{
    apiFactory.updateProduct({...product , quantity: product.quantity - product.orderQuantity});
  })
  localStorage.setItem("orders", JSON.stringify(existingOrders));
  toast.success("Order placed successfully!");
  dispatch(clearCart());
  reset();
  setTimeout(() => {
    navigate("/ordersuccess");
  }, 1500);
};


  if (items.length === 0)
    return <div className="text-center py-20 text-gray-500">Your cart is empty</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-8 bg-gray-50 min-h-screen">
     
      {/* Shipping Form */}
      <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow">
        <h3 className="text-2xl  mb-6 text-gray-800">Checkout</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Shipping Info */}
          <div>
            <h4 className="text-lg  text-gray-700 mb-3">Shipping Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input
                  {...register("fullName")}
                  className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  {...register("phone")}
                  className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  {...register("postalCode")}
                  className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Address</label>
              <textarea
                {...register("address")}
                rows={3}
                className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">City</label>
              <input
                {...register("city")}
                className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Note (optional)</label>
              <textarea
                {...register("note")}
                rows={3}
                className="mt-1 block w-full border border-gray-300 p-3 rounded-lg text-sm"
              ></textarea>
            </div>
          </div>

          {/* Payment Method */}
          <div className="pt-6 border-t">
            <h4 className="text-lg  text-gray-700 mb-3">Payment Method</h4>
            <div className="flex flex-col gap-3">
              {["cash", "card", "paypal"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#f0d7cc]"
                  />
                  <span className="capitalize">
                    {method === "cash"
                      ? "Cash on Delivery"
                      : method === "card"
                      ? "Credit / Debit Card"
                      : "PayPal"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              className="w-full  py-3 rounded-lg  transition-all duration-200"
              text="Place Order"
            />
            
           
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4">
        <div className="bg-white p-6 rounded-2xl shadow sticky top-6">
          <h4 className="text-lg  mb-4">Order Summary</h4>

          {/* Product List with Images */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.orderQuantity}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  ${(item.price * item.orderQuantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/*Total */}
          <div className="border-t mt-4 pt-3 flex justify-between text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;