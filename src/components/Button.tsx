import React from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  kind: "primary" | "secondary" | "secondary-variation" | "outline" | "create";
  size?: "sm" | "sm-login" | "md" | "lg";
}

const BUTTON_KINDS: Record<ButtonProps["kind"], string> = {
  primary:
    "bg-[#1E293B] text-white rounded-lg border border-[#1E293B] hover:bg-[#3B5174]",
  secondary:
    "bg-white text-[#160A60] rounded-lg hover:bg-[#5C5A79] hover:text-white",
  "secondary-variation":
    "bg-white text-[#160A60] hover:bg-[#1E293B] hover:text-white",
  outline:
    "bg-[transparent] text-white rounded-[30px] border border-[#ffffff] hover:border-[#268FE4]",
  create:
    "bg-[#22C55E] text-white rounded-lg border border-[#22C55E] hover:bg-[#5CB77D]",
};

const BUTTON_SIZES: Record<
  "mobile" | "tablet" | "desktop",
  Record<NonNullable<ButtonProps["size"]>, string>
> = {
  mobile: {
    sm: "w-[205px]",
    "sm-login": "w-[105px]",
    md: "w-[287px]",
    lg: "w-full",
  },
  tablet: {
    sm: "w-[240px]",
    "sm-login": "w-[162px]",
    md: "w-[410px]",
    lg: "w-[489px]",
  },
  desktop: {
    sm: "w-[240px]",
    "sm-login": "w-[240px]",
    md: "w-[410px]",
    lg: "w-[489px]",
  },
};

const getScreenSize = () => {
  if (window.innerWidth < 410) return "mobile";
  if (window.innerWidth < 768) return "tablet";
  return "desktop";
};

const Button: React.FC<ButtonProps> = ({ label, type, kind, size = "lg" }) => {
  const screenSize = getScreenSize();
  const kindClasses = BUTTON_KINDS[kind];
  const sizeClasses = BUTTON_SIZES[screenSize][size];

  const classes = `px-4 py-2 h-12 ${kindClasses} ${sizeClasses}`;

  return (
    <button className={classes} type={type}>
      {label}
    </button>
  );
};

export default Button;
