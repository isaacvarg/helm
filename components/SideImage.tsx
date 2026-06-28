import Image from "next/image";
import type { ReactNode } from "react";

export interface SideImageProps {
  src: string;
  alt?: string;
  edge?: "gradient" | "line";
  overlay?: ReactNode;
}

const SideImage = ({ src, alt = "", edge = "gradient", overlay }: SideImageProps) => {
  return (
    <div className="relative w-1/3 shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={
          edge === "gradient"
            ? {
                maskImage:
                  "linear-gradient(to right, black 40%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 40%, transparent 100%)",
              }
            : undefined
        }
      />
      {edge === "line" && (
        <div className="absolute inset-y-0 right-0 w-px bg-base-content/10" />
      )}
      {overlay}
    </div>
  );
};

export default SideImage;
