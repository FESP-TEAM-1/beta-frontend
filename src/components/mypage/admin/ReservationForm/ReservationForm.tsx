import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { Editor, DeleteButton, InputFieldRHF, DatePickerRHF } from "@/components/common";
import { formatDate, formatTime } from "@/utils";
import { DateWithTimeObj } from "@/types";
import styles from "./ReservationForm.module.css";

const formattingDateTime = (value: Date) => {
  const dateObject = new Date(value);
  const date = formatDate(dateObject);
  const time = formatTime(dateObject);
  return { date, time };
};

interface PropsType {
  roundList: DateWithTimeObj[];
  setRoundList: React.Dispatch<React.SetStateAction<DateWithTimeObj[]>>;
}

const ReservationForm: React.FC<PropsType> = ({ roundList, setRoundList }) => {
  const { getValues, setValue } = useFormContext();

  const handleAddRound = () => {
    const value = getValues("date_time");

    if (value) {
      const { date, time } = formattingDateTime(value);
      if (roundList.some((round) => round.date === date && round.time === time)) {
        toast.error("이미 추가된 회차입니다.");
        return;
      }
      setRoundList([...roundList, { id: `new${date}${time}`, date, time }]);
      setValue("date_time", null);
    }
  };

  const handleRemoveRound = ({ round: selectedRound }: { round: DateWithTimeObj }) => {
    setRoundList((prev) => prev.filter((round) => round !== selectedRound));
  };

  return (
    <div className={styles["reservation-form-wrapper"]}>
      <InputFieldRHF name="price" type="number" style={{ width: "200px" }} unit="원">
        가격
      </InputFieldRHF>
      <InputFieldRHF name="head_count" type="number" style={{ width: "200px" }} unit="명">
        총 수용 가능 인원
      </InputFieldRHF>
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
            <DeleteButton spanHidden="해당 회차 삭제" onClick={() => handleRemoveRound({ round })} />
          </article>
        ))}

        <article className={styles["round-item-add"]}>
          <div className={styles["round-item-add__dateTime"]}>
            <span className={styles["round-item__title"]}>날짜 및 시간</span>
            <DatePickerRHF type="dateWithTime" />
          </div>
          <button type="button" className={styles["round-item-add__btn"]} onClick={handleAddRound}>
            회차 추가
          </button>
        </article>
      </section>

      <section>
        <h4 className={styles["title-notice"]}>유의사항</h4>
        <Editor name="notice" />
      </section>
    </div>
  );
};

export default ReservationForm;
