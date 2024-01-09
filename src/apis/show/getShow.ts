import { ShowResponseType } from "@/types";
import axios from "axios";

const getShow = async (showId: string) => {
  // TODO: try catch
  const { data } = await axios.get<ShowResponseType>(`/api/detail/${showId}`);
  return data.data[0];
};

export default getShow;
