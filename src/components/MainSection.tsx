import React from 'react'


const MainSection = () => {
  return (
    <div
    className="relative  bg-cover bg-center"
    style={{ backgroundImage: `url('./images/home_main_background.jpeg')` }}
  >
    {/* Fundo com a imagem de fundo */}
    <div className="flex flex-col items-center justify-between gap-7 py-14 px-5">
      {/* Bloco com a foto da menina e texto */}
      <div className=" rounded-[30px] w-[353px] md:w-[656px] py-6 space-y-6 flex flex-col items-center bg-[#0000008C]">
        {/* Texto à esquerda */}
        <h1 className="text-2xl  font-bold text-red leading-tight text-white ">
          Welcome to <strong className=' font-bold text-[#92BBFF]' >Project Manager</strong>
        </h1>
        <p className="text-sm text-center  w-[236px] text-white">
        Get your projects and ideas in order, all in one place! Sign up now and discover a smarter way to manage your work with efficiency and teamwork
        </p>
        {/* Botão Get Started */}
        <button className="mt-6 font-bold py-3 px-6 border-[2px] rounded-full text-white text-lg  hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Imagem da menina no meio */}
      <div className="w-1/3 space-y-8  hidden  ">
         <img src="./images/RETRAT_1-removebg 1.png" alt="Retrato da Menina" className="w-full h-auto " /> 
       
      </div>

      {/* Blocos à direita */}
      <div className=" flex flex-col md:flex-row md:w-[656px] justify-between gap-[17px] text-base text-white">
        <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
          <h2 className=" font-bold ">2000+</h2>
          <p className=" ">Satisfied clients</p>
        </div>
        <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
          <h2 className=" font-bold ">400+</h2>
          <p className=" ">Managed projects</p>
        </div>
        <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold ">500+</h2>
          <p className=" ">Kanban boards</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainSection