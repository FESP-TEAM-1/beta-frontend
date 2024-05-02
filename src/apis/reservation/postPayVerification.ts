import axios from "axios";
import { ErrorResponseType } from "@/types";

interface PostPayVerificationParamType {
  show_id: number;
  show_times_id: number;
  amount?: string;
}

/*
  - 로그인 여부
  - 예매 가능 여부
  - 서버 오류 등
*/
const postPayVerification = async (body: PostPayVerificationParamType) => {
  const { data } = await axios.post<ErrorResponseType>(`/api/payVerification`, body);
  return data;
};

export default postPayVerification;
