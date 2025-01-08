import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';



const Kanban = () => {

  const dispatch = useDispatch();

  /*
    useEffect(() => {
      dispatch(setPage('kanban'));
    }, [dispatch]);
  */

  return (
    <div className=' flex relative m-10 justify-center items-center gap-10' >

      <img className='absolute  w-full z-[-99] ' src="./images/Kanban_background.png" alt="" />
      <KanbanCol  color='purple' label='To do' number={25}>
        <h1>test</h1>
      </KanbanCol>

      <KanbanCol  color='orange' label='In progress' number={8} >

      </KanbanCol>

      <KanbanCol  color='green' label='Done' number={2}>

      </KanbanCol>





    </div>
  )
}

export default Kanban
