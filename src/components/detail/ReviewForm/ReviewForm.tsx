import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/common";
import { ReviewPostParamType } from "@/types";
import { postReview } from "@/apis";
import styles from "./ReviewForm.module.css";

const ReviewForm = () => {
  const queryClient = useQueryClient();
  const { id: show_id } = useParams();
  const [reviewInput, setReviewInput] = useState("");
  const { mutate } = useMutation({
    mutationFn: (comment: ReviewPostParamType) => postReview(comment),
    onSuccess: () => {
      setReviewInput("");
      queryClient.invalidateQueries({
        queryKey: ["reviewData", show_id],
      });
    },
  });

  const handleReviewForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!show_id || !reviewInput) return;

    mutate({ show_id, comment: reviewInput });
  };

  return (
    <form id={"review-form"} className={styles["review-form"]} onSubmit={handleReviewForm}>
      <textarea
        value={reviewInput}
        onChange={(e) => {
          setReviewInput(e.target.value);
        }}
        className={styles["review-form__textarea"]}
        autoFocus
        placeholder="방문한 곳은 어떠셨나요? 후기/방명록을 통해 회원님의 멋진 경험을 공유해보세요!"
      />
      <Button type="submit" form={"review-form"}>
        <h3>방명록 등록하기</h3>
      </Button>
    </form>
  );
};

export default ReviewForm;
