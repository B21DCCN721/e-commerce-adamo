import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../schemas/order";

type OrderSate = {
  items: Order[];
};

const initialState: OrderSate = {
  items: [],
};

export const orderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
