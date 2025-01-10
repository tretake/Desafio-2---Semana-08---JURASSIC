import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './pageSlice';
import tasksSlice from './tasksSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    page: pageSlice,
    tasks: tasksSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
