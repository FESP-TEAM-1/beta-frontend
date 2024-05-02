import { useShowIdStore } from "@/stores";
import { useGetReviewListQuery } from "@/hooks";
import { NullField } from "@/components/common";
import { ReviewListItem } from "@/components/mypage";
import ReviewListSekelton from "./ReviewListSekelton";
import styles from "./ReviewList.module.css";

function ReviewList() {
  const { showId } = useShowIdStore();
  const { reviewList, reviewLisStatus, reviewListError } = useGetReviewListQuery(showId!);

  if (reviewLisStatus === "error") return <h1>{reviewListError?.message}</h1>;
  if (reviewLisStatus !== "success") return <ReviewListSekelton />;

  return (
    <>
      <strong className={styles["review-count"]}>총 후기수: {reviewList?.length || 0}명</strong>
      {reviewList?.length ? (
        <ul className={styles["review-list"]}>
          {reviewList.map((item) => (
            <li className={styles["review"]} key={item.id}>
              <ReviewListItem item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <NullField text1="아직 후기/방명록이 없어요!" text2="" />
      )}
    </>
  );
}

export default ReviewList;
