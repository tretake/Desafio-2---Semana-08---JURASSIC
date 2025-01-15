
import React from "react";
import Button from "./Button";
import CardPaginaHome from "./CardPaginaHome";
import FramesHomePage from "./FramesHomePage"; // Importando o componente de frames
import SubscribeHomePage from "./SubscribeHomePage"; // Importando o componente de inscrição

// Imagens para o conteúdo
import cardImage1 from '../../public/images/CardPaginaHome1.png';
import cardImage2 from '../../public/images/CardPaginaHome2.png';
import cardImage3 from '../../public/images/CardPaginaHome3.png';
import tool1 from '../../public/images/Frame 1.png';
import tool2 from '../../public/images/Frame 2.png';
import tool3 from '../../public/images/Frame 3.png';
import tool4 from '../../public/images/Frame 4.png';

const TheManager = () => {
  // Dados para a lista de ferramentas
  const tools = [
    { imagem: tool1, titulo: 'Task Scheduler', subtitulo: 'Plan and schedule tasks' },
    { imagem: tool2, titulo: 'Deadline Tracker', subtitulo: 'Keep track of project deadlines' },
    { imagem: tool3, titulo: 'Communication Hub', subtitulo: 'Centralized team communication' },
    { imagem: tool4, titulo: 'Progress Report', subtitulo: 'Track project progress' },
  ];

  return (
    <div className="relative z-[10]">
      {/* Primeira sessão =================================================*/}
      <div className="flex flex-col bg-[#1E293B] gap-12 px-5 md:px-11 py-[60px]  ">
        <div className=" flex flex-col  items-start w-full gap-6 max-w-[996px] lg:self-center ">
          {/* Título */}
          <div className="text-[#FCF4B6] font-[700] text-2xl/[48px] md:text-[40px]/[48px]   text-left  ">
            The Manager
          </div>

          {/* Descrição */}
          <div className="text-[#FFFFFF] font-[400] text-[14px] md:text-base leading-[24px] text-left ml-[-4px] ">
            Project Manager is a tool designed to make organizing and tracking
            your daily tasks easier than ever. With a clean, intuitive interface
            and powerful features, you can plan, prioritize, and keep tabs on
            your projects - whether you’re working solo or with a team.
          </div>
          <div className="m-auto sm:m-0">
            <Button
              label="Learn More"
              type="button"
              kind="secondary"
              size="sm"
            />
          </div>
        </div>

        {/* Segunda sessão ================================================*/}
        <div className="overflow-hidden overflow-x-auto lg:self-center  ">
          <div className="flex overflow-x-auto gap-9 md:gap-10 w-[996px] overflow-y-hidden  ">
            <CardPaginaHome
              titulo={"Manage Projects"}
              texto={"20+ projects"}
              imagem={cardImage1}
            />
            <CardPaginaHome
              titulo={"Track Tasks"}
              texto={"50+ tasks"}
              imagem={cardImage2}
            />
            <CardPaginaHome
              titulo={"Collaborate"}
              texto={"10+ team members"}
              imagem={cardImage3}
            />
          </div>
        </div>
      </div>

      {/* Terceira sessão ================================================*/}
      <div className="flex flex-col items-center py-[59px] bg-[#5C5A79]  gap-[60px]">
        <div className="flex flex-col justify-center items-center gap-6">
          {/* Título */}
          <div className=" text-center text-[#FCF4B6] font-[700] text-[40px] leading-[48px]">
            Featured Tools
          </div>

          {/* Descrição */}
          <div className="text-center text-[#FFFFFF] text-sm/[24px] ">
            Tools to enhance your project management
          </div>

          {/* Botão "View All" */}
          <div className="w-[148px] sm:w-[240px] ">
            <Button
              label="View All"
              type="button"
              kind="secondary-variation"
              size="full"
            />
          </div>
        </div>

        {/* Passando os dados para o componente FramesHomePage */}
        <FramesHomePage tools={tools} />
      </div>

      {/* Quarta sessão - Inscrição ====================================*/}

      {/* Passando a seção 4 (inscrição) como componente filho */}
      <SubscribeHomePage />
    </div>
  );
};

export default TheManager;
