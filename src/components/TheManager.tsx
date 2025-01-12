
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
        <div className="flex flex-wrap gap-[20px] justify-center items-center px-4 sm:px-8 md:px-16">
          <CardPaginaHome titulo={'Manage Projects'} texto={'20+ projects'} imagem={cardImage1} />
          <CardPaginaHome titulo={'Track Tasks'} texto={'50+ tasks'} imagem={cardImage2} />
          <CardPaginaHome titulo={'Collaborate'} texto={'10+ team members'} imagem={cardImage3} />
        </div>
      </div>

      {/* Terceira sessão ================================================*/}
      <div className="flex flex-col justify-center items-center py-[60px] px-[170px] gap-[60px] w-full h-[643px] bg-[#5C5A79]">
        
        <div className="flex flex-col justify-center items-center">
        {/* Título */}
        <div className="w-[520px] h-[48px] text-center text-[#FCF4B6] font-[700] text-[40px] leading-[48px]">
          Featured Tools
        </div>

        {/* Descrição */}
        <div className="w-[520px] h-[24px] text-center text-[#FFFFFF] font-[400] text-[16px] leading-[24px]">
          Tools to enhance your project management
        </div>

        {/* Botão "View All" */}
        <div className="flex flex-col items-start gap-[12px] w-[240px] h-[48px] bg-[#FFFFFF] rounded-[8px]">
          <Button label="View All" type="button" kind="primary" size="md" />
        </div>
        </div>

        {/* Passando os dados para o componente FramesHomePage */}
        <FramesHomePage tools={tools} />
      </div>

      {/* Quarta sessão - Inscrição ====================================*/}
      <div className="w-full">
        {/* Passando a seção 4 (inscrição) como componente filho */}
        <SubscribeHomePage />
      </div>
    </div>
  );
};

export default TheManager;
