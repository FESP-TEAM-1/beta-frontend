import { create } from "zustand";

interface useShowIdStoreType {
  showId: string;
  setShowId: (newShowId: string) => void;
}

const useShowIdStore = create<useShowIdStoreType>((set) => ({
  showId: "",
  setShowId: (id) =>
    set(() => ({
      showId: id,
    })),
}));

export default useShowIdStore;
