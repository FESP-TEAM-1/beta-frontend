import Skeleton from "react-loading-skeleton";
import styles from "@/components/detail/InfoSection/InfoSection.module.css";

const InfoSkeleton = () => (
  <section>
    <Skeleton height={20} width="30%" style={{ margin: "0.2rem 0" }} />
    <Skeleton height={30} width="100%" />
    <Skeleton height={15} width="50%" style={{ margin: "0.2rem 0" }} />
    <Skeleton height={15} width="50%" />
    <ul className={styles["info-title__tags"]}>
      {Array.from({ length: 3 }).map((_item, index) => (
        <li key={index}>
          <Skeleton height={30} width="80px" style={{ borderRadius: "1rem" }} />
        </li>
      ))}
    </ul>
  </section>
);

const DescriptionSkeleton = () => (
  <section style={{ margin: "2rem 0" }}>
    <h3>
      <Skeleton height={20} width="20%" />
    </h3>
    <Skeleton width="100%" height={200} style={{ margin: "10px 0" }} />
  </section>
);

const LocationSkeleton = () => (
  <section>
    <Skeleton height={300} width="100%" style={{ margin: "10px 0" }} />
  </section>
);

const InfoSectionSkeleton = () => (
  <section style={{ margin: "1rem 0" }}>
    <InfoSkeleton />
    <DescriptionSkeleton />
    <LocationSkeleton />
  </section>
);

export default InfoSectionSkeleton;
