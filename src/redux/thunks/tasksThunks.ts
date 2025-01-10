import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDados, postTask } from "../tasksSlice"; 

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json"); 
    // const response = await axios.get("http://localhost:3000/tasks"); // Altere a URL se necessário
    thunkAPI.dispatch(getDados(response.data)); 
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});

export const postNewTask = createAsyncThunk("tasks/addNewTask", async (newTask: any, thunkAPI) => {
  try {
    // Obter as tarefas atuais
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    const updatedTasks = [...response.data.tasks, newTask]; // Adiciona a nova tarefa
    console.log('updatedTasks',updatedTasks);

    const updatedData = {
      tasks: updatedTasks,
      users: response.data.users // Mantém os usuários, sem alteração
    };

    // Enviar os dados atualizados de volta para o S3
    await axios.put("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json", updatedData);
    console.log("Dados atualizados com sucesso!");


    // Atualiza o estado do Redux com a nova lista de tarefas
    thunkAPI.dispatch(getDados(updatedTasks));
    thunkAPI.dispatch(postTask(newTask)); // Adiciona a nova tarefa no estado local do Redux
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId: string, thunkAPI) => {
  try {
    const response = await axios.get("https://mybucketsweetaurora.s3.us-east-1.amazonaws.com/db.json");
    const updatedTasks = response.data.tasks.filter((task: any) => task.id !== taskId); // Remove a tarefa com o ID especificado

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
