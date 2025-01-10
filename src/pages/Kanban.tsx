import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { AppDispatch } from "../redux/store";
import { fetchTasks } from '../redux/thunks/tasksThunks';
import { Task } from '../interface/types';

import { useSession, SignIn } from '@clerk/clerk-react';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';
import InThisProject from '../components/InThisProject';



const Kanban = () => {

  const [isActive, setIsActive] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const { isLoaded, isSignedIn, session } = useSession();

  // console.log(isLoaded, isSignedIn, session);

  const dispatch = useDispatch<AppDispatch>();
  const dados = useSelector((state) => state.tasks.value);
  const { users, tasks } = dados || { users: [], tasks: [] };
  const tasksTodo: Task[] = Array.isArray(tasks)
  ? tasks.filter((task) => task.status === 'todo')
  : [];
const tasksInProgress: Task[] = Array.isArray(tasks)
  ? tasks.filter((task) => task.status === 'inprogress')
  : [];
const tasksDone: Task[] = Array.isArray(tasks)
  ? tasks.filter((task) => task.status === 'done')
  : [];
  console.log('taks todo', tasksTodo);

  useEffect(() => {
    dispatch(setPage('kanban'));
  }, [dispatch]);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  const doneColor = 'green';
  const progressColor = 'orange';
  const toDoColor = 'purple';

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {

      setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
    } else {
      setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
    }
  };



  const handleStart = (
    event: React.MouseEvent | React.TouchEvent
  ): void => {
    const { clientX, clientY } = normalizeEvent(event);
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleMove = (
    event: React.MouseEvent | React.TouchEvent
  ): void => {
    if (isDragging) {
      const { clientX, clientY } = normalizeEvent(event);

      const deltaX = clientX - startX;
      setTranslateX((prev) => prev + deltaX);
      setStartX(clientX);

      const deltaY = clientY - startY;
      setTranslateY((prev) => prev + deltaY);
      setStartY(clientY);
    }
  };

  const handleEnd = (): void => {
    setIsDragging(false);
  };

  const normalizeEvent = (
    event: React.MouseEvent | React.TouchEvent
  ): { clientX: number; clientY: number } => {
    if ("touches" in event) {
      return {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      };
    } else {
      return {
        clientX: event.clientX,
        clientY: event.clientY,
      };
    }
  };



  return (
    <div className='  relative  m-5   h-[calc(100vh-270px)]  overflow-hidden'

      onWheel={handleWheel}



      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}

      style={{
        backgroundImage: "url(" + "./images/Kanban_background.png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat'
      }}
    >


      <button onClick={toggleActive} className='bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center '  >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z" fill="white" />
        </svg>
      </button>


      <div className={`flex h-full absolute left-96  justify-center items-center  gap-5 `}
        style={{
          transform: `scale(${zoom})  translateX(${translateX}px) translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.2s",
        }}
      >
        <KanbanCol color={toDoColor} label="To do" number={tasksTodo.length} >
          {tasksTodo.map((task) => (
            <KanbanCard
              key={task.id}
              priority={task.priority}
              label={task.title}
              color={toDoColor}
              id={task.id} 
              percent={10} 
            />
          ))}
        </KanbanCol>

        <KanbanCol color='orange' label='In progress' number={tasksInProgress.length} >
          {tasksInProgress.map((task) => (
            <KanbanCard 
              key={task.id}
              priority={task.priority}
              label={task.title}
              color={progressColor}
              id={task.id} 
              percent={60}
            />))}
     
        </KanbanCol>

        <KanbanCol color='green' label='Done' number={tasksDone.length + 1}>

          <KanbanCard priority='Low' label='TASK' color={doneColor} image='./images/lens.jpg' percent={99} />
          {tasksDone.map((task) => (
            <KanbanCard 
            key={task.id}
            priority={task.priority}
            label={task.title}
            color={progressColor}
            id={task.id} 
            percent={100}
            />
          ))}
        </KanbanCol>

      </div>

      <div className='w-full lg:hidden absolute bottom-[13px] rounded-full h-[119px] bg-black opacity-50 flex flex-row' >a</div>
      <InThisProject isActive={isActive} />
    </div>

  )
}

export default Kanban
