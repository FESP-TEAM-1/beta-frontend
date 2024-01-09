import axios from "axios";
import { ShowResponseType } from "@/types";

const getUserLikeList = async () => {
  const { data } = await axios.get<ShowResponseType>(`/api/show/user/like`);
  return data.data;
};

export default getUserLikeList;
