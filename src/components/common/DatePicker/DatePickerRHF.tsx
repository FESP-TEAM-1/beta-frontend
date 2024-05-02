import React, { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ko from "date-fns/locale/ko";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";

interface PropsType {
  type: "period" | "dateWithTime";
}

const DatePickerRHF: React.FC<PropsType> = ({ type }) => {
  const { control } = useFormContext();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        <div>
          <Controller
            control={control}
            name="date_time"
            render={({ field: { onChange, value } }) => (
              <ReactDatePicker
                locale={ko}
                customInput={<CustomInput />}
                selected={value}
                dateFormat="yyyy/MM/dd - aa h:mm"
                showTimeSelect
                placeholderText="날짜 및 시간"
                autoComplete="off"
                isClearable
                onChange={(date: Date | null) => {
                  onChange(date);
                  setStartDate(date);
                }}
              />
            )}
          />
        </div>
      );
    }

    case "period": {
      return (
        <>
          <div>
            <Controller
              control={control}
              name="start_date"
              render={({ field: { onChange, value } }) => (
                <ReactDatePicker
                  locale={ko}
                  customInput={<CustomInput />}
                  selected={value}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="시작일"
                  autoComplete="off"
                  isClearable
                  onChange={(date) => {
                    onChange(date);
                    setStartDate(date);
                  }}
                />
              )}
            />
          </div>
          <span className={styles["wave"]}>~</span>
          <div>
            <Controller
              control={control}
              name="end_date"
              render={({ field: { onChange, value } }) => (
                <ReactDatePicker
                  locale={ko}
                  customInput={<CustomInput />}
                  selected={value}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="종료일"
                  autoComplete="off"
                  isClearable
                  onChange={(date) => {
                    onChange(date);
                    setEndDate(date);
                  }}
                />
              )}
            />
          </div>
        </>
      );
    }

    default:
      return;
  }
};

export default DatePickerRHF;
