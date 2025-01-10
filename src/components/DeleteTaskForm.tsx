import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTasks, deleteTask } from "../redux/thunks/tasksThunks"; // Atualize o caminho conforme sua estrutura
import { RootState } from "../redux/store"; // Atualize conforme sua configuração de Redux
import { fetchUsers, deleteUser } from "../redux/thunks/usersThunks";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const dados = useSelector((state: RootState) => state.tasks.value); // Seleciona o estado de tarefas
  const tasks  = dados?.users || []; // Extrai a lista de tarefas
  console.log('amigo estou aqui',tasks);

  // Buscar as tarefas ao carregar o componente
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch ]);

  // Handler para deletar uma tarefa
  const handleDelete = async (taskId: string) => {
    await dispatch(deleteUser(taskId));
    dispatch(fetchUsers()); // Recarrega todas as tarefas após a exclusão
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id}>
              {task.firstName}{" "}
              {task.lastName}{" "}
              <button className='bg-red-600' onClick={() => handleDelete(task.id)}>Deletar</button>
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
