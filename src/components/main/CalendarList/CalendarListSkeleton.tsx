import Skeleton from "react-loading-skeleton";
import styles from "./CalendarList.module.css";
import cardStyles from "@/components/common/BasicCard/BasicCard.module.css";

const CalendarListSkeleton = () => {
  return (
    <div className={styles["cards-container"]}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <article key={index} className={cardStyles.card}>
            <div style={{ height: "17.5rem", marginBottom: "1rem" }}>
              <Skeleton className={cardStyles["card__img"]} />
            </div>
            <Skeleton width={"50%"} height={"1.3rem"} style={{ marginBottom: "0.25rem" }} />
            <Skeleton width={"80%"} style={{ marginBottom: "0.25rem" }} />
            <Skeleton />
          </article>
        ))}
    </div>
  );
};

export default CalendarListSkeleton;
