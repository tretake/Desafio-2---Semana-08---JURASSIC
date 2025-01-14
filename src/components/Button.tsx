import React, { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  kind: "primary" | "secondary" | "secondary-variation" | "outline" | "create";
  size: "sm" | "sm-subscribe" | "sm-login" | "md" | "lg" | "full";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BUTTON_KINDS: Record<ButtonProps["kind"], string> = {
  primary:
    "bg-[#1E293B] text-white rounded-[8px] border border-[#1E293B] hover:bg-[#3B5174]",
  secondary:
    "bg-white text-[#160A60] rounded-[8px] hover:bg-[#5C5A79] hover:text-white",
  "secondary-variation":
    "bg-white text-[#160A60] rounded-[8px] hover:bg-[#1E293B] hover:text-white",
  outline:
    "bg-[transparent] text-white border rounded-[30px] border-[#ffffff] hover:border-[#268FE4] hover:rounded-[30px]",
  create:
    "bg-[#22C55E] text-white rounded-[8px] border border-[#22C55E] hover:bg-[#5CB77D]",
};

const BUTTON_SIZES: Record<ButtonProps["size"], string> = {
  sm: "w-[205px] sm:w-[240px]",
  "sm-subscribe": "w-[142px] sm:w-[240px]",
  "sm-login": "w-[105px] sm:w-[162px] md:w-[240px]",
  md: "w-[287px] sm:w-[410px]",
  lg: "w-full sm:w-[489px]",
  full: "w-full",
};

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  kind,
  size = "full",
  onClick,
}) => {
  const kindClasses = BUTTON_KINDS[kind];
  const sizeClasses = BUTTON_SIZES[size];

  const classes = `px-4 md:py-2 h-[36px] sm:h-12 ${kindClasses} ${sizeClasses}`;

  return (
    <button className={classes} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
