import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';
import InThisProject from '../components/InThisProject';



const Kanban = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [zoom,setZoom] = useState<number>(1);

  
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0); 
  const [startX, setStartX] = useState(0); 

  const [translateY, setTranslateY] = useState(0); 
  const [startY, setStartY] = useState(0); 


  const dispatch = useDispatch();

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

    const handleMouseDown = (event: React.MouseEvent) => {
      setIsDragging(true); 
      setStartX(event.clientX);
      setStartY(event.clientY);
    };
  
    const handleMouseMove = (event: React.MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - startX;  
        setTranslateX((prev) => prev + deltaX);  
        setStartX(event.clientX);  

        const deltaY = event.clientY - startY;  
        setTranslateY((prev) => prev + deltaY);  
        setStartY(event.clientY);  
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false); 
    };

  return (
    <div className='  relative  m-10  sm:h-[calc(100vh-310px)]  overflow-hidden' 
   
    onWheel={handleWheel}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    onMouseDown={handleMouseDown}

    style={{
      backgroundImage: "url(" + "./images/Kanban_background.png" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'repeat'
    }}
    >
      
      
      <button  onClick={toggleActive}   className='bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center '  > 
        <svg xmlns="http://www.w3.org/2000/svg"  width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z" fill="white"/>
        </svg>
      </button>

      
        <div className={`flex h-full absolute left-96  justify-center items-center  gap-5 `} 
         style={{ 
          transform: `scale(${zoom})  translateX(${translateX}px) translateY(${translateY}px)` ,
          transition: isDragging ? "none" : "transform 0.2s",
        }}
        >
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


      <InThisProject isActive={isActive} /> 
    </div>
     
  )
}

export default Kanban
