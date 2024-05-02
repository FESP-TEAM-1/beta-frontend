import { DeleteButton } from "@/components/common";
import { getElapsedTime } from "@/utils";
import { ReviewType } from "@/types";
import { useDeleteReviewQuery } from "@/hooks";
import { useShowIdStore } from "@/stores";
import styles from "./ReviewListItem.module.css";

interface PropsType {
  item: ReviewType;
}

const ReviewListItem: React.FC<PropsType> = ({ item }) => {
  const { showId } = useShowIdStore();
  const { deleteMutate } = useDeleteReviewQuery(showId!);

  const handleClickDelete = (item: ReviewType) => () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const { id: review_id, show_id } = item;
      deleteMutate({ review_id, show_id });
    }
  };

  return (
    <>
      <div className={styles["review-contents"]}>
        <strong className={styles["review__nickname"]}>{item.login_id.slice(0, 3) + "***"}</strong>
        <p className={styles["review__content"]}>{item.comment}</p>
        <span className={styles["review__date"]}>{getElapsedTime(item.created_at)}</span>
      </div>
      <DeleteButton spanHidden="해당 댓글 삭제" onClick={handleClickDelete(item)} />
    </>
  );
};

export default ReviewListItem;
