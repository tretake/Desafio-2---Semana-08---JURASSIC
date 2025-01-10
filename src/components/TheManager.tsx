
import React from "react";
import Button from "./Button";
import CardPaginaHome from "./CardPaginaHome";

const TheManager = () => {
  return (
    <div className="flex flex-col">
      {/* Primeira sessão =================================================*/}
      <div className="section-2 flex flex-col justify-center items-start py-[60px] px-[170px] gap-[60px] isolation-isolate w-full h-[843px] bg-[#1E293B]">
        {/* Título */}
        <div className="text-[#FCF4B6] font-[700] text-[40px] leading-[48px] text-left ml-[-10px]">
          The Manager
        </div>

        {/* Descrição */}
        <div className="text-[#FFFFFF] font-[400] text-[16px] leading-[24px] text-left ml-[-4px]">
          Project Manager is a tool designed to make organizing and tracking
          your daily tasks easier than ever. With a clean, intuitive interface
          and powerful features, you can plan, prioritize, and keep tabs on your
          projects - whether you’re working solo or with a team.
        </div>
        <Button label="Learn More" type="button" kind="secondary" size="sm" />
      </div>

      {/* Segunda sessão ================================================*/}
      <div className="bg-[#1E293B] w-full py-8">
        <div className="flex flex-row gap-[20px] justify-center items-center px-4 sm:px-8 md:px-16">
          <CardPaginaHome titulo={'Manage Projects'} texto={'20+ projects'} imagem='./images/CardPaginaHome1.png' />
          <CardPaginaHome titulo={'Track Tasks'} texto={'50+ tasks'} imagem='./images/CardPaginaHome2.png' />
          <CardPaginaHome titulo={'Collaborate'} texto={'10+ team members'} imagem='./images/CardPaginaHome3.png' />
        </div>
      </div>
    </div>

  


  );
};

export default TheManager;
