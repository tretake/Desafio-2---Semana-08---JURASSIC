import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState  {
    value: any[];
}

const initialState: TasksState  = {
    value: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setDados: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },
    },
});

export const { setDados } = tasksSlice.actions;
export default tasksSlice.reducer;