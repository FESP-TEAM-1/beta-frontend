import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ko from "date-fns/locale/ko";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";
import { DateInputType } from "@/types";
import { formatDate, formatTime } from "@/utils";

export interface DatePickerRef {
  clearDatePicker: () => void;
}

interface PropsType {
  startDate?: string;
  endDate?: string;
  onChange: (event: DateInputType) => void;
  type: "period" | "dateWithTime";
}

const DatePicker: React.ForwardRefRenderFunction<DatePickerRef, PropsType> = (
  { startDate: defaultStartDate, endDate: defaultEndDate, onChange, type },
  forwardedRef,
) => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const [startDate, setStartDate] = useState<Date | null>((defaultStartDate && new Date(defaultStartDate)) || null);
  const [endDate, setEndDate] = useState<Date | null>((defaultEndDate && new Date(defaultEndDate)) || null);

  useEffect(() => {
    setStartDate((defaultStartDate && new Date(defaultStartDate)) || null);
    setEndDate((defaultEndDate && new Date(defaultEndDate)) || null);
  }, [defaultStartDate, defaultEndDate]);

  // 날짜와 시간을 고르는 input
  const handleChangeDateWithTimeInput = (name: string, value: Date | null) => {
    if (value) {
      const dateObject = new Date(value);
      const date = formatDate(dateObject);
      const time = formatTime(dateObject);
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
      const date = formatDate(dateObject);
      const event: DateInputType = { target: { name, value: date } };
      onChange(event);
      return;
    }
    onChange({ target: { name, value: "" } });
  };

  // 부모에서 input 값 clear하기
  useImperativeHandle(forwardedRef, () => ({
    clearDatePicker: () => setStartDate(null),
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
          ref={datePickerRef}
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
              onChange={(date: Date | null) => {
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
              onChange={(date: Date | null) => {
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
};

export default forwardRef(DatePicker);
