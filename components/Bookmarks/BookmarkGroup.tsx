"use client";
import Bookmark from "./Bookmark";
import Icon from "../Icon";
import { deleteSection } from "@/app/actions/dashboard";
import EditOverlay from "../edit/EditOverlay";
import AddButton from "../edit/AddButton";
import type { SectionData } from "@/lib/types";

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const ICON_SIZE: Record<string, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  base: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const TITLE_SIZE: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const TITLE_WEIGHT: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

interface BookmarkGroupProps {
  data: SectionData;
  columns?: number;
}

const BookmarkGroup = ({ data, columns = 2 }: BookmarkGroupProps) => {
  const hasBg = !!data.bgColor || !!data.bgImage;
  const hasBorder = data.borderWidth > 0;

  return (
    <EditOverlay
      target={{ type: "section", id: data.id, tabId: data.tabId }}
      onDelete={() => deleteSection(data.id)}
      label="section"
    >
      <div
        className={`relative p-4 ${hasBg || hasBorder ? "rounded-2xl" : ""}`}
        style={
          hasBorder
            ? {
              borderStyle: data.borderStyle,
              borderWidth: `${data.borderWidth}px`,
              borderColor: data.borderColor ?? undefined,
            }
            : undefined
        }
      >
        {hasBg && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ opacity: data.bgOpacity }}
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
                style={{ background: data.bgColor }}
              />
            )}
          </div>
        )}
        <div className="relative z-10 space-y-3 p-2">
          <div className="flex items-center gap-2 text-base-content/50">
            {data.showIcon && (
              <Icon icon={data.icon} className={ICON_SIZE[data.iconSize] ?? "w-4 h-4"} />
            )}
            {data.showTitle && (
              <h3
                className={`${TITLE_SIZE[data.titleSize] ?? "text-xs"} ${TITLE_WEIGHT[data.titleWeight] ?? "font-semibold"
                  } uppercase tracking-wider ${data.titleColor ? "" : "text-base-content"
                  }`}
                style={data.titleColor ? { color: data.titleColor } : undefined}
              >
                {data.title}
              </h3>
            )}
          </div>
          <div className={`grid gap-4 ${GRID_COLS[columns] ?? "grid-cols-2"}`}>
            {data.links.map((link) => (
              <EditOverlay
                key={link.id}
                target={{ type: "link", id: link.id, sectionId: data.id }}
                label="link"
              >
                <Bookmark data={link} />
              </EditOverlay>
            ))}
            <AddButton
              target={{ type: "link", id: null, sectionId: data.id }}
              label="Add link"
              className="col-span-full justify-center py-4"
            />
          </div>
        </div>
      </div>
    </EditOverlay>
  );
};

export default BookmarkGroup;
export type { BookmarkGroupProps };
