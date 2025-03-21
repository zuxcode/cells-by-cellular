import { create } from "zustand";

interface FileState {
  file: File | null;
  id: string | null;
}

interface ReservationStore {
  fileState: FileState;
  setFile: (file: File) => void;
  removeFile: () => void;
  clearStore: () => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  fileState: { file: null, id: null },

  setFile: (file) =>
    set({
      fileState: {
        file,
        id: crypto.randomUUID(), 
      },
    }),

  removeFile: () => set({ fileState: { file: null, id: null } }),

  clearStore: () => set({ fileState: { file: null, id: null } }),
}));

export { useReservationStore };
