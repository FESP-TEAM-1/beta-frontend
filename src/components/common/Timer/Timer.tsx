import React, { useEffect, useState } from "react";
import { useInterval } from "@/hooks";
import styles from "./Timer.module.css";

interface PropsType {
  initialTime: number;
  isStop?: boolean;
  reset?: number;
  onTimeEnd?: () => void; // 타이머가 끝났을 때 실행할 콜백 함수
}

const Timer: React.FC<PropsType> = React.memo(({ initialTime, isStop, reset, onTimeEnd }) => {
  const [time, setTime] = useState(initialTime);

  useInterval(
    () => {
      if (time > 0 && !isStop) {
        setTime((prev) => prev - 1);
      } else if (time === 0) {
        onTimeEnd && onTimeEnd();
      }
    },
    isStop ? null : 1000,
  );

  useEffect(() => {
    if (reset) {
      setTime(initialTime);
    }
  }, [reset, initialTime]);

  return (
    <div className={styles["timer-container"]}>
      <div>
        <span>{String(Math.floor(time / 60)).padStart(2, "0")}</span>
        <span> : </span>
        <span>{String(time % 60).padStart(2, "0")}</span>
      </div>
    </div>
  );
});

export default Timer;
