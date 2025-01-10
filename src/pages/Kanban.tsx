import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';
import InThisProject from '../components/InThisProject';



const Kanban = () => {

  const dispatch = useDispatch();


  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };
  
    useEffect(() => {
      dispatch(setPage('kanban'));
    }, [dispatch]);
  

    const doneColor = 'green';
    const progressColor = 'orange';
    const toDoColor = 'purple';

  return (
    <div className='  flex relative m-10    justify-center items-center gap-10 ' 
    >

      {/* acho q o segredo ta no scale-[x] e fazer o background tamanho fixo e só o x e y dos arquivos q muda */}
      
      <img className='absolute w-full  z-[-99]' src="./images/Kanban_background.png" alt="" />
      
      <button  onClick={toggleActive}   className='bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center '  > <svg xmlns="http://www.w3.org/2000/svg"  width="12" height="20" viewBox="0 0 12 20" fill="none">
      <path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z" fill="white"/>
      </svg>
      </button>

      

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

      <InThisProject isActive={isActive} />   


    </div>
  )
}

export default Kanban
