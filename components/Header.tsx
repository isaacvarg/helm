"use client";
import { motion } from "motion/react";
import EditOverlay from "./edit/EditOverlay";

interface HeaderProps {
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientVia?: string | null;
  gradientTo: string;
}

const Header = ({ title, subtitle, gradientFrom, gradientVia, gradientTo }: HeaderProps) => {
  const stops = gradientVia
    ? `${gradientFrom}, ${gradientVia}, ${gradientTo}`
    : `${gradientFrom}, ${gradientTo}`;

  return (
    <EditOverlay target={{ type: "dashboard" }} label="dashboard">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center px-6 py-2"
      >
        <h1
          className="text-5xl font-bold mb-2 bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, ${stops})` }}
        >
          {title}
        </h1>
        <p className="text-base-content/60 text-sm">{subtitle}</p>
      </motion.div>
    </EditOverlay>
  );
};

export default Header;
