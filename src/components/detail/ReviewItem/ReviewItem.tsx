import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { ReviewEditForm } from "..";
import EllipsisProfileImg from "@/assets/ellipsis-profile.svg?react";
import IconEllipsisVertical from "@/assets/icon-ellipsis-vertical.png";
import { ReviewDeleteParamType, ReviewType } from "@/types";
import { useLoginStore } from "@/stores";
import { getElapsedTime } from "@/utils";
import { deleteUserReview } from "@/apis";
import styles from "./ReviewItem.module.css";

interface PropsType {
  item: ReviewType;
  clickedReviewId: number | null;
  setClickedReviewId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ReviewItem: React.FC<PropsType> = ({ item, clickedReviewId, setClickedReviewId }) => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const { id: show_id } = useParams();
  const {
    userState: { login_id },
  } = useLoginStore();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (review: ReviewDeleteParamType) => deleteUserReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviewData", show_id],
      });
    },
  });

  const handleClickDelete = (item: ReviewType) => () => {
    const { id: review_id, show_id } = item;
    deleteMutate({ review_id, show_id });
  };

  return (
    <div className={styles["review"]}>
      <div className={styles["review-content-top"]}>
        <div className={styles["review__userinfo"]}>
          <div className={styles["profile-img-cover"]}>
            <EllipsisProfileImg />
          </div>
          <strong className={styles["username"]}>{item.login_id.slice(0, 3) + "***"}</strong>
        </div>
        <span className={styles["review__created-at"]}>{getElapsedTime(item.created_at)}</span>
      </div>
      {!isEditMode && <h4 className={styles["review__text"]}>{item.comment}</h4>}
      {isEditMode && <ReviewEditForm item={item} setIsEditMode={setIsEditMode} />}

      <>
        {login_id === item.login_id && (
          <button
            type="button"
            onClick={() => setClickedReviewId(item.id)}
            onBlur={() => setClickedReviewId(null)}
            className={styles["review__ellipsis"]}
          >
            <img src={IconEllipsisVertical} />
          </button>
        )}
        {clickedReviewId === item.id && (
          <div className={styles["review__button-list"]}>
            <button
              type="button"
              onMouseDown={() => {
                setIsEditMode(true);
              }}
            >
              수정
            </button>
            <button type="button" onMouseDown={handleClickDelete(item)}>
              삭제
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default ReviewItem;
