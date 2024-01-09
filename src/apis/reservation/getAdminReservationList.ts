import axios from "axios";
import { ShowType } from "@/types";

interface ReservationListResponseType {
  ok: boolean;
  data: ShowType[];
}

const getAdminReservationList = async () => {
  const { data } = await axios<ReservationListResponseType>(`/api/show/admin/reservation/manage`);

  return data.data;
};

export default getAdminReservationList;
