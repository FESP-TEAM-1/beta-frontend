import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TicketCard, NullField } from "@/components/common/";
import { getShowList } from "@/apis";
import { ShowFilterRequestType } from "@/types";
import styles from "./ConcertListSection.module.css";

interface PropsType {
  filterRequest: ShowFilterRequestType;
}

const ConcertListSection: React.FC<PropsType> = ({ filterRequest }) => {
  const { start_date, end_date, location, category, progress } = filterRequest;
  const { data, status, error } = useQuery({
    queryKey: ["concertData", filterRequest],
    queryFn: async () => await getShowList("concert", start_date, end_date, location, progress, category),
    placeholderData: keepPreviousData,
  });

  if (status === "pending") return;
  if (status === "error") return <>{error.message}</>;

  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">공연 리스트</h2>
      {data.length > 0 ? (
        <ul className={styles["concert-list"]}>
          {data.map((item) => (
            <li key={item.id}>
              <TicketCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <NullField text1="조회한 날에 공연이 없습니다!" />
      )}
    </section>
  );
};

export default ConcertListSection;
