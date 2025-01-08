import Button from '../components/Button';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const Settings = () => {

  const dispatch = useDispatch();


    useEffect(() => {
      dispatch(setPage('settings')); 
    }, [dispatch]);
  


  return (
    <div className='m-5 divide-y-2 flex flex-col gap-[19px] '>
      <section >
        <div className='flex py-[65px]' >
          <img className='w-28 rounded-full drop-shadow-[0px_2px_2px_rgba(0,0,0,0.50)] ' src="./src/assets/profile_picture.jpg" alt="profile image" />
          <div className='flex flex-col justify-center'>
          <h1 className=' px-4 text-3xl font-bold' >John Doe</h1>
          <p className=' px-4 opacity-70 ' >john.doe@example.com</p>
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-medium'>Project profile</h1>
          <p className='opacity-70 text-sm'>Update your profile information in the sections below.</p>
        </div>
      </section >

      <section className='flex flex-col   py-[19px]' >
        <h2 className='text-xl font-semibold '>Basic information</h2>
        <p className=' mb-[19px] max-w-[401px] opacity-70 leading-10 text-sm '>Update your name and e-mail in this section. Note: this information will be public to all your project colleagues and can be changed anytime.</p>

        <div className="flex flex-wrap gap-[13px]  max-w-[800px]">
        <label className='font-semibold   mr-[10px] ' htmlFor="">First name <br />
        <input className='border px-3 py-2  rounded-md w-[297px] font-normal ' type="text" placeholder='New first name' />
        </label>
        <label className='font-semibold ' htmlFor="">Last name <br />
        <input className='border px-3 py-2 rounded-md w-[297px] font-normal ' type="text" placeholder='New last name' />
        </label>
        <label className='font-semibold  grow ' htmlFor="">E-mail <br />
        <input className='border px-3 pt-2 rounded-md font-normal w-[297px] md:w-[617px]  ' type="text" placeholder='New e-mail' />
        </label>
        </div> 
        </section>
      <section className='  py-[19px]' >
        <h2 className='text-xl font-bold'>Profile picture</h2>
        <p className=' max-w-[401px] opacity-70 leading-10 text-sm'>Update your profile picture. Supported files are JPG, PNG, WebP and JPEG.</p>
        
        <div className="flex flex-col w-full md:flex-row gap-[21px] ">
          <img className='w-[175px] h-[181px] rounded-full ' src="./src/assets/profile_picture.jpg" alt="profile image" />
          <label className='font-medium text-sm grow max-w-[410px]' htmlFor="">Add new profile picture
          
            <div className='bg-blue-100   border-[1px] border-blue-400 rounded-md p-3  flex justify-between items-center' >
              <div className=' flex items-center gap-1'>
              <img className='w-[18px] h-[18px]' src="./src/assets/icons/clip.png" alt="" /><p>imageattachment.jpg</p> </div>
              <img src="./src/assets/icons/trash.png" alt="" /> 
            </div>
              <div className=' flex flex-col items-center justify-center h-[152px] my-[10px] border-dashed border-blue-400 rounded-md border-[2px]  text-center' >
              <img className='w-6' src="./src/assets/icons/upload.png" alt="" />
              <h1 className='my-3'>Drop here to attach or <a className="text-[#5570F1]" href=""> upload </a> </h1>
              <p  >Max size: 5GB</p>
            </div>
          </label>
        </div>
      </section>
      <section>
        <h2 className='text-xl font-bold  py-[19px]' >Communication</h2>
        <p className='max-w-[401px] opacity-70 leading-10 py-[19px] '>Update your e-mail communication preferences anytime. Choose to receive project notifications or disable them completely.</p>
        <ul>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] ' type="checkbox" /> 
            New tasks</label>
            <p className='py-2 text-sm'>Receive an e-mail alert each time a new task is assigned to me in a project.</p>
          </li>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] ' type="checkbox" /> 
            New team members</label>
            <p className='py-2 text-sm'>Receive an e-mail alert each time a team members enters in a project I’m assigned to.</p>
          </li>
          <li>
          <label  className='flex gap-2 items-center ' htmlFor="">
            <input className='peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] ' type="checkbox" /> 
            Weekly reports</label>
            <p className='py-2 text-sm'>Receive a weekly e-mail with a basic report, including estimated time and most active members.</p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className='text-xl font-bold py-[19px]'>Social information</h2>
        <p className='max-w-[401px] opacity-70 leading-10 '>Update your e-mail communication preferences anytime. Choose to receive project notifications or disable them completely.</p>
        
        <h1 className='w-full text-xs text-[#5E6366] mb-[9px] '>Twitter/X</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='x.com/' readOnly />
          <input className=' max-w-[158px] grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>
        <h1 className='w-full text-xs text-[#5E6366] mb-[9px]'>Instagram</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='instagram.com/' readOnly />
          <input className=' max-w-[158px] grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>
        <h1 className='w-full text-xs text-[#5E6366] mb-[9px]'>Linkedin</h1>
        <label className='flex flex-row gap-2 ' htmlFor="">
          <input className=' grow-0 w-52 border py-2 px-4  rounded-md ' type="text" placeholder='linkedin.com/in/' readOnly />
          <input className='  max-w-[158px] grow border p-1 rounded-md min-w-0' type="text" placeholder='TheJohnDoe'/>
        </label>

        <div className=" my-12 flex flex-col items-center">
        <Button  label='Update information' type='button' kind='primary' size='md' />
        <p className="my-[17px]" >Never mind, take me <a className="text-[#5570F1] underline" href="">back to my project.</a></p>
        </div>
      </section>

    </div> )
}

export default Settings
