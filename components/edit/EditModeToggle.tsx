"use client";
import { LuPencil, LuCheck } from "react-icons/lu";
import { useEditMode, useEditModeActions } from "@/store/editModeSlice";

const EditModeToggle = () => {
  const isEditing = useEditMode((s) => s.isEditing);
  const { toggleEdit } = useEditModeActions();

  return (
    <button
      type="button"
      onClick={toggleEdit}
      className={`btn btn-sm rounded-full fixed top-6 right-6 z-30 backdrop-blur-xl shadow-2xl ${
        isEditing ? "btn-primary" : "btn-ghost bg-base-100/30 border border-base-content/20"
      }`}
    >
      {isEditing ? <LuCheck className="w-4 h-4" /> : <LuPencil className="w-4 h-4" />}
      {isEditing ? "Done" : "Edit"}
    </button>
  );
};

export default EditModeToggle;
