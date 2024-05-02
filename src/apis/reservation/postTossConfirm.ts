import axios from "axios";
import { ErrorResponseType } from "@/types";

interface PostTossConfirmParamType {
  orderId: string;
  amount: string;
  paymentKey: string;
  show_id: number;
  show_times_id: number;
  is_receive_email: 1 | 0;
}

const postTossConfirm = async (body: PostTossConfirmParamType) => {
  const { data } = await axios.post<ErrorResponseType>(`/api/tossConfirm`, body);
  return data;
};

export default postTossConfirm;
