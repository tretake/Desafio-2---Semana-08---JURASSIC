import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDados, postUser } from "../usersSlice";
import { User } from "../../interface/types";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    thunkAPI.dispatch(getDados(response.data.users));
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});

export const postNewUser = createAsyncThunk("users/addNewUser", async (newUser: User, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    const updatedUsers = [...response.data.users, newUser];

    const updatedData = {
      tasks: response.data.tasks,
      users: updatedUsers,
    };

    await axios.put("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json", updatedData);
    console.log("Dados atualizados com sucesso!");

    thunkAPI.dispatch(getDados(updatedUsers));
    thunkAPI.dispatch(postUser(newUser));
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId: number, thunkAPI) => {
    try {
        const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
        const updatedUsers = response.data.users.filter((user: User) => user.id !== userId);
    
        const updatedData = {
        tasks: response.data.tasks,
        users: updatedUsers,
        };
    
        await axios.put("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json", updatedData);
        console.log("Usuário deletado com sucesso!");
    
        thunkAPI.dispatch(getDados(updatedUsers));
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
    }

});