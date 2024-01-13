import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal, NullField } from "@/components/common";
import { ReservationItem, ReservationUserModal } from "@/components/mypage";
import getUserReservationList from "@/apis/reservation/getUserReservationList";
import { useModalStore } from "@/stores";
import { UserReservationInfoType } from "@/types";
import styles from "./ReservationManagePage.module.css";

const ReservationManagePage = () => {
  const { openModal, setOpenModal } = useModalStore();
  const [selectedItem, setSelectedItem] = useState<UserReservationInfoType | null>(null);

  const modalOpen = (item: UserReservationInfoType) => {
    setSelectedItem(item); // 선택된 item 설정
    setOpenModal({ state: true, type: "" });
  };

  const {
    status,
    error,
    data: userReservationList,
  } = useQuery({
    queryKey: ["userReservationList"],
    queryFn: () => getUserReservationList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <>
      {userReservationList.length === 0 ? (
        <NullField text1="예매 내역이 없습니다." text2="" />
      ) : (
        <>
          <div className={styles["reservation-container"]}>
            {userReservationList.map((item) => (
              <ReservationItem key={item.id} {...item} modalOpen={() => modalOpen(item)} />
            ))}
          </div>
          {openModal.state && (
            <Modal title="예매 정보" width="600px">
              {selectedItem && <ReservationUserModal item={selectedItem} />}
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ReservationManagePage;
