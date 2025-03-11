import { FileWithId } from "@/types/global-type";
import { create } from "zustand";
interface CreateRoomStore {
  sectionControl: "create" | "selected";
  setSectionControl: () => void;
  files: FileWithId[];
  setFiles: (files: File[]) => void;
  removeFile: (fileId: string) => void;
}

const useCreateRoomStore = create<CreateRoomStore>((set, get) => ({
  files: [] as FileWithId[],

  setFiles: (files) =>
    set({
      files: files.map((file) => ({
        ...file,
        id: crypto.randomUUID(), // Generate a unique ID for each file
      })),
    }),

  removeFile: (fileId: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== fileId),
    })),

  sectionControl: "selected",

  setSectionControl: () =>
    set((state) => ({
      sectionControl:
        state.sectionControl === "selected" ? "create" : "selected",
      files: [],
    })),

  reset: () =>
    set({
      files: [],
      sectionControl: "selected",
    }),
}));

export { useCreateRoomStore };
