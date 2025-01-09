import React from 'react'
import KanbanCard from './KanbanCard';

interface ColProps {
  number: number ;
  label: string;
  color: "purple" | "orange" | "green";
  children?: React.ReactNode;
}


const KanbanCol:  React.FC<ColProps> = ({number,label,color , children}) => {
  
  const getColor = (color:string,target:string,bg:boolean = false) => 
    {
      switch (target) {
        case 'header':
          switch (color) {
            case "purple":
              return "bg-[#D3D0F8]";
            case "orange":
              return "bg-[#FCE6C2]";
            case "green":
              return "bg-[#C7F0D6]";
          }

        case 'item':
          switch (color) {
            case 'purple':
              return bg? "bg-[#4F46E5]" : "text-[#4F46E5]";
            case "orange":
              return bg? "bg-[#F59E0B]" : "text-[#F59E0B]";
            case "green":
              return bg? "bg-[#22C55E]" : "text-[#22C55E]";
          }
      }
    };
  
    const colClasses = `relative bg-[#1E293B1A]   flex justify-center
       w-[109px]    h-[197px]    rounded-[10.56px]    pt-[19px]
    md:w-[205px] md:h-[366px] md:rounded-[20px]    md:pt-[35.74px]
    lg:w-[310px] lg:h-[553px] lg:rounded-[30px]    lg:pt-[54px]`;

    const colHeaderClasses = `absolute px-1  flex  justify-between  items-center rounded-full w-full ${getColor(color,'header')}
       h-[16px]    top-[-2px]
    md:h-[22px] md:top-[-4px]
    lg:h-[45px] lg:top-[-6px]   
    `;
    const counterClass = ` flex items-center justify-center text-white rounded-full ${getColor(color,'item',true)} 
       text-[5px]      w-[15px]       h-[12px]
    md:text-[9.2px] md:w-[26.89px] md:h-[22px]
    lg:text-sm      lg:w-10        lg:h-8   `;
    const labelClass = `text-base font-bold   ${getColor(color,'item')} 
       text-[6px]
    md:text-[10.6px]
    lg:text-base  `;
    const plusIconClass = `${getColor(color,'item')} 
       size-[8.4px]
    md:size-[15.89px]
    lg:size-6 `
  return (
    <div className={colClasses} >
      <div className={colHeaderClasses}>
        <div className='flex  gap-1 items-center'>
        <p className={counterClass} >{number}</p>
        <p className={labelClass}  >{label}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={plusIconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <div className='lg:gap-[15px] md:gap-[10px] gap-[5.28px] flex flex-col  hover:overflow-y-scroll overflow-hidden'>
       {children}
      </div>
    </div>
  )
}

export default KanbanCol
