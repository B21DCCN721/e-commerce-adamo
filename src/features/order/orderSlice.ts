import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../../types/order";

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
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; status: OrderStatus }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    },
    changeIsPaid: (
      state,
      action: PayloadAction<{ id: number; isPaid: boolean }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.isPaid = action.payload.isPaid;
      }
    },
  },
});

export const { addOrder, changeStatus, changeIsPaid } = orderSlice.actions;
export default orderSlice.reducer;
