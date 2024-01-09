import axios from "axios";
import { ReviewPatchParamType } from "@/types";

interface ReviewPatchResponse {
  ok: boolean;
  data: boolean;
}

const patchReview = async (review: ReviewPatchParamType) => {
  await axios.patch<ReviewPatchResponse>(`/api/show/review-update`, review);
};

export default patchReview;
