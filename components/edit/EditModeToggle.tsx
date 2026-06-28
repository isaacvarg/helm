"use client";
import { LuPencil, LuCheck } from "react-icons/lu";
import { useEditMode, useEditModeActions } from "@/store/editModeSlice";
import type { DashboardData } from "@/lib/types";

interface EditModeToggleProps {
  dashboard: DashboardData;
}

const BTN_TYPE: Record<string, string> = {
  solid: "",
  outline: "btn-outline",
  ghost: "btn-ghost",
  soft: "btn-soft",
  link: "btn-link",
};

const BTN_SIZE: Record<string, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const EditModeToggle = ({ dashboard }: EditModeToggleProps) => {
  const isEditing = useEditMode((s) => s.isEditing);
  const { toggleEdit } = useEditModeActions();

  const hasCustomBg = !!dashboard.settingsBgColor || !!dashboard.settingsBgImage;
  const hasCustomBorder = dashboard.settingsBorderWidth > 0;

  return (
    <button
      type="button"
      onClick={toggleEdit}
      style={
        hasCustomBorder
          ? {
              borderStyle: dashboard.settingsBorderStyle,
              borderWidth: `${dashboard.settingsBorderWidth}px`,
              borderColor: dashboard.settingsBorderColor ?? undefined,
            }
          : undefined
      }
      className={`btn rounded-full fixed top-6 right-6 z-30 backdrop-blur-xl shadow-2xl overflow-hidden ${
        BTN_TYPE[dashboard.settingsButtonType] ?? "btn-ghost"
      } ${BTN_SIZE[dashboard.settingsButtonSize] ?? "btn-sm"} ${
        isEditing ? "btn-active" : ""
      } ${hasCustomBg ? "" : "bg-base-100/30"}`}
    >
      {dashboard.settingsBgImage && (
        <span
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${dashboard.settingsBgImage}')` }}
        />
      )}
      {dashboard.settingsBgColor && (
        <span
          className="absolute inset-0"
          style={{
            background: dashboard.settingsBgColor,
            opacity: dashboard.settingsBgOpacity,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {dashboard.settingsShowIcon &&
          (isEditing ? (
            <LuCheck className="w-4 h-4" />
          ) : (
            <LuPencil className="w-4 h-4" />
          ))}
        {dashboard.settingsShowTitle && (isEditing ? "Done" : "Edit")}
      </span>
    </button>
  );
};

export default EditModeToggle;
