import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});

// Type dùng cho toàn app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
