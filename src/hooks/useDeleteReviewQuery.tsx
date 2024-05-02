import { deleteAdminReview } from "@/apis";
import { ReviewDeleteParamType, ReviewType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteReviewQuery = (showId: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (review: ReviewDeleteParamType) => deleteAdminReview(review),
    onMutate: async (review) => {
      await queryClient.cancelQueries({ queryKey: ["reviewList", showId] });
      const oldData = queryClient.getQueryData<ReviewType[]>(["reviewList", showId])!;
      const newData = oldData.filter((item) => item.id !== review.review_id);
      queryClient.setQueryData(["reviewList", showId], [...newData]);
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["reviewList", showId], [...context!.oldData]);
      toast.error("댓글 삭제 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewList", showId] });
      queryClient.invalidateQueries({ queryKey: ["showList"] });
    },
  });
  return { deleteMutate };
};

export default useDeleteReviewQuery;
