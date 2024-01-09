import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectBox } from "@/components/common";
import { UserReservation } from "@/apis/reservation/getAdminReservationDetail";
import { getAdminReservationDetail } from "@/apis/";
import classNames from "classnames/bind";
import styles from "./ReservationListModal.module.css";
const cx = classNames.bind(styles);

interface PropsType {
  id: number | null;
}

const ReservationListModal: React.FC<PropsType> = ({ id }) => {
  const [selectedDateTime, setSelectedDateTime] = useState("전체");
  const [userList, setUserList] = useState<UserReservation[] | []>([]);

  const { data, status, error } = useQuery({
    queryKey: ["reservationList", id],
    queryFn: () => getAdminReservationDetail(id!),
  });

  useEffect(() => {
    setSelectedDateTime("전체");
    data && setUserList(data.user_reservation);
  }, [data]);

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  const show_times = data.show_times.map((item) => item.date_time);
  const dateTimeOptions = ["전체", ...show_times];

  const handleClickDateTimeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).textContent!;
    if (value === "전체") {
      setUserList(data.user_reservation);
    } else {
      const index = data.show_times.findIndex((item) => item.date_time === value);
      const showTimeId = data.show_times[index].id;
      const user_list = data.user_reservation.filter((item) => item.show_times_id === showTimeId);
      setUserList(user_list);
    }
    setSelectedDateTime(value);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["top-section"]}>
        <SelectBox options={dateTimeOptions} onClick={handleClickDateTimeSelect} selectedValue={selectedDateTime} />
        <strong className={styles["person"]}>
          총 인원: {userList.length}/{data.show_reservation_info[0].head_count}명
        </strong>
      </div>
      <div className={cx("list-section", "gray-scrollbar")}>
        <div className={cx("list-row", "list-header")}>
          <strong>이름</strong>
          <strong>핸드폰번호</strong>
          <strong>이메일</strong>
          <strong>예매날짜</strong>
        </div>
        <ul>
          {userList.map((item) => (
            <li key={item.id} className={cx("list-row", "list-item")}>
              <strong>{item.user_name}</strong>
              <strong>{item.phone_number}</strong>
              <strong>{item.user_email}</strong>
              <strong>
                {new Date(item.created_at).toLocaleString("ko-Kr", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationListModal;
