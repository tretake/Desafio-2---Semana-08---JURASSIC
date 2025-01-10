import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


import KanbanCard from '../components/KanbanCard';
import KanbanCol from '../components/KanbanCol';



const Kanban = () => {

  const dispatch = useDispatch();


  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };
  /*
    useEffect(() => {
      dispatch(setPage('kanban'));
    }, [dispatch]);
  */

    const doneColor = 'green';
    const progressColor = 'orange';
    const toDoColor = 'purple';

  return (
    <div className='  flex relative m-10    justify-center items-center gap-10 ' 
    >

      {/* acho q o segredo ta no scale-[x]  e fazer o background tamanho fixo e só o x e y dos arquivos q muda */}
      
      <img className='absolute w-full  z-[-99]' src="./images/Kanban_background.png" alt="" />
      
      <button  onClick={ toggleActive}   className='bg-[#6C7D96] flex justify-center items-center rounded-full absolute top-[0px] right-0  z-50 size-9 md:size-11 lg:size- text-center '  > <svg xmlns="http://www.w3.org/2000/svg"  width="12" height="20" viewBox="0 0 12 20" fill="none">
<path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10Z" fill="white"/>
</svg></button>

      

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

      <div className={`absolute font-bold bg-[#6C7D96] z-40  ${ (isActive) ? 'hidden' :'' } 
        top-[-18px] right-0 px-[18px] py-[23.26px] w-[247.59px] rounded-[25px]
          md:w-[298px]  md:px-[21px] md:py-[28px]
          `} >
  
        <div>
          <h1 className='text-base text-white font-bold pb-[10px]' >In this project</h1>
          <ul  className='flex flex-col gap-[8.31px]'>
            <li className='flex bg-[#F6F6F6E5] items-center
            px-[7.48px]   gap-[8.52px] h-[45.7px] rounded-[12.46px]
            md:h-[55px]
            ' >
              <img className='size-[36.56px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div >
                <h1 className='text-sm md:text-base'>John Doe</h1>
                <h2 className='text-xs md:text-[13px] text-[#160A60]' >Project Manager</h2>
              </div>
            </li>
            <li className='flex bg-[#F6F6F6E5] items-center
            px-[7.48px]   gap-[8.52px] h-[45.7px] rounded-[12.46px]
            md:h-[55px]
            ' ><img className='size-[36.56px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div >
                <h1 className='text-sm md:text-base'>John Doe</h1>
                <h2 className='text-xs md:text-[13px] text-[#160A60]' >Project Manager</h2>
              </div>
            </li>
            <li className='flex bg-[#F6F6F6E5] items-center
            px-[7.48px]   gap-[8.52px] h-[45.7px] rounded-[12.46px]
            md:h-[55px]
            ' ><img className='size-[36.56px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div >
                <h1 className='text-sm md:text-base'>John Doe</h1>
                <h2 className='text-xs md:text-[13px] text-[#160A60]' >Project Manager</h2>
              </div>
            </li>
          </ul>
          <p className='text-xs text-right text-[#C7C3FF]' >View all (10)</p>
        </div>
        <div className='' >
          <h1 className='text-base md:text-xl text-white' >Metrics</h1>
          <div className='flex gap-2 flex-wrap  flex-col justify-start h-[180px]' >
            <div className='w-[122px] md:w-[135px] h-[95px]  py-[3px]  text-xs text-[#160A60] px-2 rounded-[12.45px] bg-[#F6F6F6E5]' >
              <h1 className='text-[#160A60] ' >Total tasks</h1>
              <div className='flex items-center h-[21px] gap-[2.49px]' ><h1 className='text-xl md:text-2xl text-[#4F46E5]' >10</h1> <p>To do</p></div>
              <div className='flex items-center h-[21px] gap-[2.49px]' ><h1 className='text-xl md:text-2xl text-[#F59E0B]' >15</h1> <p>In progress</p></div>
              <div className='flex items-center h-[21px] gap-[2.49px]'><h1 className='text-xl md:text-2xl text-[#22C55E]' >12</h1> <p >Done</p></div>
            </div>
            <div className='w-[122px] md:w-[135px] h-[63px] pt-[4px] rounded-[12.45px] bg-[#F6F6F6E5]' >
              <h1 className=' text-center  text-xs text-[#160A60]' >Total time estimated</h1>
              <h1 className=' text-center  text-[26.59px] text-[#4F46E5]' >00:00</h1>
            </div>
            <div  className='w-[90.56px] md:w-[109px] h-[166px] p-1 rounded-[12.45px] bg-[#F6F6F6E5] ' >
              <div>
                <h1 className='text-[#160A60] text-[10px] '>Most active</h1>
                <h1 className='text-[#4F46E5] text-[10px] ' >last 30 days</h1>
              </div>
            <ul className='flex flex-col gap-1'>
            <li className='flex justify-center py-[5px] items-center rounded-[10px] bg-white'>
              <img className='size-[26.84px] md:size-[32px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div>
                <h1 className=' text-[10px] md:text-[12px]'>John Doe</h1>
                <h2 className=' text-[4px] md:text-[5px]' >Project Manager</h2>
              </div>
            </li>
            <li className='flex justify-center py-[5px] items-center rounded-[10px] bg-white'>
              <img className='size-[26.84px] md:size-[32px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div>
                <h1 className=' text-[10px] md:text-[12px]'>John Doe</h1>
                <h2 className=' text-[4px] md:text-[5px]' >Project Manager</h2>
              </div>
            </li>
            <li className='flex justify-center py-[5px] items-center rounded-[10px] bg-white'>
              <img className='size-[26.84px] md:size-[32px] rounded-full ' src="./images/profile_picture.jpg" alt="" />
              <div>
                <h1 className=' text-[10px] md:text-[12px]'>John Doe</h1>
                <h2 className=' text-[4px] md:text-[5px]' >Project Manager</h2>
              </div>
            </li>
          </ul>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Kanban
