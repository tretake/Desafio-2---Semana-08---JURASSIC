
import React from 'react';

interface CardPaginaHomeProps {
imagem: string;
titulo: string;
texto: string;

}

const CardPaginaHome: React.FC<CardPaginaHomeProps> = ({imagem, titulo, texto }) => {
  return (
    <div className="flex flex-col  bg-[#1E293B] h-[381px] rounded-lg  ">
     {/* Container da imagem */}
        
      <img className=" size-[307px] object-cover rounded-t-lg" src={imagem} alt={titulo} />
        

     {/* Container de texto */}
     <div className="flex flex-col items-start p-4 w-full  min-h-[80px]">
        <h3 className="text-white text-sm font-normal">{titulo}</h3>
        <p className="text-white text-lg font-medium">{texto}</p>
        </div>

    </div>
  );
};

export default CardPaginaHome;