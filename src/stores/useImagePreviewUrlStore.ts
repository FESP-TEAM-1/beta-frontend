import { create } from "zustand";

interface useImagePreviewUrlStore {
  imagePreviewUrls: string[];
  resetImagePreviewUrls: () => void;
  addImagePreviewUrls: (files: FileList) => void;
  removeImagePreviewUrls: (blobUrl: string) => void;
}

const useImagePreviewUrlStore = create<useImagePreviewUrlStore>((set) => ({
  imagePreviewUrls: [],
  resetImagePreviewUrls: () =>
    set((state) => {
      state.imagePreviewUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
      return { ...state, imagePreviewUrls: [] };
    }),
  addImagePreviewUrls: (files) => {
    const previewImgSrc = [...files].map((file) => URL.createObjectURL(file));
    set((state) => ({ ...state, imagePreviewUrls: [...state.imagePreviewUrls, ...previewImgSrc] }));
  },
  removeImagePreviewUrls: (blobUrl: string) =>
    set((state) => {
      const newImagePreviewUrls = state.imagePreviewUrls.filter((previewUrl) => {
        if (previewUrl === blobUrl) {
          URL.revokeObjectURL(blobUrl);
          return false;
        }
        return true;
      });
      return { ...state, imagePreviewUrls: newImagePreviewUrls };
    }),
}));

export default useImagePreviewUrlStore;
