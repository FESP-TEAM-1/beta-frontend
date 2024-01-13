import { useState } from "react";
import { toast } from "react-toastify";
import { FilterButton, SelectBox } from "@/components/common";
import { ShowFilterRequestType } from "@/types";
import { getTodayStringDate, getStringDate } from "@/utils";
import { useFilterSlide } from "@/hooks";
import classNames from "classnames/bind";
import styles from "./Filters.module.css";

const cx = classNames.bind(styles);

const dates = ["오늘", "+7일", "+2주", "직접선택"];
const locations = [
  "전체",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];
const categories = ["전체", "음악", "연극", "기타"];
const progresses = ["전체", "진행중", "진행 예정", "종료"];

interface PropsType {
  filterRequest: ShowFilterRequestType;
  setFilterRequest: React.Dispatch<React.SetStateAction<ShowFilterRequestType>>;
}

const Filters: React.FC<PropsType> = ({ filterRequest, setFilterRequest }) => {
  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();
  const {
    scrollRef: locationScrollRef,
    scrollValue: locationScrollValue,
    handleClickPrev: handleClickLocationPrev,
    handleClickNext: handleClickLocationNext,
  } = useFilterSlide();

  const [filter, setFilter] = useState({
    date: "오늘",
    location: "전체",
    category: "전체",
    progress: "전체",
  });

  const isEndDateAfterStartDate = (startDate: string, endDate: string) => {
    const start_date = new Date(startDate).getTime();
    const end_date = new Date(endDate).getTime();

    if (end_date >= start_date) {
      return true;
    } else return false;
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "end_date" && !isEndDateAfterStartDate(filterRequest.start_date, value)) {
      toast.warn("시작날짜보다 끝나는 날짜가 앞설 수 없습니다. 날짜를 다시 설정해주세요.");
      return;
    }

    setFilterRequest((prev) => ({ ...prev, [name]: value }));
  };

  // 서버에 보낼 start_date와 end_date를 set하는 함수
  const dateSetFunc = (value: string) => {
    let dateString = todayString;
    setFilterRequest((prev) => ({ ...prev, start_date: dateString }));

    switch (value) {
      case dates[1]:
        ({ dateString } = getStringDate(todayYear, todayMonth, todayDay + 7));
        break;
      case dates[2]:
        ({ dateString } = getStringDate(todayYear, todayMonth, todayDay + 14));
        break;
      default:
        break;
    }
    setFilterRequest((prev) => ({ ...prev, end_date: dateString }));
  };

  // progress를 all, 1, 2, 3으로 set하는 함수
  const progressSetFunc = (value: string) => {
    let progressStatus = progresses.indexOf(value).toString();
    if (progressStatus === "0") {
      progressStatus = "all";
    }
    setFilterRequest({ ...filterRequest, progress: progressStatus });
  };

  // date, progress를 제외한 나머지 항목 set하는 함수
  const etcSetFunc = (name: string, value: string) => {
    if (value === "전체") {
      setFilterRequest({ ...filterRequest, [name]: "all" });
      return;
    }
    setFilterRequest({ ...filterRequest, [name]: value });
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
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>날짜</strong>

        <div className={styles["filter-contents"]}>
          {dates.map((item) => (
            <FilterButton key={item} selected={filter.date === item} onClick={handleClickFilterButton} name={"date"}>
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className={cx("date-select-container", filter.date === "직접선택" && "show")}>
        <label>
          <p className="a11y-hidden">시작일</p>
          <input className={styles["date-input"]} type="date" name="start_date" value={filterRequest.start_date} onChange={handleChangeDate} />
        </label>
        <label>
          <p className={"a11y-hidden"}>종료일</p>
          <input className={styles["date-input"]} type="date" name="end_date" value={filterRequest.end_date} onChange={handleChangeDate} />
        </label>
      </div>

      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>지역</strong>
        <div className={styles["location-filter-contents"]}>
          <div className={cx("arrow", "prev")} onClick={handleClickLocationPrev}></div>
          <div className={cx("arrow", "next")} onClick={handleClickLocationNext}></div>
          <ul ref={locationScrollRef} style={{ transform: `translateX(${locationScrollValue})` }}>
            {locations.map((item) => (
              <li key={item}>
                <FilterButton name={"location"} selected={filter.location === item} onClick={handleClickFilterButton}>
                  {item}
                </FilterButton>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {location.pathname === "/concert" && (
        <div className={styles["filter-row"]}>
          <strong className={styles["filter-row__title"]}>카테고리</strong>
          <div className={styles["filter-contents"]}>
            {categories.map((item) => (
              <FilterButton key={item} selected={filter.category === item} onClick={handleClickFilterButton} name={"category"}>
                {item}
              </FilterButton>
            ))}
          </div>
        </div>
      )}

      <div className={styles["filter-row-select"]}>
        <SelectBox options={progresses} name={"progress"} onClick={handleClickFilterButton} selectedValue={filter.progress} />
      </div>
    </>
  );
};

export default Filters;
