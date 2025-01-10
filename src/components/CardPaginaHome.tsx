
import React from 'react';

interface CardPaginaHomeProps {
imagem: string;
titulo: string;
texto: string;

}

const CardPaginaHome: React.FC<CardPaginaHomeProps> = ({imagem, titulo, texto }) => {
  return (
    <div className="flex flex-col items-center bg-[#1E293B]  rounded-lg shadow-lg w-[340px] h-[420px]">
     {/* Container da imagem */}
     <div className="flex items-center justify-center w-full h-[340px]">
        <img className="w-full h-full object-cover rounded-t-lg" src={imagem} alt={titulo} />
        </div>

     {/* Container de texto */}
     <div className="flex flex-col items-start p-4 w-full  min-h-[80px]">
        <h3 className="text-white text-lg font-normal">{titulo}</h3>
        <p className="text-white text-base font medium">{texto}</p>
        </div>

    </div>
  );
};

export default CardPaginaHome;