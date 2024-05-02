import axios from "axios";
import { ErrorResponseType } from "@/types";

interface PostReservationParamType {
  show_id: number;
  show_times_id: number;
  is_receive_email: 1 | 0;
}

const postReservation = async (body: PostReservationParamType) => {
  const { data } = await axios.post<ErrorResponseType>(`/api/confirm`, body);
  return data;
};

export default postReservation;
