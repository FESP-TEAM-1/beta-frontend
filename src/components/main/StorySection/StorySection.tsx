import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Modal, UserAccessModal } from "@/components/common";
import { StoryCard, StoryUploadModal, StoryViewModal, StorySectionSkeleton } from "@/components/main";
import { useModalStore, useLoginStore, useCarouselDragStore } from "@/stores";
import { getStoryList } from "@/apis";
import { checkIsNotUser } from "@/utils";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const { openModal, setOpenModal } = useModalStore();
  const {
    userState: { user_role },
  } = useLoginStore();
  const [initialSlide, setInitialSlide] = useState(0);
  const { isDragging } = useCarouselDragStore();

  const { data, status, error } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStoryList(),
    select: (item) => item.slice(0, 7),
  });

  const handleClickUploadBtn = () => {
    if (checkIsNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }

    setOpenModal({ state: true, type: "upload" });
  };

  const handleClickMoreBtn = () => {
    setInitialSlide(8);
    setOpenModal({ state: true, type: "more" });
  };

  const handleClickStoryCard = (slideNum: number) => (e: React.MouseEvent) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    setInitialSlide(slideNum);
    setOpenModal({ state: true, type: "more" });
  };

  return (
    <>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["header__title"]}>스토리</h2>
          <button type="button" className={styles["story-add-btn"]} onClick={handleClickUploadBtn}>
            <span className="a11y-hidden">스토리 추가버튼</span>
          </button>
          {openModal.state && (
            <>
              {openModal.type === "upload" && (
                <Modal width={"18.75rem"} height={"35.625rem"} title={"스토리 업로드"}>
                  <StoryUploadModal />
                </Modal>
              )}
              {openModal.type === "guestAccess" && (
                <Modal title="회원가입/로그인으로 이동" titleHidden width="600px" height="500px">
                  <UserAccessModal />
                </Modal>
              )}
            </>
          )}
          <button className={styles["story-more-btn"]} type="button" onClick={handleClickMoreBtn}>
            더보기
          </button>
          {openModal.state && openModal.type === "more" && (
            <Modal title={"스토리"} titleHidden={true}>
              <StoryViewModal initialSlide={initialSlide} />
            </Modal>
          )}
        </div>

        <div className={styles["carousel-container"]}>
          {status === "pending" && <StorySectionSkeleton />}
          {status === "error" && <>{error.message}</>}

          {data && (
            <Carousel index={1}>
              {data.map((item, index) => (
                <StoryCard key={item.id} item={item} onClick={handleClickStoryCard(index)} />
              ))}
            </Carousel>
          )}
        </div>
      </section>
    </>
  );
};

export default StorySection;
