import { Carousel } from "@/components/common";
import Skeleton from "react-loading-skeleton";
import styles from "./Banner.module.css";

const BannerSkeleton = () => {
  return (
    <Carousel index={0}>
      {[1, 2].map((index) => (
        <div key={index}>
          <Skeleton className={styles["slider__img"]} />
        </div>
      ))}
    </Carousel>
  );
};

export default BannerSkeleton;
