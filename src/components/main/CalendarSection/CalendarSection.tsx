import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common";
import { CalendarFilters, CalendarList } from "..";
import { getTodayStringDate } from "@/utils";
import styles from "./CalendarSection.module.css";

const CalendarSection = () => {
  const navigate = useNavigate();
  const { todayString } = getTodayStringDate();
  const [filters, setFilters] = useState({ category: "concert", date: todayString });

  const handleClickMoreButton = () => {
    navigate(
      `${filters.category}?location=all&start_date=${todayString}&end_date=${todayString}&progress=1&date=오늘${
        filters.category === "concert" ? "&category=all" : ""
      }`,
    );
  };

  return (
    <section className={styles.section}>
      <h2 className="a11y-hidden">공연/전시</h2> {/* 스포츠 */}
      <CalendarFilters filters={filters} setFilters={setFilters} />
      <CalendarList filters={filters} />
      <Button onClick={handleClickMoreButton} reverseColor={true}>
        더보기
      </Button>
    </section>
  );
};

export default CalendarSection;
