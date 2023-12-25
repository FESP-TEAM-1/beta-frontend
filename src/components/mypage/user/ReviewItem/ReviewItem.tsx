import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { DeleteButton } from "@/components/common";
import getElapsedTime from "@/utils/getElapsedTime";
import isWithinOneDay from "@/utils/isWithinOneDay";
import { ReviewType } from "@/types";
import { deleteReview } from "@/apis";
import { queryClient } from "@/main";
import styles from "./ReviewItem.module.css";

const ReviewItem: React.FC<ReviewType> = (item) => {
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (review: { review_id: number; show_id: number }) => deleteReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userReviewList"],
      });
    },
  });

  const handleClickDeleteButton = (review_id: number, show_id: number) => {
    deleteMutate({ review_id, show_id });
  };

  const elapsedTime = getElapsedTime(item.created_at);
  const isNew = isWithinOneDay(item.created_at);

  return (
    <div className={styles["reviewItem-container"]}>
      <Link to={`/detail/${item.show_id}/review`} className={styles["reviewItem-box"]}>
        <div className={styles["reviewItem-section-top"]}>
          <strong className="ellipsis">{item.title}</strong>
          <span>@{item.login_id.slice(0, 3) + "***"}</span>
        </div>
        <div className={styles["reviewItem-section-bottom"]}>
          <span className="ellipsis">{item.comment}</span>
          <strong>{elapsedTime}</strong>
          {isNew && <div className={styles["new-circle"]}>N</div>}
        </div>
      </Link>
      <DeleteButton onClick={() => handleClickDeleteButton(item.id, item.show_id)} spanHidden="삭제" />
    </div>
  );
};

export default ReviewItem;
