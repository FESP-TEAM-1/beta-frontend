import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button, Carousel, Modal, UserAccessModal } from "@/components/common";
import { NavBar } from "@/components/layouts";
import { LikeButton, ReservationModal, SubMenuSection } from "@/components/detail";
import { useLike } from "@/hooks";
import { useLoginStore } from "@/stores/useLoginStore";
import { useModalStore } from "@/stores/useModalStore";
import { getShowInfo, getShowReservationInfo } from "@/apis";
import { isNotUser } from "@/utils";
import styles from "./DetaiPage.module.css";

const submenuList = [
  { pathname: "", text: "정보" },
  { pathname: "review", text: "후기/방명록" },
];

const DetailPage = () => {
  const { id: showId } = useParams();
  const { likeMutate, deleteLikeMutate } = useLike(showId!);
  const {
    userState: { user_role },
  } = useLoginStore();
  const { openModal, setOpenModal } = useModalStore();

  const {
    data: infoData,
    status,
    error,
  } = useQuery({
    queryKey: ["infoData", showId],
    queryFn: () => getShowInfo(showId!),
  });

  const { data: reservationData } = useQuery({
    queryKey: ["reservationData", showId],
    queryFn: () => getShowReservationInfo(showId!),
    enabled: !!infoData?.is_reservation,
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const subImgs = infoData.sub_images_url ? Object.values(JSON.parse(infoData.sub_images_url)) : [];
  const images = [infoData.main_image_url, ...subImgs];

  const handleLikeButtonClick = () => {
    if (isNotUser(user_role)) {
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

    if (isNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }
    if (infoData.user_reserved === 1) {
      toast.info("이미 예매한 공연/전시입니다");
      return;
    }

    setOpenModal({ state: true, type: "reservation" });
  };

  return (
    <>
      <NavBar />
      <main>
        <Carousel index={0}>
          {images.map((img, index) => (
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
          {openModal.state && openModal.type === "reservation" && (
            <Modal title={infoData.title} width={"600px"}>
              <ReservationModal />
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
