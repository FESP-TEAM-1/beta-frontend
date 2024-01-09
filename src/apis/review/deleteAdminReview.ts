import axios from "axios";
import { ReviewDeleteParamType } from "@/types";

interface ReviewDeleteResponse {
  ok: boolean;
  data: boolean;
}

const deleteAdminReview = async (review: ReviewDeleteParamType) => {
  const { review_id, show_id } = review;
  await axios.delete<ReviewDeleteResponse>(`/api/show/review/admin/delete/${review_id}/${show_id}`);
};

export default deleteAdminReview;
