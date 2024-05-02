import Skeleton from "react-loading-skeleton";
import itemStyles from "../ReviewListItem/ReviewListItem.module.css";
import styles from "./ReviewList.module.css";

const ReviewListItemSkeleton = () => {
  return (
    <>
      <div className={itemStyles["review-contents"]}>
        <Skeleton height={"0.7rem"} width={120} />
        <div style={{ marginTop: "0.625rem" }}>
          <Skeleton height={"0.875rem"} width={"100%"} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div>
            <Skeleton height={"0.75rem"} width={100} />
          </div>
        </div>
      </div>
      <div style={{ width: "2rem", height: "2rem" }}></div>
    </>
  );
};

const ReviewListSekelton = () => {
  return (
    <>
      <div className={styles["review-count"]}>
        <Skeleton width={200} height={"100%"} />
      </div>
      <ul className={styles["review-list"]}>
        <div className={styles["review"]}>
          <ReviewListItemSkeleton />
        </div>
      </ul>
    </>
  );
};

export default ReviewListSekelton;
