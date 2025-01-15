import React from 'react'
import { Link } from 'react-router-dom'
import Button from "./Button";

const MainSection = () => {
  return (
    <div
      className="relative flex flex-row justify-center items-start bg-cover bg-center z-[0] lg:h-[644px] "
      style={{ backgroundImage: `url('./images/home_main_background.jpeg')` }}
    >
      {/* Fundo com a imagem de fundo */}
      <div className=" relative  lg:w-[1179px]  flex flex-col lg:flex-row items-center justify-between gap-7 md:gap-[60px] py-14  px-5">
        {/* Bloco com a foto da menina e texto */}
        <div className=" rounded-[30px] w-[353px] md:w-[656px] md:px-[68px]  py-6 space-y-6 flex flex-col items-center md:items-start bg-[#0000008C]">
          {/* Texto à esquerda */}
          <h1 className="text-2xl whitespace-nowrap md:text-[35px]  font-bold  text-white ">
            Welcome to{" "}
            <strong className=" font-bold text-[#92BBFF]">
              Project Manager
            </strong>
          </h1>
          <p className="text-sm md:text-base text-center md:text-left  w-[236px] md:w-[520px] text-white">
            Get your projects and ideas in order, all in one place! Sign up now
            and discover a smarter way to manage your work with efficiency and
            teamwork
          </p>
          {/* Botão Get Started */}
          <Link to='/signup'>
            <div className="w-[118px] sm:w-[240px] ">
              <Button
                label="Get Started"
                type="button"
                kind="outline"
                size="full"
              />
            </div>
          </Link>
        </div>

        {/* Imagem da menina no meio */}
        <div className="absolute hidden bottom-[-320px] right-[170px]  lg:block ">
          <img
            src="./images/RETRAT_1-removebg 1.png"
            alt="Retrato da Menina"
            className="w-full h-auto "
          />
        </div>

        {/* Blocos à direita */}
        <div className=" flex flex-col md:flex-row lg:flex-col md:w-[656px] lg:w-[180px] justify-between gap-[17px] text-base text-white">
          <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
            <h2 className=" font-bold ">2000+</h2>
            <p>Satisfied clients</p>
          </div>
          <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
            <h2 className=" font-bold ">400+</h2>
            <p>Managed projects</p>
          </div>
          <div className="bg-[#23081CB2] w-[180px] p-6 rounded-2xl shadow-md">
            <h2 className="font-bold ">500+</h2>
            <p>Kanban boards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection