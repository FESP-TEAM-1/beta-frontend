import React, { useRef, useState } from "react";
import { DatePicker, Editor, InputField, DeleteButton } from "@/components/common";
import styles from "./ReservationForm.module.css";
import { DateInputType, DateWithTimeObj } from "@/types";
import { toast } from "react-toastify";
import { type DatePickerRef } from "@/components/common/DatePicker/DatePicker";

interface PropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  roundList: DateWithTimeObj[];
  setRoundList: React.Dispatch<React.SetStateAction<DateWithTimeObj[]>>;
  editorNoticeData: string;
  setEditorNoticeData: React.Dispatch<React.SetStateAction<string>>;
}

const ReservationForm: React.FC<PropsType> = ({ form, onChange, roundList, setRoundList, editorNoticeData, setEditorNoticeData }) => {
  const datePickerInputRef = useRef<DatePickerRef | null>(null);
  const [dateTime, setDateTime] = useState({
    id: "",
    date: "",
    time: "",
  });

  const handleDateTimeInput = (event: DateInputType) => {
    if (event.target.value && typeof event.target.value === "object") {
      const { date, time } = event.target.value;
      setDateTime({ id: `new${date}${time}`, date, time });
    }
  };

  const handleRoundAdd = () => {
    if (dateTime.date && dateTime.time) {
      if (roundList.some((round) => round.date === dateTime.date && round.time === dateTime.time)) {
        toast("이미 추가된 회차입니다.");
        return;
      }
      setRoundList([...roundList, dateTime]);
      (datePickerInputRef.current as DatePickerRef).clearDatePicker();
    }
  };

  const handleRoundRemove = ({ round: removeRound }: { round: DateWithTimeObj }) => {
    setRoundList((prev) => prev.filter((round) => round !== removeRound));
  };

  return (
    <div className={styles["reservation-form-wrapper"]}>
      <InputField type="number" name="price" value={form.price as number} onChange={onChange} style={{ width: "200px" }} unit="원">
        가격
      </InputField>
      <InputField type="number" name="head_count" value={form.head_count as number} onChange={onChange} style={{ width: "200px" }} unit="명">
        총 수용 가능 인원
      </InputField>
      <section className={styles["round-list"]}>
        <h4 className={styles["title"]}>회차</h4>
        {roundList.map((round, index) => (
          <article key={index} className={styles["round-item"]}>
            <div className={styles["round-item__box"]}>
              <div className={styles["round-item__box-row"]}>
                <span className={styles["round-item__title"]}>날짜</span>
                <span className={styles["round-item__content"]}>{round.date}</span>
              </div>
              <div className={styles["round-item__box-row"]}>
                <span className={styles["round-item__title"]}>시간</span>
                <span className={styles["round-item__content"]}>{round.time}</span>
              </div>
            </div>
            <DeleteButton spanHidden="해당 회차 삭제" onClick={() => handleRoundRemove({ round })} />
          </article>
        ))}

        <article className={styles["round-item-add"]}>
          <div className={styles["round-item-add__dateTime"]}>
            <span className={styles["round-item__title"]}>날짜 및 시간</span>
            <DatePicker type="dateWithTime" onChange={handleDateTimeInput} ref={datePickerInputRef} />
          </div>
          <button type="button" className={styles["round-item-add__btn"]} onClick={handleRoundAdd}>
            회차 추가
          </button>
        </article>
      </section>

      <section>
        <h4 className={styles["title"]}>유의사항</h4>
        <Editor editorData={editorNoticeData} setEditorData={setEditorNoticeData} />
      </section>
    </div>
  );
};

export default ReservationForm;
