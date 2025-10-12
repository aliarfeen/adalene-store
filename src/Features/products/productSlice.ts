import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../App/store";
import type { Product } from "../../Types";
import useLocalStorage from "../../hooks/useLocalStorage";

// --- Types ---

interface CartState {
  items: Product[];
  totalQuantity: number;
  totalPrice: number;
}

const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

// --- Initial State ---
const initialState: CartState = {
  items: savedCart,
  totalQuantity: 0,
  totalPrice: 0,
};

// --- Slice ---
const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
  const existingItem = state.items.find(item => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity = newItem.quantity;
  } else {
    state.items.push(newItem); 
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
    
    clearCart: (state) => {
        localStorage.setItem("cart", JSON.stringify([]));
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    },
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
} = productSlice.actions;

export default productSlice.reducer;
