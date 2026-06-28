"use client";
import { LuPlus } from "react-icons/lu";
import { useEditMode, useEditModeActions, type EditorTarget } from "@/store/editModeSlice";

interface AddButtonProps {
  target: EditorTarget;
  label: string;
  className?: string;
}

const AddButton = ({ target, label, className }: AddButtonProps) => {
  const isEditing = useEditMode((s) => s.isEditing);
  const { openEditor } = useEditModeActions();
  if (!isEditing) return null;

  return (
    <button
      type="button"
      onClick={() => openEditor(target)}
      className={`btn btn-sm btn-outline btn-primary border-dashed rounded-full ${className ?? ""}`}
    >
      <LuPlus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
};

export default AddButton;
