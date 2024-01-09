import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { useLoginStore } from "@/stores/useLoginStore";
import { useModalStore } from "@/stores/useModalStore";
import { getShowReservationInfo, deleteLike, postLike } from "@/apis";
import { AgencyReservationInfoType, ShowType } from "@/types";
import { isNotUser } from "@/utils";
import { ButtonGroupSkeleton, LikeButton, ReservationModal } from "@/components/detail";
import { Button, Modal, UserAccessModal } from "@/components/common";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = () => {
  const { id: showId } = useParams();
  const { showInfo } = useShowInfoStore();
  const {
    userState: { user_role },
  } = useLoginStore();
  const { openModal, setOpenModal } = useModalStore();
  const [agencyReservationInfo, setAgencyReservationInfo] = useState<AgencyReservationInfoType | null>(null);

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      if (showId && showInfo?.user_liked) {
        return await deleteLike(showId);
      }
      if (showId && !showInfo?.user_liked) {
        return await postLike(showId);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId]);
      queryClient.setQueryData(["infoData", showId], {
        ...oldData,
        user_liked: oldData?.user_liked ? 0 : 1,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId], { ...context?.oldData });
    },
  });

  if (!showInfo) return <ButtonGroupSkeleton />;

  const handleLikeButtonClick = () => {
    if (isNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }
    likeMutate();
  };

  const handleReservationButtonClick = async () => {
    if (isNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }
    if (showInfo.user_reserved === 1) {
      toast.info("이미 예매한 공연/전시입니다");
      return;
    }
    const data = await getShowReservationInfo(showId!);
    const { method, google_form_url, ...rest } = data;

    if (method === "google" && google_form_url) window.open(google_form_url, "_blank");
    else {
      setAgencyReservationInfo(rest);
      setOpenModal({ state: true, type: "reservation" });
    }
  };

  return (
    <>
      <div className={styles["btn-group"]}>
        <LikeButton active={showInfo.user_liked === 1 && true} onClick={handleLikeButtonClick} />
        {showInfo.is_reservation === 1 && (
          <Button borderRadius="0.5rem" onClick={handleReservationButtonClick}>
            예매하기
          </Button>
        )}
      </div>
      {openModal.state && openModal.type === "reservation" && agencyReservationInfo && (
        <Modal title={showInfo.title} width={"600px"}>
          <ReservationModal agencyReservationInfo={agencyReservationInfo} />
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
