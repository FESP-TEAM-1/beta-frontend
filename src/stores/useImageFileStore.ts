import { create } from "zustand";

interface useImageFileStore {
  imageFiles: File[];
  resetImageFiles: () => void;
  addImageFiles: (files: FileList) => void;
  removeImageFiles: (fileIndex: number) => void;
}

const useImageFileStore = create<useImageFileStore>((set) => ({
  imageFiles: [],
  resetImageFiles: () => set((state) => ({ ...state, imageFiles: [] })),
  addImageFiles: (files) => set((state) => ({ ...state, imageFiles: [...state.imageFiles, ...files] })),
  removeImageFiles: (deleteImgIndex: number) => {
    set((state) => ({ ...state, imageFiles: [...state.imageFiles.slice(0, deleteImgIndex), ...state.imageFiles.slice(deleteImgIndex + 1)] }));
  },
}));

export default useImageFileStore;
