"use client";
import { motion } from "motion/react";
import Icon from "../Icon";
import type { LinkData } from "@/lib/types";

interface BookmarkProps {
  data: LinkData;
}

const Bookmark = ({ data }: BookmarkProps) => {
  const target = data.newTab ? "_blank" : "_self";
  const rel = data.newTab ? "noopener noreferrer" : undefined;

  return (
    <motion.a
      href={data.href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 cursor-pointer"
    >
      <div className="shrink-0 p-2 rounded-xl bg-white/10 text-white/70 group-hover:text-white group-hover:bg-white/15 transition-colors duration-200">
        <Icon icon={data.icon} className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/90 group-hover:text-white truncate">
          {data.title}
        </p>
        {data.description && (
          <p className="text-xs text-white/40 group-hover:text-white/60 mt-0.5 line-clamp-2">
            {data.description}
          </p>
        )}
      </div>
    </motion.a>
  );
};

export default Bookmark;
export type { BookmarkProps };
