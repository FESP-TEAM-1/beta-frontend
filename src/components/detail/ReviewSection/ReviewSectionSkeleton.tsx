import Skeleton from "react-loading-skeleton";
import styles from "@/components/detail/ReviewSection/ReviewSection.module.css";

const ReviewSectionSkeleton = () => {
  return (
    <>
      <section className={styles["review-upload-section"]}>
        {/* <Skeleton height={60} width="100%" style={{ marginBottom: "1rem" }}/> */}
        <Skeleton height={50} width="100%" />
      </section>

      <section className={styles["review-list-section"]}>
        <Skeleton height={35} width="25%" style={{ marginBottom: "1rem" }} />
        <ul>
          {[1, 2, 3].map((index) => (
            <li key={index} style={{ display: "flex", gap: "1rem", margin: "0.5rem 0" }}>
              <Skeleton circle height={40} width={40} />
              <div style={{ width: "100%" }}>
                <Skeleton height={40} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReviewSectionSkeleton;
