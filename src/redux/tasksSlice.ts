import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interface/types"; 


interface TasksState  {
    value: Task[];
}

const initialState: TasksState  = {
    value: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        getDados: (state, action: PayloadAction<Task[]>) => {
            state.value = action.payload;
        },

        postTask: (state, action: PayloadAction<Task>) => {
            state.value.push(action.payload); 
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((task) => task.id !== action.payload); // Remove a tarefa com o ID especificado
        }
        
    },
});

export const { getDados, postTask, deleteTask  } = tasksSlice.actions;
export default tasksSlice.reducer;