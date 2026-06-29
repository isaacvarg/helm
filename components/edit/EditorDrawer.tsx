"use client";
import { LuX } from "react-icons/lu";
import { useEditMode, useEditModeActions } from "@/store/editModeSlice";
import type { DashboardData } from "@/lib/types";
import DashboardForm from "./forms/DashboardForm";
import TabForm from "./forms/TabForm";
import SectionForm from "./forms/SectionForm";
import LinkForm from "./forms/LinkForm";

interface EditorDrawerProps {
  dashboard: DashboardData;
}

const EditorDrawer = ({ dashboard }: EditorDrawerProps) => {
  const target = useEditMode((s) => s.target);
  const { closeEditor } = useEditModeActions();

  const allTabs = dashboard.tabs;
  const allLinks = allTabs.flatMap((t) => t.sections).flatMap((s) => s.links);
  const tabKeys = allTabs.map((t) => t.shortcutKey);
  const linkKeys = allLinks.map((l) => l.shortcutKey);
  const norm = (keys: string[]) =>
    keys.filter(Boolean).map((k) => k.toLowerCase());

  const renderBody = () => {
    if (!target) return null;
    if (target.type === "dashboard") {
      return <DashboardForm dashboard={dashboard} onDone={closeEditor} />;
    }
    if (target.type === "tab") {
      const existing = target.id ? dashboard.tabs.find((t) => t.id === target.id) : null;
      const takenKeys = norm([
        ...linkKeys,
        ...tabKeys.filter((_, i) => allTabs[i].id !== target.id),
      ]);
      return <TabForm tab={existing ?? null} takenKeys={takenKeys} onDone={closeEditor} />;
    }
    if (target.type === "section") {
      const existing = target.id
        ? dashboard.tabs.flatMap((t) => t.sections).find((s) => s.id === target.id)
        : null;
      return <SectionForm section={existing ?? null} tabId={target.tabId} onDone={closeEditor} />;
    }
    if (target.type === "link") {
      const existing = target.id
        ? allLinks.find((l) => l.id === target.id)
        : null;
      const takenKeys = norm([
        ...tabKeys,
        ...allLinks.filter((l) => l.id !== target.id).map((l) => l.shortcutKey),
      ]);
      return (
        <LinkForm
          link={existing ?? null}
          sectionId={target.sectionId}
          takenKeys={takenKeys}
          onDone={closeEditor}
        />
      );
    }
    return null;
  };

  const titleMap: Record<string, string> = {
    dashboard: "Dashboard",
    tab: "Tab",
    section: "Section",
    link: "Link",
  };

  return (
    <>
      {target && (
        <div
          onClick={closeEditor}
          className="fixed inset-0 bg-base-300/60 backdrop-blur-sm z-40"
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100/95 backdrop-blur-xl border-l border-base-content/10 shadow-2xl z-50 transition-transform duration-300 overflow-y-auto ${
          target ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-base-content/10 bg-base-100/95 backdrop-blur-xl">
          <h2 className="text-base-content font-semibold">
            {target ? `Edit ${titleMap[target.type]}` : ""}
          </h2>
          <button
            type="button"
            onClick={closeEditor}
            className="p-1.5 rounded-full hover:bg-base-content/10 text-base-content"
          >
            <LuX className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{renderBody()}</div>
      </aside>
    </>
  );
};

export default EditorDrawer;
