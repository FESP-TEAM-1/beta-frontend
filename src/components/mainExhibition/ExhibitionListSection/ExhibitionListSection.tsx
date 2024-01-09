import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { BasicCard, NullField } from "@/components/common";
import { getShowList } from "@/apis";
import { ShowFilterRequestType } from "@/types";
import styles from "./ExhibitionListSection.module.css";

interface PropsType {
  filterRequest: ShowFilterRequestType;
}

const ExhibitionListSection: React.FC<PropsType> = ({ filterRequest }) => {
  const { start_date, end_date, location, progress } = filterRequest;
  const { data, status, error } = useQuery({
    queryKey: ["exhibitionData", filterRequest],
    queryFn: async () => await getShowList("exhibition", start_date, end_date, location, progress),
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
        <NullField text1="조회한 날에 공연이 없습니다!" />
      )}
    </section>
  );
};

export default ExhibitionListSection;
