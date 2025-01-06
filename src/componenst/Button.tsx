import React from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  kind: "primary" | "secondary" | "secondary-variation" | "outline" | "create";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({ label, type, kind, size }) => {
  const getButtonClasses = (kind: string) => {
    switch (kind) {
      case "primary":
        return "bg-[#1E293B] text-white border border-[#1E293B] hover:bg-[#3B5174]";
      case "secondary":
        return "bg-white text-[#160A60] hover:bg-[#5C5A79] hover:text-white";
      case "secondary-variation":
        return "bg-white text-[#160A60] hover:bg-[#1E293B] hover:text-white";
      case "outline":
        return "bg-[transparent] text-white border border-[#ffffff] hover:border-[#268FE4] hover:rounded-[30px]";
      case "create":
        return "bg-[#22C55E] text-white border border-[#22C55E] hover:bg-[#5CB77D]";
      default:
        return "w-full";
    }
  };

  const getSizeClasses = (size: ButtonProps["size"]) => {
    switch (size) {
      case "sm":
        return "w-[240px]";
      case "md":
        return "w-[410px]";
      case "lg":
        return "w-[489px]";
      default:
        return "w-full";
    }
  };

  const classes = `px-4 py-2 h-12 rounded-lg ${getButtonClasses(
    kind
  )} ${getSizeClasses(size)}`;

  return (
    <button className={classes} type={type}>
      {label}
    </button>
  );
};

export default Button;
