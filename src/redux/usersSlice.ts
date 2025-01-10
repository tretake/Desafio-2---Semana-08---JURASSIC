import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interface/types"; 

interface UsersState  {
    value: User[];
}

const initialState: UsersState  = {
    value: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getDados: (state, action: PayloadAction<User[]>) => {
            state.value = action.payload;
        },
        postUser: (state, action: PayloadAction<User>) => {
            state.value.push(action.payload); 
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((user) => user.id !== action.payload); // Remove o usuário com o ID especificado
        }
        
    },
});

export const { getDados, postUser, deleteUser  } = usersSlice.actions;
export default usersSlice.reducer;