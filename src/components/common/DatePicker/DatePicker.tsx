import React, { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";
import ReactDatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko'

interface PropsType {
  selected: Date | null;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  dateFormat?: string;
  showTimeSelect?: boolean;
  placeholderText?: string;
  onChange: (date: Date | null) => void;
}

const DatePicker: React.FC<PropsType> = (props) => {
  
    const CustomInput = forwardRef((props, ref: React.ForwardedRef<HTMLInputElement>) => {
      return (
        <div className={styles["calendar-input-wrap"]}>
          <CalendarIcon />
          <input {...props} ref={ref} type="text" className={styles["calendar-input"]} />
        </div>
      );
    });
  
    return (
      <ReactDatePicker
        locale={ko}
        customInput={<CustomInput />}
        autoComplete="off"
        isClearable
        {...props}
      />
    )
  };

export default DatePicker;