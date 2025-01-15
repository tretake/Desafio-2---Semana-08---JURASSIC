import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/thunks/usersThunks";
import { AppDispatch } from "../redux/store";
import { User } from "../interface/types";
import { Link } from "react-router-dom";


const InThisProject = ({ isActive }) => {
    const dispatch = useDispatch<AppDispatch>();
    const dados = useSelector((state) => state.tasks.value); 
    const users = dados?.users || [];  
    const tasks = dados?.tasks || [];  
    
    const totalDone = tasks.filter((task) => task.status === 'done').length;
    const totalIProgress = tasks.filter((task) => task.status === 'inprogress').length;
    const totalToDo = tasks.filter((task) => task.status === 'todo').length;

    console.log('dados centrais',dados);
    

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    return (
        <div className={` absolute lg:relative lg:self-start top-[-18px] right-0 px-[18px] font-bold bg-[#6C7D96] z-40  ${(isActive) ? 'hidden' : ''} 
         py-[23.26px] w-[247.59px] rounded-[25px]
          md:w-[298px]  md:px-[21px] md:py-[28px]
            lg:h-[538px] lg:w-[298px]
          `} >

            <div>
                <h1 className='text-base text-white font-bold pb-[10px]' >In this project</h1>
                <ul className='flex flex-col gap-[8.31px]'>        

                    {users.slice(0, 3).map((user: User) => (
                        <li
                            key={user.id}
                            className="flex bg-[#F6F6F6E5] items-center px-[7.48px] gap-[8.52px] h-[45.7px] rounded-[12.46px] md:h-[55px]"
                        >
                            
                            <img
                                className="size-[36.56px] rounded-full"
                                src="./images/profile_picture.jpg"
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <div>
                                <Link to='/profile'>
                                    <h1 className="text-sm md:text-base">{user.firstName} {user.lastName}</h1>
                                    <h2 className="text-xs md:text-[13px] text-[#160A60]">{user.role}</h2>
                                </Link>
                            </div>
                            
                        </li>
                    ))}


                </ul>
                <p className='text-xs text-right text-[#C7C3FF]' >
                    <Link to='/delete'>
                        View all {users.length} members
                    </Link>                     
                </p>
            </div>
            <div className='' >
                <h1 className='text-base md:text-xl text-white' >Metrics</h1>
                <div className='flex gap-2 flex-wrap  flex-col justify-start h-[180px]' >
                    <div className='w-[122px] md:w-[135px] h-[95px]  py-[3px]  text-xs text-[#160A60] px-2 rounded-[12.45px] bg-[#F6F6F6E5]' >
                        <h1 className='text-[#160A60] ' >Total tasks</h1>
                        <div className='flex items-center h-[21px] gap-[2.49px]' ><h1 className='text-xl md:text-2xl text-[#4F46E5]' >{totalToDo}</h1> <p>To do</p></div>
                        <div className='flex items-center h-[21px] gap-[2.49px]' ><h1 className='text-xl md:text-2xl text-[#F59E0B]' >{totalIProgress}</h1> <p>In progress</p></div>
                        <div className='flex items-center h-[21px] gap-[2.49px]'><h1 className='text-xl md:text-2xl text-[#22C55E]' >{totalDone }</h1> <p >Done</p></div>
                    </div>
                    <div className='w-[122px] md:w-[135px] h-[63px] pt-[4px] rounded-[12.45px] bg-[#F6F6F6E5]' >
                        <h1 className=' text-center  text-xs text-[#160A60]' >Total time estimated</h1>
                        <h1 className=' text-center  text-[26.59px] text-[#4F46E5]' >00:00</h1>
                    </div>
                    <div className='w-[90.56px] md:w-[109px] h-[166px] p-1 rounded-[12.45px] bg-[#F6F6F6E5] ' >
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

    )
}

export default InThisProject