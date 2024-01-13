import { MemberResponseType } from "@/types";
import axios from "axios";

const getMemberInfo = async () => {
  const { data } = await axios.get<MemberResponseType>(`/api/getMember`);
  return data.data[0];
};

export default getMemberInfo;
