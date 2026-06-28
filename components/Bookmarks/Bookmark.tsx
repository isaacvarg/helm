"use client";
import { motion } from "motion/react";
import Icon from "../Icon";
import type { LinkData } from "@/lib/types";

interface BookmarkProps {
  data: LinkData;
}

const TITLE_SIZE: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const TITLE_WEIGHT: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Bookmark = ({ data }: BookmarkProps) => {
  const target = data.newTab ? "_blank" : "_self";
  const rel = data.newTab ? "noopener noreferrer" : undefined;

  const showTitle = data.showTitle;
  const showDescription = data.showDescription && !!data.description;
  const showText = showTitle || showDescription;
  const iconOnly = data.showIcon && !showText;
  const hasCustomBg = !!data.bgColor || !!data.bgImage;
  const alignClass =
    data.textAlign === "center"
      ? "text-center"
      : data.textAlign === "right"
        ? "text-right"
        : "text-left";
  const customColor = data.textColor ?? undefined;
  const textStyle = customColor ? { color: customColor } : undefined;
  const hasCustomBorder = data.borderWidth > 0;

  return (
    <motion.a
      href={data.href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={
        hasCustomBorder
          ? {
              borderStyle: data.borderStyle,
              borderWidth: `${data.borderWidth}px`,
              borderColor: data.borderColor ?? undefined,
            }
          : undefined
      }
      className={`group relative overflow-hidden flex gap-3 p-4 rounded-2xl transition-colors duration-200 cursor-pointer${
        hasCustomBorder ? "" : " border border-base-content/10 hover:border-base-content/20"
      }${showDescription ? " items-start" : " items-center"}${
        hasCustomBg ? "" : " bg-base-content/5 hover:bg-base-content/10"
      }${iconOnly ? " justify-center" : ""}`}
    >
      {data.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${data.bgImage}')` }}
        />
      )}
      {data.bgColor && (
        <div
          className="absolute inset-0"
          style={{ background: data.bgColor, opacity: data.bgOpacity }}
        />
      )}
      {data.showIcon && (
        <div className="relative z-10 shrink-0 p-2 rounded-xl bg-base-content/10 text-base-content/70 group-hover:text-base-content group-hover:bg-base-content/15 transition-colors duration-200">
          <Icon icon={data.icon} className="w-5 h-5" />
        </div>
      )}
      {showText && (
        <div className={`relative z-10 min-w-0 flex-1 ${alignClass}`}>
          {showTitle && (
            <p
              className={`${TITLE_SIZE[data.titleSize] ?? "text-sm"} ${
                TITLE_WEIGHT[data.titleWeight] ?? "font-medium"
              } truncate ${
                customColor
                  ? ""
                  : "text-base-content/90 group-hover:text-base-content"
              }`}
              style={textStyle}
            >
              {data.title}
            </p>
          )}
          {showDescription && (
            <p
              className={`text-xs mt-0.5 line-clamp-2 ${
                customColor
                  ? "opacity-70"
                  : "text-base-content/40 group-hover:text-base-content/60"
              }`}
              style={textStyle}
            >
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
