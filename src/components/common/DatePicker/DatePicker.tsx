import React, { forwardRef } from "react";
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

export default DatePicker;