import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/common";
import { patchReview } from "@/apis";
import { ReviewPatchParamType, ReviewType } from "@/types";
import styles from "./ReviewEditForm.module.css";

interface PropsType {
  item: ReviewType;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewEditForm: React.FC<PropsType> = ({ item, setIsEditMode }) => {
  const queryClient = useQueryClient();
  const { id: show_id } = useParams();
  const [reviewInput, setReviewInput] = useState("");

  useEffect(() => {
    setReviewInput(item.comment);
  }, []);

  const { mutate: editMutate } = useMutation({
    mutationFn: (review: ReviewPatchParamType) => patchReview(review),
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries({
        queryKey: ["reviewData", show_id],
      });
    },
  });

  const handleSubmitEditForm = (item: ReviewType) => (e: React.FormEvent) => {
    e.preventDefault();
    const { id: review_id, show_id } = item;
    editMutate({ review_id, show_id, comment: reviewInput });
  };

  return (
    <form className={styles["comment-form"]} onSubmit={handleSubmitEditForm(item)}>
      <textarea
        className={styles["comment-form__textarea"]}
        value={reviewInput}
        placeholder="댓글 수정"
        onChange={(e) => {
          setReviewInput(e.target.value);
        }}
      />
      <div className={styles["comment-form__buttons"]}>
        <Button
          reverseColor={true}
          borderRadius="8px"
          onClick={() => {
            setIsEditMode(false);
          }}
        >
          취소
        </Button>
        <Button type="submit" borderRadius="8px">
          완료
        </Button>
      </div>
    </form>
  );
};

export default ReviewEditForm;
