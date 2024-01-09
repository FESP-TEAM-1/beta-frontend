import Skeleton from "react-loading-skeleton";
import styles from "./ButtonGroup.module.css";

const ButtonGroupSkeleton = () => {
  return (
    <div className={styles["btn-group"]}>
      <div style={{ width: "100px" }}>
        <Skeleton height={40} />
      </div>
      <div style={{ width: "100px" }}>
        <Skeleton height={40} />
      </div>
    </div>
  );
};

export default ButtonGroupSkeleton;
