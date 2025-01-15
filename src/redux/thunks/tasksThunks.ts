import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDados, postTask } from "../tasksSlice"; 
import { Task } from "../../interface/types";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json"); 
    thunkAPI.dispatch(getDados(response.data)); 
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});
export const postNewTask = createAsyncThunk("tasks/addNewTask", async (newTask: Task, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    const updatedTasks = [...response.data.tasks, newTask]; 

    const updatedData = {
      tasks: updatedTasks,
      users: response.data.users 
    };

    
    await axios.put("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json", updatedData);
    console.log("Dados atualizados com sucesso!");

    
    thunkAPI.dispatch(getDados(updatedTasks)); 
    thunkAPI.dispatch(postTask(newTask));

    thunkAPI.dispatch(fetchTasks()); 
    
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
});


export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId: number, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    const updatedTasks = response.data.tasks.filter((task: Task) => task.id !== taskId); 

    const updatedData = {
      tasks: updatedTasks,
      users: response.data.users, // Mantém os usuários sem alterações
    };


    await axios.put("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json", updatedData);
    console.log("Tarefa deletada com sucesso!");

    thunkAPI.dispatch(getDados(updatedTasks)); // Atualiza a lista no estado global

    
  } catch (error) {
     console.error("Erro ao adicionar tarefa:", error);

  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task, thunkAPI) => {
    try {
      
      const response = await axios.get(
        "https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json"
      );

      
      const updatedTasks = response.data.tasks.map((task: Task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );

      
      const updatedData = {
        tasks: updatedTasks,
        users: response.data.users, 
      };
     
      await axios.put(
        "https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json",
        updatedData
      );
      console.log(`Task ${updatedTask.id} updated successfully!`);

     
      thunkAPI.dispatch(getDados(updatedTasks)); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
);
