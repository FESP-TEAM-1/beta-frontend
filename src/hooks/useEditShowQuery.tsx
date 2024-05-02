import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { putShow } from "@/apis";
import { useNavigate } from "react-router-dom";

const useEditShowQuery = () => {
  const navigate = useNavigate();
  const { mutate: mutateEditShow } = useMutation({
    mutationFn: (formData: FormData) => putShow(formData),
    onSuccess: (data) => {
      if (data) {
        toast.success("게시글 수정 완료");
        navigate("/mypage/admin/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateEditShow };
};

export default useEditShowQuery;
