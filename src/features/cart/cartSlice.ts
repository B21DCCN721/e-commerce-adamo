import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";
import type { Size } from "../../types/size";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    reduceQuantityItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    increaseQuantityItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if(item){
        item.quantity+=1;
      }
    },
    changeQuantityItem: (state, action: PayloadAction<{id: number, quantity: number}>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if(item){
        item.quantity = action.payload.quantity;
      }
    },
    changeSizeItem: (state, action: PayloadAction<{id: number, size: Size}>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if(item){
        item.size = action.payload.size;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    selectItem: (
      state,
      action: PayloadAction<{
        id?: number;
        checked: boolean;
        selectAll: boolean;
      }>
    ) => {
      if (action.payload.selectAll) {
        state.items = state.items.map((item) => ({
          ...item,
          selected: action.payload.checked,
        }));
      } else {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) {
          item.selected = action.payload.checked;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  reduceQuantityItem,
  selectItem,
  changeQuantityItem,
  changeSizeItem,
  setCart
} = cartSlice.actions;
export default cartSlice.reducer;
