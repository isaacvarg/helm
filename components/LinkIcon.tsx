import { createElement } from "react";
import { resolveIcon, isImageIcon } from "@/lib/iconMap";

interface LinkIconProps {
  icon: string;
  className?: string;
}

// Renders a link's icon, which may be either an image (uploaded file or website
// favicon stored as a URL/path) or a Lucide icon name.
const LinkIcon = ({ icon, className = "w-5 h-5" }: LinkIconProps) => {
  if (isImageIcon(icon)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon} alt="" className={`${className} object-contain rounded`} />
    );
  }
  return createElement(resolveIcon(icon), { className });
};

export default LinkIcon;
