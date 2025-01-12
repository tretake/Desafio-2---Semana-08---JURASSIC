import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from '../redux/pageSlice';
import { RootState } from "../redux/store"; 
import { fetchUsers, deleteUser } from "../redux/thunks/usersThunks";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const dados = useSelector((state: RootState) => state.tasks.value); 
  const users  = dados?.users || []; 

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setPage('delete'));     
  }, [dispatch ]);

  const handleDelete = async (taskId: string) => {
    await dispatch(deleteUser(taskId));
    dispatch(fetchUsers()); 
    window.location.reload();
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.firstName}{" "}
              {user.lastName}{" "}
              <button className='bg-red-600' onClick={() => handleDelete(user.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
};

export default UserList;
