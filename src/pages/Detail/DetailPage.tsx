import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { toast } from "react-toastify";
import { Button, Carousel, Modal, UserAccessModal } from "@/components/common";
import { NavBar } from "@/components/layouts";
import { LikeButton, ReservationModal, SubMenuSection } from "@/components/detail";
import { useLoginStore } from "@/stores/useLoginStore";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { useModalStore } from "@/stores/useModalStore";
import { AgencyReservationInfoType, ShowType } from "@/types";
import { getShow, getShowReservationInfo, deleteLike, postLike } from "@/apis";
import { isNotUser } from "@/utils";
import styles from "./DetaiPage.module.css";

const submenuList = [
  { pathname: "", text: "정보" },
  { pathname: "review", text: "후기/방명록" },
];

const DetailPage = () => {
  const {
    userState: { user_role },
  } = useLoginStore();

  const { openModal, setOpenModal } = useModalStore();
  const { id: showId } = useParams();
  const { setShowInfo } = useShowInfoStore();
  const [agencyReservationInfo, setAgencyReservationInfo] = useState<AgencyReservationInfoType | null>(null);

  const {
    status,
    data: infoData,
    error,
  } = useQuery({
    queryKey: ["infoData", showId],
    queryFn: () => getShow(showId!),
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      if (showId && infoData?.user_liked) {
        return await deleteLike(showId);
      }
      if (showId && !infoData?.user_liked) {
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

  useEffect(() => {
    infoData && setShowInfo(infoData);
  }, [infoData]);

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const subImgs = (infoData.sub_images_url && Object.values(JSON.parse(infoData.sub_images_url))) || [];

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
    if (infoData.user_reserved === 1) {
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
      <NavBar />
      <main>
        <Carousel index={0}>
          {[infoData.main_image_url, ...subImgs].map((img, index) => (
            <div key={index}>
              <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + img} className={styles["slider__img"]} />
            </div>
          ))}
        </Carousel>
        <div className={styles["btn-group"]}>
          <LikeButton active={infoData.user_liked === 1 && true} onClick={handleLikeButtonClick} />
          {infoData.is_reservation === 1 && (
            <Button borderRadius="0.5rem" onClick={handleReservationButtonClick}>
              예매하기
            </Button>
          )}
          {openModal.state && openModal.type === "reservation" && agencyReservationInfo && (
            <Modal title={infoData.title} width={"600px"}>
              <ReservationModal agencyReservationInfo={agencyReservationInfo} />
            </Modal>
          )}
        </div>

        <SubMenuSection submenuList={submenuList} baseUrl={`/detail/${showId}`} />
      </main>
      {openModal.state && openModal.type === "guestAccess" && (
        <Modal title="회원가입/로그인으로 이동" titleHidden width="600px" height="500px">
          <UserAccessModal />
        </Modal>
      )}
    </>
  );
};

export default DetailPage;
