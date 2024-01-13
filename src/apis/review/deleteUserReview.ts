import axios from "axios";
import { ReviewDeleteParamType } from "@/types";

interface ReviewDeleteResponse {
  ok: boolean;
  data: boolean;
}

const deleteUserReview = async (review: ReviewDeleteParamType) => {
  const { review_id, show_id } = review;
  await axios.delete<ReviewDeleteResponse>(`/api/show/review-delete/${review_id}/${show_id}`);
};

export default deleteUserReview;
