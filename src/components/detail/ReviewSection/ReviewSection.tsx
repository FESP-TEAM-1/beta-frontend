import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, NullField } from "@/components/common";
import { ReviewItem, ReviewForm, ReviewSectionSkeleton } from "@/components/detail";
import { useModalStore, useLoginStore } from "@/stores";
import { getReviewList } from "@/apis";
import styles from "./ReviewSection.module.css";

const ReviewSection = () => {
  const { id: show_id } = useParams();
  const [clickedReviewId, setClickedReviewId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const {
    userState: { user_role },
  } = useLoginStore();
  const { setOpenModal } = useModalStore();

  const {
    data: reviewData,
    status,
    error,
  } = useQuery({
    queryKey: ["reviewData", show_id],
    queryFn: () => (show_id ? getReviewList(show_id) : []),
    select: (item) => ({ reviews: item.slice(0, page * 5), totalCounts: item.length }),
  });

  if (status === "pending") return <ReviewSectionSkeleton />;
  if (status === "error") return <>{error.message}</>;

  return (
    <>
      <section className={styles["review-upload-section"]}>
        {user_role === "user" ? (
          <ReviewForm />
        ) : (
          <Button onClick={() => setOpenModal({ state: true, type: "guestAccess" })}>
            <h3>방명록 작성하기</h3>
          </Button>
        )}
      </section>

      <section className={styles["review-list-section"]}>
        <h3 className={styles["review-list-section__title"]}>{reviewData.totalCounts}명 참여</h3>
        <ul>
          {reviewData.reviews.length ? (
            reviewData.reviews.map((reviewItem) => (
              <li key={reviewItem.id}>
                <ReviewItem item={reviewItem} clickedReviewId={clickedReviewId} setClickedReviewId={setClickedReviewId} />
              </li>
            ))
          ) : (
            <NullField text1="아직 후기/방명록이 없어요!" text2="응원의 한마디를 남겨주시면 어떨까요?" />
          )}
        </ul>
        {page * 5 < reviewData.totalCounts && (
          <Button
            reverseColor
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            더보기
          </Button>
        )}
      </section>
    </>
  );
};

export default ReviewSection;
