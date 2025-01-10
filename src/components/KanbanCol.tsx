import React, { useState } from "react";
import KanbanCard from "./KanbanCard";
import CreationModal from "./CreationModal";

interface ColProps {
  number: number;
  label: string;
  color: "purple" | "orange" | "green";
  children?: React.ReactNode;
}

const KanbanCol: React.FC<ColProps> = ({ number, label, color, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const colClasses = `relative bg-[#1E293B1A]   flex justify-center
    w-[310px] h-[553px] rounded-[30px]    pt-[54px]`;

  const colHeaderClasses = `absolute px-1  flex  justify-between  items-center rounded-full w-full ${getColor(
    color,
    "header"
  )}
    h-[45px] top-[-6px]   
    `;
  const counterClass = ` flex items-center justify-center text-white rounded-full ${getColor(
    color,
    "item",
    true
  )} 
    text-sm      w-10        h-8   `;
  const labelClass = `text-base font-bold   ${getColor(color, "item")} 
    text-base  `;
  const plusIconClass = `${getColor(color, "item")} 
    size-6 `;
  return (
    <div className={colClasses}>
      <div className={colHeaderClasses}>
        <div className="flex  gap-1 items-center">
          <p className={counterClass}>{number}</p>
          <p className={labelClass}>{label}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={plusIconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div className="gap-[15px]  flex flex-col  hover:overflow-y-scroll overflow-hidden">
        {children}
      </div>
      <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default KanbanCol;
