import { getShow } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useGetShowInfoQuery = (showId: string) => {
  const {
    data: showInfoData,
    status: showInfoStatus,
    error: showInfoError,
  } = useQuery({
    queryKey: ["showInfoData", showId],
    queryFn: () => getShow(showId),
    enabled: !!showId,
  });
  return { showInfoData, showInfoStatus, showInfoError };
};

export default useGetShowInfoQuery;
