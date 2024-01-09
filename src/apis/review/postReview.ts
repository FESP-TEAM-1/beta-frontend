import axios from "axios";
import { ReviewPostParamType } from "@/types";

interface ReviewPostResponse {
  ok: boolean;
  data: boolean;
}
const postReview = async (review: ReviewPostParamType) => {
  const { data } = await axios.post<ReviewPostResponse>(`/api/show/review-add`, review);

  return data;
};

export default postReview;
