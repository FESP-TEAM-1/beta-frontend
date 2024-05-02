import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getShowReservationInfo } from "@/apis";
import { ShowType } from "@/types";

const useGetShowResInfoQuery = (showId: string) => {
  const queryClient = useQueryClient();

  const {
    data: showResInfoData,
    status: showResInfoStatus,
    error: showResInfoError,
  } = useQuery({
    queryKey: ["showReservationInfoData", showId],
    queryFn: () => getShowReservationInfo(showId),
    enabled: !!queryClient.getQueryData<ShowType>(["showInfoData", showId])?.is_reservation,
  });
  return { showResInfoData, showResInfoStatus, showResInfoError };
};

export default useGetShowResInfoQuery;
