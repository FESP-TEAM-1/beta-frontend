import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { BasicCard, NullField } from "@/components/common";
import { getShowList } from "@/apis";
import styles from "./ExhibitionListSection.module.css";

const ExhibitionListSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, status, error } = useQuery({
    queryKey: ["exhibitionData", searchParams.toString()],
    queryFn: async () => await getShowList("exhibition", searchParams.toString()),
    placeholderData: keepPreviousData,
  });

  if (status === "pending") return;
  if (status === "error") return <>{error.message}</>;

  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">전시 리스트</h2>
      {data.length > 0 ? (
        <ul className={styles["exhibition-list"]}>
          {data.map((item) => (
            <li key={item.id}>
              <BasicCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <NullField text1="조회한 날에 전시가 없습니다!" />
      )}
    </section>
  );
};

export default ExhibitionListSection;
