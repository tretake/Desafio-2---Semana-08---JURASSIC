import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewTask } from "../redux/thunks/tasksThunks"; // Caminho para o arquivo onde está o slice

const NewTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Novo objeto de tarefa
    const newTask = {
      id: Date.now(), // Aqui você pode gerar um ID único de alguma forma
      title: taskTitle,
      priority: taskPriority,
      members: ["User"], // Ou outros dados conforme seu contexto
      commentsCount: 0,
      completedTasksCount: 0,
      progress: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      estimatedTime: "1 dia",
      createdBy: "user123",
    };

    // Despacha o thunk para adicionar a nova tarefa
    dispatch(postNewTask(newTask));

    // Limpa os campos
    setTaskTitle("");
    setTaskPriority("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prioridade"
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default NewTaskForm;
