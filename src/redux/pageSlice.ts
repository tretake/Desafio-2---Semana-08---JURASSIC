import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  currentPage: 'home' | 'login' | 'kanban' | 'settings';
}

const initialState: PageState = {
  currentPage: 'home', // Página inicial padrão
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
