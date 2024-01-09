import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { deleteLike, postLike } from "@/apis";
import { ShowType } from "@/types";

const useLike = (showId: string) => {
  const { mutate: likeMutate } = useMutation({
    mutationFn: () => postLike(showId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId]);
      queryClient.setQueryData(["infoData", showId], {
        ...oldData,
        user_liked: 1,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId], { ...context?.oldData });
    },
  });

  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteLike(showId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId]);
      queryClient.setQueryData(["infoData", showId], {
        ...oldData,
        user_liked: 0,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId], { ...context?.oldData });
    },
  });

  return { likeMutate, deleteLikeMutate };
};

export default useLike;
