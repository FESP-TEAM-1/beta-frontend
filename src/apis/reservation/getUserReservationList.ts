import axios from "axios";
import { ResponseUserReservationInfoType } from "@/types";

const getUserReservationList = async () => {
  const { data } = await axios.get<ResponseUserReservationInfoType>(`/api/show/user/reservation`);
  return data.data;
};

export default getUserReservationList;
