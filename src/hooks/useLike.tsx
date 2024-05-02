import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useLoginStore } from "@/stores";
import { deleteLike, postLike } from "@/apis";
import { ShowType } from "@/types";

const useLike = (showId: string) => {
  const queryClient = useQueryClient();
  const {
    userState: { login_id },
  } = useLoginStore();

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => postLike(showId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId, login_id] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId, login_id]);
      queryClient.setQueryData(["infoData", showId, login_id], {
        ...oldData,
        user_liked: 1,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId, login_id], { ...context?.oldData });
    },
  });

  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteLike(showId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId, login_id] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId, login_id]);
      queryClient.setQueryData(["infoData", showId, login_id], {
        ...oldData,
        user_liked: 0,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId, login_id], { ...context?.oldData });
    },
  });

  return { likeMutate, deleteLikeMutate };
};

export default useLike;
