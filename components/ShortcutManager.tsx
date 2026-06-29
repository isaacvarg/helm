"use client";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTabBar, useTabBarActions } from "@/store/tabBarSlice";
import { useEditMode } from "@/store/editModeSlice";
import { useShortcut, useShortcutActions } from "@/store/shortcutSlice";
import type { TabData } from "@/lib/types";

interface ShortcutManagerProps {
  tabs: TabData[];
  showIndicators: boolean;
  linkScope: string;
  kbdSize: string;
}

const ShortcutManager = ({
  tabs,
  showIndicators,
  linkScope,
  kbdSize,
}: ShortcutManagerProps) => {
  const { activeTabId } = useTabBar();
  const { setActiveTab } = useTabBarActions();
  const isEditing = useEditMode((s) => s.isEditing);
  const active = useShortcut((s) => s.active);
  const { toggle, exit, setShowIndicators, setKbdSize } = useShortcutActions();

  // keep the store's display config in sync with the dashboard so the deeply
  // nested Bookmark/TabBar can read it without prop drilling.
  useEffect(() => {
    setShowIndicators(showIndicators);
  }, [showIndicators, setShowIndicators]);

  useEffect(() => {
    setKbdSize(kbdSize);
  }, [kbdSize, setKbdSize]);

  // the order is not super necessary anymore
  // since keys must be unique
  const map: Record<string, () => void> = {};
  for (const tab of tabs) {
    if (tab.shortcutKey) {
      map[tab.shortcutKey.toLowerCase()] = () => setActiveTab(tab.slug);
    }
  }
  const linkTabs =
    linkScope === "all" ? tabs : tabs.filter((t) => t.slug === activeTabId);
  for (const tab of linkTabs) {
    for (const section of tab.sections) {
      for (const link of section.links) {
        if (link.shortcutKey) {
          map[link.shortcutKey.toLowerCase()] = () =>
            window.open(
              link.href,
              link.newTab ? "_blank" : "_self",
              link.newTab ? "noopener,noreferrer" : "",
            );
        }
      }
    }
  }

  const keys = Object.keys(map);

  useHotkeys("space", () => toggle(), {
    preventDefault: true,
    enabled: !isEditing,
  });

  useHotkeys("escape", () => exit(), { enabled: active });

  useHotkeys(
    keys.length ? keys.join(",") : "f13",
    (_e, h) => {
      const k = h.keys?.[0];
      if (k && map[k]) {
        map[k]();
        exit();
      }
    },
    { enabled: active && keys.length > 0, preventDefault: true },
    [activeTabId, active, linkScope, tabs],
  );

  return null;
};

export default ShortcutManager;
