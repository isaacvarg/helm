import { create } from "zustand";


export type EditorTarget =
  | { type: "dashboard" }
  | { type: "tab"; id: number | null; tabId?: number }
  | { type: "section"; id: number | null; tabId: number }
  | { type: "link"; id: number | null; sectionId: number };

interface EditModeState {
  isEditing: boolean;
  target: EditorTarget | null;
  actions: {
    toggleEdit: () => void;
    setEditing: (v: boolean) => void;
    openEditor: (t: EditorTarget) => void;
    closeEditor: () => void;
  };
}

export const useEditMode = create<EditModeState>((set) => ({
  isEditing: false,
  target: null,
  actions: {
    toggleEdit: () => set((s) => ({ isEditing: !s.isEditing, target: null })),
    setEditing: (v) => set({ isEditing: v, target: v ? undefined : null } as Partial<EditModeState>),
    openEditor: (t) => set({ target: t }),
    closeEditor: () => set({ target: null }),
  },
}));

export const useEditModeActions = () => useEditMode((s) => s.actions);
