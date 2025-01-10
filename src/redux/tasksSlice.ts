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
        getDados: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },

        postTask: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload); // Adiciona a nova tarefa no estado
        },
        deleteTask: (state, action: PayloadAction<any[]>) => {
            state.value = state.value.filter((task) => task.id !== action.payload); // Remove a tarefa com o ID especificado
        }
        
    },
});

export const { getDados, postTask, deleteTask  } = tasksSlice.actions;
export default tasksSlice.reducer;