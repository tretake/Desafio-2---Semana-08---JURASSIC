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
    const doneColor = 'green';
    const progressColor = 'orange';
    const toDoColor = 'purple';

  return (
    <div className=' flex relative m-10 justify-center items-center gap-10  ' >

      <img className='absolute  w-full z-[-99] ' src="./images/Kanban_background.png" alt="" />
      
      
      <KanbanCol  color={toDoColor} label='To do' number={25}>
        <KanbanCard priority='Low' label='TASK' color={toDoColor}/>
        <KanbanCard priority='Mid' label='TASK' color={toDoColor}/>
        <KanbanCard priority='High' label='TASK' color={toDoColor}/>
      </KanbanCol>

      <KanbanCol  color='orange' label='In progress' number={8} >
        
      <KanbanCard priority='Low' label='TASK' color={progressColor}/>
        <KanbanCard priority='Mid' label='TASK' color={progressColor}/>
      </KanbanCol>

      <KanbanCol  color='green' label='Done' number={2}>

      <KanbanCard priority='Low' label='TASK' color={doneColor} image='./images/lens.jpg'/>
        <KanbanCard priority='Mid' label='TASK' color={doneColor}/>
      </KanbanCol>





    </div>
  )
}

export default Kanban
