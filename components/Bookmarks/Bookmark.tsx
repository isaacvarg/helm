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

  const showTitle = data.showTitle;
  const showDescription = data.showDescription && !!data.description;
  const showText = showTitle || showDescription;
  const iconOnly = data.showIcon && !showText;

  return (
    <motion.a
      href={data.href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group flex items-start gap-3 p-4 rounded-2xl bg-base-content/5 border border-base-content/10 hover:bg-base-content/10 hover:border-base-content/20 transition-colors duration-200 cursor-pointer${
        iconOnly ? " justify-center" : ""
      }`}
    >
      {data.showIcon && (
        <div className="shrink-0 p-2 rounded-xl bg-base-content/10 text-base-content/70 group-hover:text-base-content group-hover:bg-base-content/15 transition-colors duration-200">
          <Icon icon={data.icon} className="w-5 h-5" />
        </div>
      )}
      {showText && (
        <div className="min-w-0">
          {showTitle && (
            <p className="text-sm font-medium text-base-content/90 group-hover:text-base-content truncate">
              {data.title}
            </p>
          )}
          {showDescription && (
            <p className="text-xs text-base-content/40 group-hover:text-base-content/60 mt-0.5 line-clamp-2">
              {data.description}
            </p>
          )}
        </div>
      )}
    </motion.a>
  );
};

export default Bookmark;
export type { BookmarkProps };
