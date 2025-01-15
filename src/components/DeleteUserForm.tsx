import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from '../redux/pageSlice';
import { RootState } from "../redux/store"; 
import { fetchUsers, deleteUser } from "../redux/thunks/usersThunks";
import { Link } from "react-router-dom";

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
    <div className="bg-gray-400">
      

      <Link className="text-[#5570F1] underline" to='/kanban'> Back</Link>

      {users.length > 0 ? (
        <ul  className=" flex items-start  flex-col gap-5 px-14 md:px-48 py-20  "   >
        

        <h1 className="text-2xl   font-bold " >Lista de Usuarios</h1>


          {users.map((user: any) => (
            <li key={user.id} >

              <div className='flex   flex-col lg:flex-row gap-5 px-10  py-7 bg-white rounded-3xl  ' >
                  <img className='w-28 md:size-[174px] rounded-[14.47px] shadow-md ' 
                  src={
                    user.hasImage
                    ? user.photo
                    : "./src/assets/profile_picture.jpg"
                      } alt="profile image" />
                  <div className='ml-2 flex flex-col justify-center '>
                    <h1 className='  text-3xl font-bold' >{` ${user.firstName} ${user.lastName}`} </h1>
                    <p className=' opacity-70 text-xs md:text-xl' >{user.email}</p>
                    <p className=' opacity-70 ' >{user.role}</p>
                    <button className='bg-red-600 py-2 rounded-2xl w-52 text-white font-bold' onClick={() => handleDelete(user.id)}>Deletar</button>
                  </div>
                  
              </div>

              
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
