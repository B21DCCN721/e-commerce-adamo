import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storage from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root", // Khóa lưu trữ trong localStorage ['persist:root']
  version: 1,
  storage,   
  whitelist: ["cart", "order"],
};
// Tạo persistedReducer từ rootReducer và persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Tạo store với persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // bỏ qua warning cho các action liên quan đến persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Type dùng cho toàn app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
