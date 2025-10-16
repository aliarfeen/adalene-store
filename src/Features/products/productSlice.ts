import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../App/store";
import type { Product } from "../../Types";
import useLocalStorage from "../../hooks/useLocalStorage";

// --- Types ---

interface CartState {
  items: Product[];
  totalQuantity: number;
  totalPrice: number;
}

const save = (items: Product[]) => {
  console.log("Saving to localStorage:", items);
  localStorage.setItem("cart", JSON.stringify(items));

  console.log("After set:", localStorage.getItem("cart"));
};

const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

// --- Initial State ---
const initialState: CartState = {
  items: savedCart,
  totalQuantity: savedCart.length ,
  totalPrice: 0,
};

// --- Slice ---
const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) found.orderQuantity += action.payload.orderQuantity;
      else state.items.push(action.payload);

      // 👇 convert proxy to real object before saving
      save(current(state.items));
    },


    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      save(state.items);
    },
    setQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (it) it.orderQuantity = Math.max(1, action.payload.qty);
      save(current(state.items));
    },
    clearCart(state) {
      state.items = [];
      save(state.items);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.orderQuantity = newItem.orderQuantity;
      } else {
        state.items.push(newItem);
      state.totalQuantity += 1;

      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      // TODO: remove item by id
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalQuantity -= 1;
      state.totalPrice -= action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // clearCart: (state) => {
    //     localStorage.setItem("cart", JSON.stringify([]));
    //     state.items = [];
    //     state.totalQuantity = 0;
    //     state.totalPrice = 0;
    // },
    calculateTotals: (state) => {
      // TODO: recalculate totalQuantity and totalPrice
    },
    loadCartFromStorage: (state, action: PayloadAction<CartState>) => {
      // TODO: set state from localStorage data
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

// --- Exports ---
export const {
  addToCart,
  removeFromCart,
  clearCart,
  calculateTotals,
  loadCartFromStorage,
  addItem,
  removeItem,
  setQty,
} = productSlice.actions;

export default productSlice.reducer;
