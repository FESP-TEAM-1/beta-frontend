import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LikeButton, ReservationModal } from "@/components/detail";
import { Button, Modal, UserAccessModal } from "@/components/common";
import { useLoginStore, useModalStore } from "@/stores";
import { ShowReservationInfoType, ShowType } from "@/types";
import { useLike } from "@/hooks";
import { checkIsNotUser } from "@/utils";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = () => {
  const queryClient = useQueryClient();
  const { id: showId } = useParams();
  const { likeMutate, deleteLikeMutate } = useLike(showId!);
  const {
    userState: { login_id },
  } = useLoginStore();

  const infoData = queryClient.getQueryData<ShowType>(["infoData", showId, login_id])!;
  const reservationData = queryClient.getQueryData<ShowReservationInfoType>(["reservationData", showId])!;

  const {
    userState: { user_role },
  } = useLoginStore();

  const { openModal, setOpenModal } = useModalStore();

  const handleLikeButtonClick = () => {
    if (checkIsNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }

    if (infoData?.user_liked) {
      deleteLikeMutate();
    } else if (!infoData?.user_liked) {
      likeMutate();
    }
  };

  const handleReservationButtonClick = async () => {
    if (reservationData?.method === "google") {
      window.open(reservationData.google_form_url!, "_blank");
      return;
    }

    if (checkIsNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }
    if (infoData?.user_reserved === 1) {
      toast.info("이미 예매한 공연/전시입니다");
      return;
    }

    setOpenModal({ state: true, type: "reservation" });
  };

  return (
    <>
      <div className={styles["btn-group"]}>
        <LikeButton active={infoData.user_liked === 1 && true} onClick={handleLikeButtonClick} />
        {infoData.is_reservation === 1 && (
          <Button borderRadius="0.5rem" onClick={handleReservationButtonClick}>
            예매하기
          </Button>
        )}
      </div>
      {openModal.state && openModal.type === "reservation" && (
        <Modal title={infoData.title} width={"600px"}>
          <ReservationModal />
        </Modal>
      )}
      {openModal.state && openModal.type === "guestAccess" && (
        <Modal title="회원가입/로그인으로 이동" titleHidden width="600px" height="500px">
          <UserAccessModal />
        </Modal>
      )}
    </>
  );
};

export default ButtonGroup;
