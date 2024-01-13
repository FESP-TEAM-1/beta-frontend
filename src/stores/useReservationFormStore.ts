import { UserReservationFormType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useReservationFormStoreType {
  reservationForm: UserReservationFormType | null;
  setReservationForm: (item: UserReservationFormType) => void;
}

const useReservationFormStore = create(
  persist<useReservationFormStoreType>(
    (set) => ({
      reservationForm: null,
      setReservationForm: (data) =>
        set(() => ({
          reservationForm: data,
        })),
    }),
    {
      name: "reservation-form-storage",
    },
  ),
);

export default useReservationFormStore;
