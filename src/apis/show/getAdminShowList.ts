import { ShowType } from "@/types";
import axios from "axios";

interface ShowListResponse {
  ok: boolean;
  data: ShowListItemType[];
}

export interface ShowListItemType extends Omit<ShowType, "user_liked"> {
  likes_count: number;
  reviews_count: number;
}

const getAdminShowList = async () => {
  const { data } = await axios<ShowListResponse>(`/api/show/admin`);
  return data.data;
};

export default getAdminShowList;
