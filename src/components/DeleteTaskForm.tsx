import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTasks, deleteTask } from "../redux/thunks/tasksThunks"; // Atualize o caminho conforme sua estrutura
import { RootState } from "../redux/store"; // Atualize conforme sua configuração de Redux

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const dados = useSelector((state: RootState) => state.tasks.value); // Seleciona o estado de tarefas
  const tasks  = dados?.tasks || []; // Extrai a lista de tarefas
  console.log('amigo estou aqui',tasks);

  // Buscar as tarefas ao carregar o componente
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch ]);

  // Handler para deletar uma tarefa
  const handleDelete = async (taskId: string) => {
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks()); // Recarrega todas as tarefas após a exclusão
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id}>
              {task.title}{" "}
              <button onClick={() => handleDelete(task.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
};

export default TaskList;
