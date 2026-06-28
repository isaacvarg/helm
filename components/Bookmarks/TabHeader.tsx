import type { TabData } from "@/lib/types";

const SIZE: Record<string, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const WEIGHT: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const TEXT_ALIGN: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const ITEMS: Record<string, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

const JUSTIFY: Record<string, string> = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
};

interface TabHeaderProps {
  tab: TabData;
  mode: "overlay" | "block";
}

const TabHeader = ({ tab, mode }: TabHeaderProps) => {
  if (!tab.headerTitle) return null;

  const heading = (
    <h2
      className={`${SIZE[tab.headerSize] ?? "text-2xl"} ${
        WEIGHT[tab.headerWeight] ?? "font-bold"
      } ${TEXT_ALIGN[tab.headerHAlign] ?? "text-center"} ${
        tab.headerColor ? "" : "text-base-content"
      }`}
      style={tab.headerColor ? { color: tab.headerColor } : undefined}
    >
      {tab.headerTitle}
    </h2>
  );

  if (mode === "block") {
    return heading;
  }

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col p-6 pointer-events-none ${
        JUSTIFY[tab.headerVAlign] ?? "justify-start"
      } ${ITEMS[tab.headerHAlign] ?? "items-center"}`}
    >
      {heading}
    </div>
  );
};

export default TabHeader;
