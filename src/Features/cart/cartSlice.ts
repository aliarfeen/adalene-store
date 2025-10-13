import  { createSlice } from '@reduxjs/toolkit';
import  type {  PayloadAction } from '@reduxjs/toolkit';
import type {CartItem}  from '../../Types/Cart';


const initialState: { items: CartItem[] } = { items: JSON.parse(localStorage.getItem('cart') || '[]') };
const save = (items: CartItem[]) => localStorage.setItem('cart', JSON.stringify(items));


const slice = createSlice({
name: 'cart',
initialState,
reducers: {
addItem(state, action: PayloadAction<CartItem>) {
const found = state.items.find((i) => i.id === action.payload.id);
if (found) found.quantity += action.payload.quantity; else state.items.push(action.payload);
save(state.items);
},
removeItem(state, action: PayloadAction<string>) {
state.items = state.items.filter((i) => i.id !== action.payload);
save(state.items);
},
setQty(state, action: PayloadAction<{ id: string; qty: number }>) {
const it = state.items.find((i) => i.id === action.payload.id);
if (it) it.quantity = Math.max(1, action.payload.qty);
save(state.items);
},
clearCart(state) { state.items = []; save(state.items); },
},
});


export const { addItem, removeItem, setQty, clearCart } = slice.actions;
export default slice.reducer;
















// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { CartItem } from "../../Types/Cart";

// // ✅ Fake data to use if cart is empty
// const fakeData: CartItem[] = [
//   {
//     id: "1",
//     name: "Wireless Headphones",
//     category: "Electronics",
//     img: "https://via.placeholder.com/150",
//     price: 120,
//     qty: 1,
//   },
//   {
//     id: "2",
//     name: "Sneakers Shoes",
//     category: "Fashion",
//     img: "https://via.placeholder.com/150",
//     price: 80,
//     qty: 2,
//   },
//   {
//     id: "3",
//     name: "hdsaf",
//     category: "Electronics",
//     img: "https://via.placeholder.com/150",
//     price: 120,
//     qty: 1,
//   },
//   {
//     id: "4",
//     name: "dghyyt",
//     category: "Fashion",
//     img: "https://via.placeholder.com/150",
//     price: 80,
//     qty: 2,
//   },
//   {
//     id: "5",
//     name: "ghrhyt",
//     category: "Electronics",
//     img: "https://via.placeholder.com/150",
//     price: 120,
//     qty: 1,
//   },
//   {
//     id: "6",
//     name: "Sneakers Shoes",
//     category: "Fashion",
//     img: "https://via.placeholder.com/150",
//     price: 80,
//     qty: 2,
//   },
// ];

// // ✅ Load existing cart or fakeData if empty
// const loadCart = (): CartItem[] => {
//   const stored = localStorage.getItem("cart");
//   if (stored && stored !== "[]") {
//     try {
//       return JSON.parse(stored);
//     } catch {
//       return fakeData;
//     }
//   }
//   // ✅ Store fake data for testing
//   localStorage.setItem("cart", JSON.stringify(fakeData));
//   return fakeData;
// };

// // ✅ Initial State
// const initialState: { items: CartItem[] } = { items: loadCart() };

// // ✅ Save function
// const save = (items: CartItem[]) =>
//   localStorage.setItem("cart", JSON.stringify(items));

// // ✅ Redux Slice
// const slice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItem(state, action: PayloadAction<CartItem>) {
//       const found = state.items.find((i) => i.id === action.payload.id);
//       if (found) found.qty += action.payload.qty;
//       else state.items.push(action.payload);
//       save(state.items);
//     },
//     removeItem(state, action: PayloadAction<string>) {
//       state.items = state.items.filter((i) => i.id !== action.payload);
//       save(state.items);
//     },
//     setQty(state, action: PayloadAction<{ id: string; qty: number }>) {
//       const it = state.items.find((i) => i.id === action.payload.id);
//       if (it) it.qty = Math.max(1, action.payload.qty);
//       save(state.items);
//     },
//     clearCart(state) {
//       state.items = [];
//       save(state.items);
//     },
//   },
// });

// export const { addItem, removeItem, setQty, clearCart } = slice.actions;
// export default slice.reducer;
