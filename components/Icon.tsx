import { createElement } from "react";
import { resolveIcon, isImageIcon } from "@/lib/iconMap";

interface IconProps {
  icon: string;
  className?: string;
}

const Icon = ({ icon, className = "w-5 h-5" }: IconProps) => {
  if (isImageIcon(icon)) {
    return (
      <img src={icon} alt="" className={`${className} object-contain rounded`} />
    );
  }
  return createElement(resolveIcon(icon), { className });
};

export default Icon;
