import { useState } from "react";
import { Carousel, Modal } from "@/components/common";
import { Story, StoryUploadModal, StoryViewModal } from "@/components/main";
import { useModalStore } from "@/stores/useModalStore";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const items = { imgSrc: "/public/story-img.jpg", title: "#멋지다신은수, #졸업축하해" };
  const { openModal, setOpenModal } = useModalStore();

  const handleClickUploadBtn = () => {
    setOpenModal({ state: true, type: "upload" });
  };
  const handleClickMoreBtn = () => {
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
          <button className={styles["story-more-btn"]} type="button" onClick={handleClickMoreBtn}>
            더보기
          </button>
        </div>

        <Carousel index={1}>
          {Array(5)
            .fill(items)
            .map(({ imgSrc, title }) => (
              <Story key={title} title={title} imgSrc={imgSrc} />
            ))}
        </Carousel>
        {openModal.state && (
          <>
            {openModal.type === "upload" ? (
              <Modal width={"18.75rem"} height={"33.75rem"} title={"스토리 업로드"}>
                <StoryUploadModal />
              </Modal>
            ) : (
              <Modal title={"스토리"} titleHidden={true}>
                <StoryViewModal />
              </Modal>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default StorySection;
