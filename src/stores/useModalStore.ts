import { create } from "zustand";

interface useModalStoreType {
  openModal: OpenModal;
  setOpenModal: (args: { state: boolean; type?: string }) => void;
}

interface OpenModal {
  state: boolean;
  type: string;
}

const useModalStore = create<useModalStoreType>((set) => ({
  openModal: { state: false, type: "" },
  setOpenModal: ({ state, type = "" }) =>
    set(() => ({
      openModal: {
        state,
        type,
      },
    })),
}));

export default useModalStore;
