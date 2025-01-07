import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const Settings = () => {

  const dispatch = useDispatch();


    useEffect(() => {
      dispatch(setPage('settings')); // Atualiza o estado do Redux para "home"
    }, [dispatch]);
  


  return (
    <div className='m-5 divide-y-4 flex flex-col gap-5'>
      <section>
        <div className='flex py-11' >
          <img className='w-28 rounded-full drop-shadow-[0px_2px_2px_rgba(0,0,0,0.50)] ' src="./src/assets/profile_picture.jpg" alt="profile image" />
          <div className='flex flex-col justify-center'>
          <h1 className=' px-4 text-3xl font-bold' >John Doe</h1>
          <p className=' px-4 opacity-70 ' >john.doe@example.com</p>
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold'>Project profile</h1>
          <p className='opacity-70 text-sm'>Update your profile information in the sections below.</p>
        </div>
      </section>

      <section className='flex flex-col  ' >
        <h2 className='text-xl font-bold'>Basic information</h2>
        <p className='opacity-70 leading-10 text-sm '>Update your name and e-mail in this section. Note: this information will be public to all your project colleagues and can be changed anytime.</p>
        
        <label className='font-semibold w-[297px] ' htmlFor="">First name
        <input className='border px-3 py-2 rounded-md w-[297px] font-normal ' type="text" placeholder='New first name' />
        </label>
        <label className='font-semibold w-[297px] ' htmlFor="">Last name
        <input className='border px-3 py-2 rounded-md w-[297px] font-normal ' type="text" placeholder='New last name' />
        </label>
        <label className='font-semibold w-[297px] ' htmlFor="">E-mail
        <input className='border px-3 py-2 rounded-md w-[297px] font-normal' type="text" placeholder='New e-mail' />
        </label> 
        </section>
      <section className='' >
        <h2 className='text-xl font-bold'>Profile picture</h2>
        <p className='opacity-70 leading-10 text-sm'>Update your profile picture. Supported files are JPG, PNG, WebP and JPEG.</p>
        <img className='w-44 rounded-full ' src="./src/assets/profile_picture.jpg" alt="profile image" />
        <label className='font-medium text-sm' htmlFor="">Add new profile picture
        <br />
        <div className='bg-blue-100 w-full  border-[1px] border-blue-400 rounded-md p-3  flex justify-between items-center' >
          <div className='w-[181px]  flex items-center gap-1'>
          <img className='w-[18px] h-[18px]' src="./src/assets/icons/clip.png" alt="" /><p>imageattachment.jpg</p> </div>
          <img src="./src/assets/icons/trash.png" alt="" /> 
          </div>
        <div className=' flex flex-col items-center justify-center h-[152px] my-[10px] border-dashed border-blue-400 rounded-md border-[2px]  text-center' >
          <img className='w-6' src="./src/assets/icons/upload.png" alt="" />
          <h1 className='my-3'>Drop here to attach or upload</h1>
          <p  >Max size: 5GB</p>
          </div>
          </label>
      </section>
      <section>
        <h2 className='text-xl font-bold' >Communication</h2>
        <p className='opacity-70 leading-10 '>Update your e-mail communication preferences anytime. Choose to receive project notifications or disable them completely.</p>
        <ul>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-blue-500 ' type="checkbox" /> 
            New tasks</label>
            <p className='py-2'>Receive an e-mail alert each time a new task is assigned to me in a project.</p>
          </li>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-blue-500 ' type="checkbox" /> 
            New team members</label>
            <p className='py-2'>Receive an e-mail alert each time a team members enters in a project I’m assigned to.</p>
          </li>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-blue-500 ' type="checkbox" /> 
            Weekly reports</label>
            <p className='py-2'>Receive a weekly e-mail with a basic report, including estimated time and most active members.</p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className='text-xl font-bold'>Social information</h2>
        <p className='opacity-70 leading-10 '>Update your e-mail communication preferences anytime. Choose to receive project notifications or disable them completely.</p>
        
        <h1 className='w-full'>Twitter/X</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='x.com/' readOnly />
          <input className=' grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>
        <h1 className='w-full'>Instagram</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='instagram.com/' readOnly />
          <input className=' grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>
        <h1 className='w-full'>Linkedin</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='linkedin.com/in/' readOnly />
          <input className=' grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>

        <button>Update information</button>
        <p>Never mind, take me <a href="">back to my project.</a></p>
      </section>

    </div> )
}

export default Settings
