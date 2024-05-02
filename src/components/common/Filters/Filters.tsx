import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { toast } from "react-toastify";
import { FilterButton, SelectBox } from "@/components/common";
import { getTodayStringDate, getStringDate, checkIsEndDateAfterStartDate, DATES, LOCATIONS, CONCERT_CATEGORIES, PROGRESSES } from "@/utils";
import { useFilterSlide } from "@/hooks";
import classNames from "classnames/bind";
import styles from "./Filters.module.css";

interface FilterType {
  [key: string]: string;
}
const cx = classNames.bind(styles);

const Filters: React.FC = () => {
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const queries = queryString.parse(searchParams.toString());

  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();
  const {
    scrollRef: locationScrollRef,
    scrollValue: locationScrollValue,
    handleClickPrev: handleClickLocationPrev,
    handleClickNext: handleClickLocationNext,
  } = useFilterSlide();

  const [filter, setFilter] = useState<FilterType>({});

  useEffect(() => {
    const date = (queries.date as string) || "오늘";
    const start_date = (queries.start_date as string) || todayString;
    const end_date = (queries.end_date as string) || todayString;
    const location = (queries.location as string) || "all";
    const category = (queries.category as string) || "all";
    const progress = (queries.progress as string) || "1";

    setFilter({
      date,
      start_date,
      end_date,
      location: location === "all" ? "전체" : location,
      category: category === "all" ? "전체" : category,
      progress: progress === "all" ? "전체" : PROGRESSES[Number(progress)],
    });
  }, [searchParams]);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDate = () => {
    const { start_date, end_date } = filter;

    if (!checkIsEndDateAfterStartDate(start_date, end_date)) {
      toast.warn("시작날짜보다 끝나는 날짜가 앞설 수 없습니다. 날짜를 다시 설정해주세요.");
      return;
    }

    searchParams.set("start_date", start_date);
    searchParams.set("end_date", end_date);
    setSearchParams(searchParams);
  };

  // 서버에 보낼 start_date와 end_date를 set하는 함수
  const dateSetFunc = (value: string) => {
    let dateString = todayString;

    switch (value) {
      case DATES[1]:
        ({ dateString } = getStringDate(todayYear, todayMonth, todayDay + 7));
        break;
      case DATES[2]:
        ({ dateString } = getStringDate(todayYear, todayMonth, todayDay + 14));
        break;
      default:
        break;
    }
    searchParams.set("date", value);
    searchParams.set("start_date", dateString);
    searchParams.set("end_date", dateString);
    setSearchParams(searchParams);
  };

  // progress를 all, 1, 2, 3으로 set하는 함수
  const progressSetFunc = (value: string) => {
    let progressStatus = PROGRESSES.indexOf(value).toString();
    if (progressStatus === "0") {
      progressStatus = "all";
    }

    searchParams.set("progress", progressStatus);
    setSearchParams(searchParams);
  };

  // date, progress를 제외한 나머지 항목 set하는 함수
  const etcSetFunc = (name: string, value: string) => {
    searchParams.set(name, value === "전체" ? "all" : value);
    setSearchParams(searchParams);
  };

  // FilterButton을 눌렀을 때 동작하는 함수
  const handleClickFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, textContent: value } = e.target as HTMLButtonElement;
    if (name === "date") {
      dateSetFunc(value!);
    } else if (name === "progress") {
      progressSetFunc(value!);
    } else {
      etcSetFunc(name, value!);
    }
  };

  return (
    <>
      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>날짜</strong>

        <div className={styles["filter-contents"]}>
          {DATES.map((item: string) => (
            <FilterButton key={item} selected={filter.date === item} onClick={handleClickFilterButton} name={"date"}>
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className={cx("date-select-container", filter.date === "직접선택" && "show")}>
        <label>
          <p className="a11y-hidden">시작일</p>
          <input
            className={styles["date-input"]}
            type="date"
            name="start_date"
            onChange={handleChangeDate}
            value={filter.start_date || todayString}
          />
        </label>
        <label>
          <p className={"a11y-hidden"}>종료일</p>
          <input className={styles["date-input"]} type="date" name="end_date" onChange={handleChangeDate} value={filter.end_date || todayString} />
        </label>
        <FilterButton onClick={handleSubmitDate} selected={true}>
          적용
        </FilterButton>
      </div>

      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>지역</strong>
        <div className={styles["location-filter-contents"]}>
          <div className={cx("arrow", "prev")} onClick={handleClickLocationPrev}></div>
          <div className={cx("arrow", "next")} onClick={handleClickLocationNext}></div>
          <ul ref={locationScrollRef} style={{ transform: `translateX(${locationScrollValue})` }}>
            {LOCATIONS.map((item: string) => (
              <li key={item}>
                <FilterButton name={"location"} selected={filter.location === item} onClick={handleClickFilterButton}>
                  {item}
                </FilterButton>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pathname === "/concert" && (
        <div className={styles["filter-row"]}>
          <strong className={styles["filter-row__title"]}>카테고리</strong>
          <div className={styles["filter-contents"]}>
            {CONCERT_CATEGORIES.map((item: string) => (
              <FilterButton key={item} selected={filter.category === item} onClick={handleClickFilterButton} name={"category"}>
                {item}
              </FilterButton>
            ))}
          </div>
        </div>
      )}

      <div className={styles["filter-row-select"]}>
        <SelectBox options={PROGRESSES} name={"progress"} onClick={handleClickFilterButton} selectedValue={filter.progress} />
      </div>
    </>
  );
};

export default Filters;
