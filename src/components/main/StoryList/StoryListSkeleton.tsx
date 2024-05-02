import { Carousel } from "@/components/common";
import Skeleton from "react-loading-skeleton";
import styles from "@/components/main/StoryCard/StoryCard.module.css";

const StoryListSkeleton = () => {
  return (
    <Carousel index={1}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div className={styles.card} key={index}>
            <div className={styles["card__img-wrapper"]}>
              <Skeleton className={styles["card__img"]} style={{ boxSizing: "border-box" }} />
            </div>
          </div>
        ))}
    </Carousel>
  );
};

export default StoryListSkeleton;
