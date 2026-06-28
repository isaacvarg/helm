"use client";
import { motion, AnimatePresence } from "motion/react";
import { useTabBar } from "@/store/tabBarSlice";
import { TabContent } from "./Bookmarks";
import type { TabData } from "@/lib/types";

interface ContentContainerProps {
  tabs: TabData[];
}

const ContentContainer = ({ tabs }: ContentContainerProps) => {
  const { activeTabId } = useTabBar();
  const currentTab = tabs.find((t) => t.slug === activeTabId) ?? tabs[0];
  if (!currentTab) return null;

  const hasCustomBg = !!currentTab.bgColor || !!currentTab.bgImage;
  const hasCustomBorder = currentTab.borderWidth > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-7xl"
    >
      <div
        className={`relative backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex min-h-150 ${
          hasCustomBg ? "" : "bg-base-100/40"
        } ${hasCustomBorder ? "" : "border border-base-content/10"}`}
        style={
          hasCustomBorder
            ? {
                borderStyle: currentTab.borderStyle,
                borderWidth: `${currentTab.borderWidth}px`,
                borderColor: currentTab.borderColor ?? undefined,
              }
            : undefined
        }
      >
        {currentTab.bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${currentTab.bgImage}')` }}
          />
        )}
        {currentTab.bgColor && (
          <div
            className="absolute inset-0"
            style={{ background: currentTab.bgColor, opacity: currentTab.bgOpacity }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex w-full"
          >
            <TabContent tab={currentTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContentContainer;
