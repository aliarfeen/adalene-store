import { configureStore } from '@reduxjs/toolkit';
 import cartReducer from '../Features/cart/cartSlice';
 import productReducer from '../Features/products/productSlice';
 


export const store = configureStore({
reducer: { 
    cart: cartReducer,
    product: productReducer
},

});
store.subscribe(() => {
  const { product } = store.getState();
  localStorage.setItem("cart", JSON.stringify(product.items));
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;