import { getReviewList } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useGetReviewListQuery = (showId: string) => {
  const {
    data: reviewList,
    status: reviewLisStatus,
    error: reviewListError,
  } = useQuery({
    queryKey: ["reviewList", showId],
    queryFn: () => getReviewList(showId as string),
    enabled: !!showId,
  });
  return { reviewList, reviewLisStatus, reviewListError };
};

export default useGetReviewListQuery;
