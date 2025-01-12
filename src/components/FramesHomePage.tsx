import React from "react";

// Interface para os dados de cada ferramenta
interface ToolProps {
  imagem: string;
  titulo: string;
  subtitulo: string;
}

const FramesHomePage: React.FC<{ tools: ToolProps[] }> = ({ tools }) => {
  return (
    <div className="flex justify-between gap-[20px] w-full">
      {tools.map((tool, index) => (
        <div key={index} className="flex flex-col items-center w-[245px]">
          <img src={tool.imagem} alt={tool.titulo} className="w-full h-auto object-cover" />
          <div className="text-[#FFFFFF] text-[20px] font-[400] leading-[28px] text-center">
            {tool.titulo}
          </div>
          <div className="text-[#FFFFFF] text-[16px] font-[400] leading-[24px] text-center">
            {tool.subtitulo}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FramesHomePage;
