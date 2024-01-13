import { create } from "zustand";

interface useCarouselDragStoreType {
  isDragging: boolean;
  setIsDragging: (state: boolean) => void;
}

const useCarouselDragStore = create<useCarouselDragStoreType>((set) => ({
  isDragging: false,
  setIsDragging: (state) =>
    set(() => ({
      isDragging: state,
    })),
}));

export default useCarouselDragStore;
