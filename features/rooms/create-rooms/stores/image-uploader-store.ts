import { FileWithId } from "@/types/global-type";
import { create } from "zustand";

interface ImageUploaderStore {
  files: FileWithId[];
  previews: Map<string, string>;
  setImage: (file: File) => void;
  resetImage: (fileId?: string) => void;
}

const useImageUploaderStore = create<ImageUploaderStore>((set, get) => ({
  files: [],
  previews: new Map(),

  setImage: (file) => {
    const id = crypto.randomUUID();
    const previewUrl = URL.createObjectURL(file);

    const fileWithId: FileWithId = Object.assign(file, { id });
    set((state) => ({
      files: [...state.files, fileWithId],
      previews: new Map(state.previews).set(id, previewUrl),
    }));
  },

  resetImage: (fileId) => {
    const { files, previews } = get();

    if (fileId) {
      const url = previews.get(fileId);
      if (url) URL.revokeObjectURL(url);

      set({
        files: files.filter((f) => f.id !== fileId),
        previews: new Map([...previews].filter(([id]) => id !== fileId)),
      });
    } else {
      previews.forEach((url) => URL.revokeObjectURL(url));
      set({ files: [], previews: new Map() });
    }
  },
}));

export { useImageUploaderStore };
export type { ImageUploaderStore };
