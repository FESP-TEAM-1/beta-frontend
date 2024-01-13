import React from "react";
import { FilterButton } from "@/components/common";
import { CalendarDateButton } from "..";
import { getStringDate, getTodayStringDate } from "@/utils";
import classNames from "classnames/bind";
import styles from "./CalendarFilters.module.css";

const cx = classNames.bind(styles);
const tabsInfo = [
  { url: "concert", value: "공연" },
  { url: "exhibition", value: "전시" },
  // { url: "sports", value: "스포츠" },
];

export interface CalendarFilters {
  category: string;
  date: string;
}
interface PropsType {
  filters: CalendarFilters;
  setFilters: React.Dispatch<React.SetStateAction<CalendarFilters>>;
}

const CalendarFilters: React.FC<PropsType> = ({ filters, setFilters }) => {
  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();

  return (
    <>
      <div className={cx("date-btns-group", "no-scroll")}>
        {Array(14)
          .fill(0)
          .map((_item, index) => {
            const { dateString, dayOfWeek } = getStringDate(todayYear, todayMonth, todayDay + index);
            return (
              <CalendarDateButton
                key={dateString}
                onClick={() => setFilters({ ...filters, date: dateString })}
                today={todayString === dateString}
                selected={filters.date === dateString}
                date={dateString}
                dayOfWeek={dayOfWeek}
              />
            );
          })}
      </div>
      <div className={cx("tabs", "no-scroll")}>
        {tabsInfo.map(({ url, value }) => (
          <FilterButton key={value} selected={filters.category === url} onClick={() => setFilters({ ...filters, category: url })}>
            {value}
          </FilterButton>
        ))}
      </div>
    </>
  );
};

export default CalendarFilters;
