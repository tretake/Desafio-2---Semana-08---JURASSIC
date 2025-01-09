import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './pageSlice';
import tasksSlice from './tasksSlice';

export const store = configureStore({
  reducer: {
    page: pageSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
