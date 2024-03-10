import React, { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";

const DatePicker = React.lazy(async () => {
  const [{ default: ReactDatePicker }, { default: ko }] = await Promise.all([import("react-datepicker"), import("date-fns/locale/ko")]);

  const CustomInput = forwardRef((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles["calendar-input-wrap"]}>
        <CalendarIcon />
        <input {...props} ref={ref} type="text" className={styles["calendar-input"]} />
      </div>
    );
  });

  return {
    default: (props) => (
      <ReactDatePicker
        locale={ko}
        customInput={<CustomInput />}
        autoComplete="off"
        isClearable
        {...props}
      />
    ),
  };
});

interface PropsType {
  type: "period" | "dateWithTime";
}

const DatePickerRHF: React.FC<PropsType> = ({ type }) => {
  const { control } = useFormContext();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  switch (type) {
    case "dateWithTime": {
      return (
        <div>
          <Controller
            control={control}
            name="date_time"
            render={({ field: { onChange, value } }) => (
              <DatePicker 
                selected={value}
                dateFormat="yyyy/MM/dd - aa h:mm"
                showTimeSelect
                placeholderText="날짜 및 시간" 
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
              render={({ field: { onChange: onChangeStartDate, value } }) => (
                <DatePicker
                  selected={value}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="시작일"
                  onChange={(date: Date | null) => {
                    onChangeStartDate(date);
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
              render={({ field: { onChange: onChangeEndDate, value } }) => (
                <DatePicker
                  selected={value}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="종료일"
                  onChange={(date: Date | null) => {
                    onChangeEndDate(date);
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
