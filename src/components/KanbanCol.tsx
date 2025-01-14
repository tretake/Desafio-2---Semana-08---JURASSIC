import React, { useState } from "react";
import KanbanCard from "./KanbanCard";
import CreationModal from "./CreationModal";

interface ColProps {
  number: number;
  label: string;
  color: "purple" | "orange" | "green";
  children?: React.ReactNode;
  openModal: Dispatch<SetStateAction<boolean>>
}

const KanbanCol: React.FC<ColProps> = ({ number, label, color, children ,openModal }) => {
  
  
  const getColor = (color: string, target: string, bg: boolean = false) => {
    switch (target) {
      case "header":
        switch (color) {
          case "purple":
            return "bg-[#D3D0F8]";
          case "orange":
            return "bg-[#FCE6C2]";
          case "green":
            return "bg-[#C7F0D6]";
        }

      case "item":
        switch (color) {
          case "purple":
            return bg ? "bg-[#4F46E5]" : "text-[#4F46E5]";
          case "orange":
            return bg ? "bg-[#F59E0B]" : "text-[#F59E0B]";
          case "green":
            return bg ? "bg-[#22C55E]" : "text-[#22C55E]";
        }
    }
  };

  return (
    <div className='relative bg-[#1E293B1A]   flex justify-center
    w-[310px] h-[553px] rounded-[30px] px-[16px]    pt-[54px]  pb-2'>
      <div className={`absolute px-1 h-[45px] top-[-6px]  flex  justify-between  items-center rounded-full w-full ${getColor(color,"header")}`}>
        <div className="flex  gap-1 items-center">
          <p className={`flex items-center justify-center text-white rounded-full ${getColor(color,"item",true)} text-sm w-10 h-8`}>{number}</p>
          <p className={`text-base font-bold ${getColor(color, "item")}`}>{label}</p>
        </div>
        <button onClick={() => openModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${getColor(color, "item")} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div className="gap-[15px]  flex flex-col  hover:overflow-y-scroll  scrollbar-hide overscroll-none overflow-hidden  ">
        {children}
      </div>
      
    </div>
  );
};

export default KanbanCol;
