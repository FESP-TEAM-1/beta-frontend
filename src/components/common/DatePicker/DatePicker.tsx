import React, { forwardRef, useImperativeHandle, useState } from "react";
import ko from "date-fns/locale/ko";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";
import { DateInputType } from "@/types";
import formattingDate from "@/utils/formattingDate";
import formattingTime from "@/utils/formattingTime";

interface PropsType {
  startDate?: string;
  endDate?: string;
  onChange: (event: DateInputType) => void;
  type: "period" | "dateWithTime";
}

const DatePicker: React.FC<PropsType> = forwardRef(({ startDate: defaultStartDate, endDate: defaultEndDate, onChange, type }, ref) => {
  const [startDate, setStartDate] = useState<Date | null>((defaultStartDate && new Date(defaultStartDate)) || null);
  const [endDate, setEndDate] = useState<Date | null>((defaultEndDate && new Date(defaultEndDate)) || null);

  // 날짜와 시간을 고르는 input
  const handleChangeDateWithTimeInput = (name: string, value: Date | null) => {
    if (value) {
      const dateObject = new Date(value);
      const date = formattingDate(dateObject);
      const time = formattingTime(dateObject);
      const event: DateInputType = { target: { name, value: { date, time } } };
      onChange(event);
      return;
    }
    onChange({ target: { name, value: { date: "", time: "" } } });
  };

  // 날짜만 고르는 input
  const handleChangePeriodInput = (name: string, value: Date | null) => {
    if (value) {
      const dateObject = new Date(value);
      const date = formattingDate(dateObject);
      const event: DateInputType = { target: { name, value: date } };
      onChange(event);
    }
    onChange({ target: { name, value: "" } });
  };

  // 부모에서 input 값 clear하기
  useImperativeHandle(ref, () => ({
    clearDatePicker: () => {
      setStartDate(null);
    },
  }));

  const CustomInput = forwardRef((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles["calendar-input-wrap"]}>
        <CalendarIcon />
        <input {...props} ref={ref} type="text" className={styles["calendar-input"]} />
      </div>
    );
  });

  switch (type) {
    case "dateWithTime": {
      return (
        <ReactDatePicker
          locale={ko}
          customInput={<CustomInput />}
          name="start_date_time"
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            handleChangeDateWithTimeInput("start_date_time", date);
          }}
          dateFormat="yyyy/MM/dd - aa h:mm"
          showTimeSelect
          placeholderText="날짜 및 시간"
          autoComplete="off"
          isClearable
        />
      );
    }

    case "period": {
      return (
        <>
          <div>
            <ReactDatePicker
              locale={ko}
              customInput={<CustomInput />}
              name="start_date"
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
                handleChangePeriodInput("start_date", date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="시작일"
              autoComplete="off"
              isClearable
            />
          </div>
          <span className={styles["wave"]}>~</span>
          <div>
            <ReactDatePicker
              locale={ko}
              customInput={<CustomInput />}
              name="end_date"
              selected={endDate}
              onChange={(date: Date) => {
                setEndDate(date);
                handleChangePeriodInput("end_date", date);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="종료일"
              autoComplete="off"
              isClearable
            />
          </div>
        </>
      );
    }

    default:
      return;
  }
});

export default DatePicker;
