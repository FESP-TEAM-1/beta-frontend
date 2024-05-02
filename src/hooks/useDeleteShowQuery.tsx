import { deleteAdminShow } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useDeleteShowQuery = () => {
  const navigate = useNavigate();
  const { mutate: mutateDeleteShow } = useMutation({
    mutationFn: (showId: string) => deleteAdminShow(showId),
    onSuccess: (data) => {
      if (data) {
        toast.success("게시글 삭제 완료");
        navigate("/mypage/admin/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteShow };
};

export default useDeleteShowQuery;
