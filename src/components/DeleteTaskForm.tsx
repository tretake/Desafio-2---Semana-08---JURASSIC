import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTasks, deleteTask } from "../redux/thunks/tasksThunks"; 
import { RootState } from "../redux/store"; 
import { fetchUsers, deleteUser } from "../redux/thunks/usersThunks";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const dados = useSelector((state: RootState) => state.tasks.value); 
  const tasks  = dados?.tasks || []; 

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch ]);

  const handleDelete = async (taskId: string) => {
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks()); 
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id}>
              {task.title}{" "}
              {task.description}{" "}
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
