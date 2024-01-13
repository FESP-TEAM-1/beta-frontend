import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalStore } from "@/stores";
import { Button, Modal, NullField } from "@/components/common";
import { ReservationListModal } from "@/components/mypage";
import { getAdminReservationList } from "@/apis/";
import styles from "./ReservationManagePage.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ReservationManagePage = () => {
  const { openModal, setOpenModal } = useModalStore();
  const [clickedId, setClickedShowId] = useState<number | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const { data, status, error } = useQuery({
    queryKey: ["reservationList"],
    queryFn: () => getAdminReservationList(),
    select: (list) => list.filter((item) => item.is_reservation === 1),
  });

  const handleClickDetailBtn = (id: number, title: string) => () => {
    setClickedShowId(id);
    setModalTitle(title);
    setOpenModal({ state: true, type: "list" });
  };

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <>
      <ul className={cx("list-container", "gray-scrollbar")}>
        {data.length ? (
          data.map((item, index) => (
            <li key={index} className={styles["list-item"]}>
              <div>
                <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
                <p className={styles["list-item__date"]}>
                  {item.start_date} ~ {item.end_date}
                </p>
              </div>
              <Button reverseColor={true} onClick={handleClickDetailBtn(item.id, item.title)}>
                예매 현황
              </Button>
            </li>
          ))
        ) : (
          <NullField text1="예매가 필요한 게시글이 없어요!" text2="BETA의 예매 서비스를 이용해 보세요" />
        )}
      </ul>

      {openModal.state && openModal.type === "list" && (
        <Modal title={modalTitle}>
          <ReservationListModal id={clickedId} />
        </Modal>
      )}
    </>
  );
};

export default ReservationManagePage;
