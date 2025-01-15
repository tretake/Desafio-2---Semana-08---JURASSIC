import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { AppDispatch } from "../redux/store";
import { fetchTasks , updateTask } from '../redux/thunks/tasksThunks';
import { Task } from '../interface/types';
import { useUser } from "@clerk/clerk-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import useAddUser from '../hooks/useAddUser';

import { useSession } from '@clerk/clerk-react';

import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';
import InThisProject from '../components/InThisProject';
import AppPopUp from '../components/AppPopUp';
import CreationModal from '../components/CreationModal';




interface DropabelZone {
  id: string;
  color: "purple" | "orange" | "green";
  title: string;
  percent: number;
  cards: number[]
}

const Kanban = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { isLoaded, isSignedIn, session } = useSession();
  const { user } = useUser();
  const dados = useSelector((state) => state.tasks.value);
  const { users, tasks } = dados || { users: [], tasks: [] };

  const [popUpVisible, setpopUpVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [startTouchDistance, setStartTouchDistance] = useState(0); 
  const [zones, setZones] = useState<DropabelZone[]>([]);
  
  const tasksTodo: Task[] = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === "todo")
    : [];
  const tasksInProgress: Task[] = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === "inprogress")
    : [];
  const tasksDone: Task[] = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === "done")
    : [];



  useAddUser(user);

  useEffect(() => {
    dispatch(setPage("kanban"));
  }, [dispatch ]);

  

  useEffect(() => {
    setZones(
      [
        { id: 'todo', color: 'purple', title: 'Todo', percent: 10, cards: tasksTodo.map((t) => t.id) },
        { id: 'inprogress', color: 'orange', title: 'In Progress', percent: 60, cards: tasksInProgress.map((t) => t.id) },
        { id: 'done', color: 'green', title: 'Done', percent: 100, cards: tasksDone.map((t) => t.id) },
      ]
  );
  }, [tasks]);

  const toggleActive = () => setIsActive((prev) => !prev);
  const closePopUp = () => setpopUpVisible(false);
  
  /*************************** Drag background logic ********************************/
  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {
      setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
    } else {
      setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
    }
  };

  const normalizeEvent = (event: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
    return { x: clientX, y: clientY };
  };

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    document.body.style.cursor = 'grabbing';
    const { x, y } = normalizeEvent(event);
    setIsDragging(true);
    setStartCoords({ x, y });

    if ("touches" in event && event.touches.length === 2) {
      const touch1 = event.touches[0] as Touch; 
      const touch2 = event.touches[1] as Touch; 
      const touchDistance = calculateDistance(touch1, touch2);
      setStartTouchDistance(touchDistance);
    }
    
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging) return;
    
    const { x, y } = normalizeEvent(event);
    setTranslate((prev) => ({
      x: prev.x + (x - startCoords.x) / zoom,
      y: prev.y + (y - startCoords.y) / zoom,
    }));
    setStartCoords({ x, y });
    
    if ("touches" in event && event.touches.length === 2) {
      const touch1 = event.touches[0] as Touch; 
      const touch2 = event.touches[1] as Touch; 
      const touchDistance = calculateDistance(touch1, touch2);
      const zoomFactor = touchDistance / startTouchDistance;
      setZoom((prevZoom) => Math.max(0.1, Math.min(prevZoom * zoomFactor, 3)));
    }

  };

  const handleEnd = (): void => {
    document.body.style.cursor = "default";
    setIsDragging(false);
  };

  const calculateDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /*************************** Drag background logic ********************************/

 
  /******************************* Drag Card logic ************************************* */
  const onDragEnd = async (result:DropResult) => {
    const { source, destination, draggableId } = result;
  
    // dropped outside a zone , or dropped in the same zone
    if (!destination || source.droppableId === destination.droppableId) return;

    try {
      const taskId = parseInt(draggableId);
      const taskMoved = tasks.find((task: Task) => task.id === taskId);
      if (!taskMoved) throw new Error(`Task with ID ${draggableId} not found.`);

      const updatedTask = { ...taskMoved, status: destination.droppableId };
      
      // update task request 
       await dispatch(updateTask(updatedTask));  
      dispatch(fetchTasks());
  
      console.log(`Task ${draggableId} successfully moved to ${destination.droppableId}.`);
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };
   /*******************************Drag Card logic************************************* */


  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='flex justify-between relative  h-[calc(100vh-358px)]  md:h-[calc(100vh-262px)]  lg:h-[calc(100vh-274px)] items-center  m-5 gap-9  '>
    <div className=' grow h-full relative  overflow-hidden   rounded-3xl '

      onWheel={handleWheel}

      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >

    <div className="absolute inset-0 bg-center bg-contain bg-repeat opacity-50 z-[-1]" style={{ backgroundImage: "url('./images/Kanban_background.jpg')" }} />
      <div className={` h-full absolute left-96 flex justify-center items-center   gap-5 `}
        style={{
          transform: `scale(${zoom})  translateX(${translate.x}px) translateY(${translate.y}px)`,
          transition: isDragging ? "none" : "transform 0.2s",
        }}
      >

      <div style={{ display: "flex", gap: "16px" }}>
        {zones.map((zone) => (
          <KanbanCol
            key={zone.id}
            color={zone.color } 
            label={zone.title}
            number={zone.cards.length}
            openModal={setIsModalOpen}
          >
            <Droppable key={zone.id} droppableId={zone.id}>
              {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  position: 'relative'
                }}
                >
                  {zone.cards.map((cardId:number, index:number) => {

                    const task =
                      tasksTodo.find((t) => t.id === cardId) ||
                      tasksInProgress.find((t) => t.id === cardId) ||
                      tasksDone.find((t) => t.id === cardId);

                      if (!task) {
                        console.error(`Task with ID ${cardId} not found.`);
                        return null; 
                      }

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
                            style={{
                              ...provided.draggableProps.style,
                              
                              marginBottom: "8px", 
                              top: 'auto',
                              left: 'auto',
                              
                            }}

                            onWheel={event=>event.stopPropagation()}
                            onMouseDown={event=>event.stopPropagation()}
                            onTouchStart={event=>event.stopPropagation()}
                          >
                            <KanbanCard
                              key={task.id}
                              priority={task.priority}
                              label={task.title}
                              color={zone.color} 
                              id={task.id}
                              percent={zone.percent} 
                              image={task.photo}
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
    
      </div>

        {popUpVisible && <AppPopUp handleAppPopUp={closePopUp} />}
      </div>

      <button
        onClick={toggleActive}
        className="bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
        >
          <path
            d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z"
            fill="white"
          />
        </svg>
      </button>
      <InThisProject isActive={isActive} />
    </div>
    <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DragDropContext>
  )
}

export default Kanban
