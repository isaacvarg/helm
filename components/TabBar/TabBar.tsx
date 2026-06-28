"use client";
import { useTabBar, useTabBarActions } from "@/store/tabBarSlice";
import Icon from "@/components/Icon";
import { motion } from "motion/react";
import { useEditMode, useEditModeActions } from "@/store/editModeSlice";
import { LuPencil, LuPlus } from "react-icons/lu";
import type { TabData } from "@/lib/types";

interface TabBarProps {
  tabs: TabData[];
}

export const TabBar = ({ tabs }: TabBarProps) => {
  const { activeTabId } = useTabBar();
  const { setActiveTab } = useTabBarActions();
  const isEditing = useEditMode((s) => s.isEditing);
  const { openEditor } = useEditModeActions();

  return (
    <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-20">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="backdrop-blur-xl bg-base-100/40 rounded-full border border-base-content/20 shadow-2xl px-2 py-2"
      >
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.slug;

            return (
              <div key={tab.id} className="relative group/tab">
                <motion.button
                  onClick={() => setActiveTab(tab.slug)}
                  className={`relative px-6 py-3 rounded-full transition-colors duration-300 ${isActive ? "text-base-content" : "text-base-content hover:text-base-content/80"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${tab.pillGradientFrom}80, ${tab.pillGradientTo}80)`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2">
                    <Icon icon={tab.icon} className="w-5 h-5" />
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium overflow-hidden whitespace-nowrap "
                      >
                        {tab.label}
                      </motion.span>
                    )}
                  </div>
                </motion.button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditor({ type: "tab", id: tab.id });
                    }}
                    className="btn btn-primary btn-circle btn-xs absolute -top-2 -right-2 opacity-0 group-hover/tab:opacity-100 transition-opacity shadow-lg"
                    title="Edit tab"
                  >
                    <LuPencil className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
          {isEditing && (
            <button
              type="button"
              onClick={() => openEditor({ type: "tab", id: null })}
              className="btn btn-circle btn-outline btn-primary border-dashed"
              title="Add tab"
            >
              <LuPlus className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
