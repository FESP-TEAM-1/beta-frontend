import { useState, Suspense } from "react";
import { Modal, UserAccessModal } from "@/components/common";
import { StoryUploadModal, StoryViewModal, StoryList, StoryListSkeleton } from "@/components/main";
import { useModalStore, useLoginStore } from "@/stores";
import { checkIsNotUser } from "@/utils";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const {
    userState: { user_role },
  } = useLoginStore();
  const { openModal, setOpenModal } = useModalStore();
  const [initialStorySlide, setInitialStorySlide] = useState(0);

  const handleClickUploadBtn = () => {
    if (checkIsNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }
    setOpenModal({ state: true, type: "storyUpload" });
  };

  const handleClickMoreBtn = () => {
    setInitialStorySlide(8);
    setOpenModal({ state: true, type: "storyView" });
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
              {openModal.type === "storyUpload" && (
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
          {openModal.state && openModal.type === "storyView" && <StoryViewModal initialSlide={initialStorySlide} />}
        </div>

        <Suspense fallback={<StoryListSkeleton />}>
          <StoryList setInitialStorySlide={setInitialStorySlide} />
        </Suspense>
      </section>
    </>
  );
};

export default StorySection;
