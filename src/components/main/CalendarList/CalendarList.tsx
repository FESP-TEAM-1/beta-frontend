import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BasicCard } from "@/components/common";
import { getShowList } from "@/apis";
import styles from "./CalendarList.module.css";
import { ShowType } from "@/types";
import { CalendarSectionSkeleton } from "..";
import { CalendarFilters } from "../CalendarFilters/CalendarFilters";

interface PropsType {
  filters: CalendarFilters;
}

const CalendarList: React.FC<PropsType> = ({ filters }) => {
  const { status, data, error } = useQuery({
    queryKey: ["showDatas", filters],
    queryFn: async () => await getShowList(filters.category, filters.date, filters.date),
    select: (item) => item.slice(0, 7),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={styles["cards-container"]}>
        {status === "pending" && <CalendarSectionSkeleton />}
        {status === "error" && <>{error.message}</>}
        {data?.map((item: ShowType) => {
          return <BasicCard key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default CalendarList;
