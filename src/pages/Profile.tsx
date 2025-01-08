import React from 'react'

import ProfileImg from "../assets/profile_picture.jpg"

const Profile = () => {
  return (
    <>
    <div className="px-4 py-12 md:px-8 md:py-18">
      <section className="bg-[#F6F6F6] bg-opacity-[90%] flex flex-col lg:flex-row lg:gap-8 rounded-[20px] px-8 py-12" >
        <div className="flex-2 basis-1/3 lg:pl-16">
          <div className="flex p items-center space-x-4">
            <figure className="flex-shrink-0 sm:w-[174.16px] sm:h-[181px] w-[126px] h-[130.95px]">
              <img src={ProfileImg} alt="Profile" className="rounded-[14.47px] shadow-md" />
            </figure>
            <div>
              <h2 className="sm:text-[48px] text-[38px] font-medium leading-[36px]">John Doe</h2>
              <p className="text-[28px] text-gray-700">@johnDoe</p>
            </div>
          </div>
          <h3 className="pt-12 text-[24px] font-medium">Profile data</h3>
          <p className="text-gray-500 leading-[36px]">John Doe’s information</p>
          <hr className="border-gray-500 border-opacity-25 mt-2 lg:min-w-[450px]"></hr>
          <h3 className="pt-2 pb-3 text-[24px] font-medium">Contact</h3>
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
              <p className="text-[15px] font-bold text-gray-500">Email</p>
              <p className="text-gray-500">john.doe@example.com</p>
            </div>
            <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
              <p className="text-[15px] font-bold text-gray-500">Twitter/x</p>
              <p className="text-gray-500">@theJohnDoe</p>
            </div>
            <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
              <p className="text-[15px] font-bold text-gray-500">Instagram</p>
              <p className="text-gray-500">@theJohnDoe</p>
            </div>
            <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
              <p className="text-[15px] font-bold text-gray-500">Linkedin</p>
              <p className="text-gray-500">@theJohnDoe</p>
            </div>
          </div>
          <h3 className="pt-11 pb-3 text-[24px] font-medium">Details</h3>
          <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
                <p className="text-[15px] font-bold text-gray-500">User ID</p>
                <p className="text-gray-500">000000000001</p>
              </div>
              <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
                <p className="text-[15px] font-bold text-gray-500">Creation date</p>
                <p className="text-gray-500">10/20/2024 09:00AM</p>
              </div>
              <div className="grid sm:grid-cols-[1fr,3fr] grid-cols-[1fr,2fr] gap-4">
                <p className="text-[15px] font-bold text-gray-500">Title</p>
                <p className="text-gray-500">Project Manager</p>
              </div>
          </div>
          <hr className="border-gray-500 lg:hidden border-opacity-25 mt-5"></hr>
        </div>
        <div className="flex-1 lg:border-l border-gray-300 lg:py-24 lg:px-3">
          <h3 className="pt-2 pb-3 text-[24px] font-medium">Latest activity</h3>
          <p className="text-gray-500 pb-10">John Doe’s last interactions</p>
          <div className="flex flex-col gap-6 pb-12 lg:pl-3">
            <div className="flex flex-row items-center gap-2">
              <figure className="w-[28px] h-[50px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden" >
                <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
              </figure>
              <p className="text-[14px] sm:text-[16px]"><span className="font-medium">John Doe</span> marked a task as done <span className="font-medium">on Set 25, 2024</span></p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <figure className="w-[28px] h-[50px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden" >
                <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
              </figure>
              <p className="text-[14px] sm:text-[16px]"><span className="font-medium">John Doe</span> marked a task as done <span className="font-medium">on Set 25, 2024</span></p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <figure className="w-[50px] h-[50px] rounded-full overflow-hidden" >
                <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
              </figure>
              <p className="text-[14px] sm:text-[16px]"><span className="font-medium">John Doe</span> marked a task as done <span className="font-medium">on Set 25, 2024</span></p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <figure className="w-[50px] h-[50px] rounded-full overflow-hidden" >
                <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
              </figure>
              <p className="text-[14px] sm:text-[16px]"><span className="font-medium">John Doe</span> marked a task as done <span className="font-medium">on Set 25, 2024</span></p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <figure className="w-[50px] h-[50px] rounded-full overflow-hidden" >
                <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
              </figure>
              <p className="text-[14px] sm:text-[16px]"><span className="font-medium">John Doe</span> marked a task as done <span className="font-medium">on Set 25, 2024</span></p>
            </div>
          </div>
          <h3 className="text-[24px] font-medium">Weekly report</h3>
          <p className="text-gray-500 pb-4">Tasks estimate</p>
          <div className="grid gap-4">
            <div className="grid grid-cols-[2fr,1fr] sm:grid-cols-[1fr,1.5fr]">
              <p className="sm:text-[20px] font-medium">Total tasks assigned</p>
              <p className="sm:text-[20px] font-bold text-blue-500">30</p>
            </div>
            <div className="grid grid-cols-[2fr,1fr] sm:grid-cols-[1fr,1.5fr]">
              <p className="sm:text-[20px] font-medium">Average work time</p>
              <p className="sm:text-[20px] font-bold text-blue-500">15h 25min</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Profile
