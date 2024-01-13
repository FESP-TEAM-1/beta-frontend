import axios from "axios";
import { ReviewsGetResponse } from "@/types";

const getReviewList = async (show_id: string) => {
  const { data } = await axios<ReviewsGetResponse>(`/api/detail/${show_id}/review`);

  return data.data;
};

export default getReviewList;
