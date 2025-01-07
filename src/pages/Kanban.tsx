import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const Kanban = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setPage('kanban'));
  }, [dispatch]);


  return (
    <div>
      <h1> KANBANAAAA!1!!</h1>

    </div>
  )
}

export default Kanban
