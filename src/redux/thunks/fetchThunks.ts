import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setDados } from "../tasksSlice"; 

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json"); // Altere a URL se necessário
    // const response = await axios.get("http://localhost:3000/tasks"); // Altere a URL se necessário
    thunkAPI.dispatch(setDados(response.data)); // Salva os dados no estado Redux
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});

