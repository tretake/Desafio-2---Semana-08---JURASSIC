import { useState, useEffect ,useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { AppDispatch } from "../redux/store";
import { postNewTask,deleteTask,fetchTasks } from '../redux/thunks/tasksThunks';
import { Task } from '../interface/types';
import { useUser } from "@clerk/clerk-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAddUser from '../hooks/useAddUser';

import { useSession, SignIn } from '@clerk/clerk-react';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';
import InThisProject from '../components/InThisProject';
import AppPopUp from '../components/AppPopUp';
import CreationModal from '../components/CreationModal';



const Kanban = () => {
  const [popUpVisible, setpopUpVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  

const { user } = useUser();


useAddUser(user);




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
    document.body.style.cursor = "grabbing";
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
      setTranslateX((prev) => prev + (deltaX * (1/zoom) ));
      setStartX(clientX);

      const deltaY = clientY - startY ;
      setTranslateY((prev) => prev + (deltaY * (1/zoom) ));
      setStartY(clientY);
    }
  };

  const handleEnd = (): void => {
    document.body.style.cursor = "default";
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


  const closePopUp = () => {
    setpopUpVisible(false);
  }


  

  /*******************************Drag logic************************************* */
  
  const [zones, setZones] = useState({
    zone1: {
      id: "todo",
      color: 'purple',
      title: "Zone 1",
      cards: tasksTodo.map((obj) => obj.id),
    },
    zone2: {
      id: "inprogress",
      color: 'orange',
      title: "Zone 2",
      cards: tasksInProgress.map((obj) => obj.id),
    },
    zone3: {
      id: "done",
      color: 'green',
      title: "Zone 3",
      cards: tasksDone.map((obj) => obj.id),
    },
  });


  useEffect( () =>(setZones({
    zone1: {
      id: "todo",
      color: 'purple',
      title: "Zone 1",
      cards: tasksTodo.map((obj) => obj.id),
    },
    zone2: {
      id: "inprogress",
      color: 'orange',
      title: "Zone 2",
      cards: tasksInProgress.map((obj) => obj.id),
    },
    zone3: {
      id: "done",
      color: 'green',
      title: "Zone 3",
      cards: tasksDone.map((obj) => obj.id),
    },
  })) ,[tasks]   )

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
  
    // If dropped outside a zone, return
    if (!destination) return;
  
    // If dropped in the same zone, return
    if (source.droppableId === destination.droppableId) return;
  
    try {
      const taskId = parseInt(draggableId); // Convert to number if needed
  
      // Find and update the task
      const taskMoved = tasks.find((task) => task.id === taskId);
      if (!taskMoved) {
        console.error(`Task with ID ${draggableId} not found.`);
        return;
      }
  
      const updatedTask = { ...taskMoved, status: destination.droppableId };
  
      // Dispatch actions
      await dispatch(deleteTask(taskId)); // Remove task from original column
      await dispatch(postNewTask(updatedTask)); // Add task to destination column
  
      // Optionally fetch tasks to refresh state
      await dispatch(fetchTasks());
  
      console.log(`Task ${draggableId} successfully moved to ${destination.droppableId}.`);
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };
   /*******************************Drag logic************************************* */


  return (
    <div className='flex justify-between relative  h-[calc(100vh-358px)]  md:h-[calc(100vh-262px)]  lg:h-[calc(100vh-274px)] items-center  m-5 gap-9 '>
    <div className=' grow h-full relative  overflow-hidden   rounded-3xl '

      onWheel={handleWheel}

      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}

    >

        <div style={{ 
          backgroundImage: "url('./images/Kanban_background.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.5,
          zIndex: -1,
        }} />
       
      

      <div className={` h-full absolute left-96 flex justify-center items-center   gap-5 `}
        style={{
          transform: `scale(${zoom})  translateX(${translateX}px) translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.2s",
        }}
        
        onWheel={event=>event.stopPropagation()}
        onMouseDown={event=>event.stopPropagation()}
        onTouchStart={event=>event.stopPropagation()}
      >



      <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "16px" }}>
        {Object.values(zones).map((zone) => (
          
          
          
          <KanbanCol
            key={zone.id}
            color={zone.color } // Replace with a dynamic color if needed
            label={zone.title}
            number={zone.cards.length}
            openModal={setIsModalOpen}
          >
            

            <Droppable key={zone.id} droppableId={zone.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                 
                >
                  {zone.cards.map((cardId, index) => {

                    
                    
                    const task =
                      tasksTodo.find((t) => t.id === cardId) ||
                      tasksInProgress.find((t) => t.id === cardId) ||
                      tasksDone.find((t) => t.id === cardId);

                    return (
                      <Draggable
                        key={String(cardId)}
                        draggableId={String(cardId)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            
                          >
                           
                            <KanbanCard
                              key={task.id}
                              priority={task.priority}
                              label={task.title}
                              color={toDoColor} // Replace with a dynamic color if needed
                              id={task.id}
                              percent={10} // Replace with a dynamic value if needed
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </KanbanCol>
        ))}
      </div>
    </DragDropContext>


      </div>


      { popUpVisible && ( <AppPopUp handleAppPopUp={closePopUp} /> ) }

          
    </div>

    <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


    <button onClick={toggleActive} className='bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center '  >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z" fill="white" />
        </svg>
    </button>
    <InThisProject isActive={isActive} />
    </div>
  )
}

export default Kanban
