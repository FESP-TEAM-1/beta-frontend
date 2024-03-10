import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "./DatePicker";

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
          <span style={{display: "block", margin: "auto 0"}}>~</span>
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
