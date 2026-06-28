"use client";
import type { ReactNode } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useEditMode, useEditModeActions, type EditorTarget } from "@/store/editModeSlice";

interface EditOverlayProps {
  target: EditorTarget;
  onDelete?: () => void;
  label?: string;
  children: ReactNode;
  className?: string;
}

const EditOverlay = ({ target, onDelete, label, children, className }: EditOverlayProps) => {
  const isEditing = useEditMode((s) => s.isEditing);
  const { openEditor } = useEditModeActions();

  if (!isEditing) return <>{children}</>;

  return (
    <div className={`relative group/edit ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-dashed border-primary/0 group-hover/edit:border-primary/70 transition-colors z-10" />
      <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover/edit:opacity-100 transition-opacity z-20">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openEditor(target);
          }}
          className="btn btn-primary btn-circle btn-sm shadow-lg"
          title={label ? `Edit ${label}` : "Edit"}
        >
          <LuPencil className="w-3.5 h-3.5" />
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (confirm(`Delete this ${label ?? "item"}?`)) onDelete();
            }}
            className="btn btn-error btn-circle btn-sm shadow-lg"
            title={label ? `Delete ${label}` : "Delete"}
          >
            <LuTrash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default EditOverlay;
