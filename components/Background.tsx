import React from "react";

interface BackgroundProps {
  image: string;
  overlayFrom: string;
  overlayVia?: string | null;
  overlayTo: string;
  overlayOpacity: number;
  blur?: number;
  children: React.ReactNode;
}


const Background = ({ image, overlayFrom, overlayVia, overlayTo, overlayOpacity, blur = 5, children }: BackgroundProps) => {
  const stops = overlayVia
    ? `${overlayFrom}, ${overlayVia}, ${overlayTo}`
    : `${overlayFrom}, ${overlayTo}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')`, filter: `blur(${blur}px)` }}
      >
        <div
          className="fixed inset-0"
          style={{
            background: `linear-gradient(to bottom right, ${stops})`,
            opacity: overlayOpacity,
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default Background;
