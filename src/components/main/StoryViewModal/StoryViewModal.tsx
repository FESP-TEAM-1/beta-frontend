import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@/components/common";
import { StoryViewModalCard } from "..";
import { usePreventScroll } from "@/hooks";
import { useModalStore } from "@/stores";
import { getStoryList } from "@/apis";
import logo from "@/assets/beta-logo.png";
import CloseIcon from "@/assets/plus.svg?react";
import styles from "./StoryViewModal.module.css";

interface PropsType {
  initialSlide: number;
}

const StoryViewModal: React.FC<PropsType> = ({ initialSlide }) => {
  const { data, status, error } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStoryList(),
  });

  const { setOpenModal } = useModalStore();

  usePreventScroll({ isModal: true });

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <div className={styles["modal"]}>
      <button
        className={styles["modal__close"]}
        onClick={() => {
          setOpenModal({ state: false, type: "" });
        }}
      >
        <CloseIcon />
        <span className="a11y-hidden">모달닫기버튼</span>
      </button>
      <h1 className={styles["modal__logo"]}>
        <img src={logo} alt="beta-logo" />
      </h1>

      <section className={styles["carousel-wrapper"]}>
        <Carousel index={2} initialSlide={initialSlide}>
          {data.map((item) => {
            return <StoryViewModalCard key={item.id} item={item} />;
          })}
        </Carousel>
      </section>
    </div>
  );
};

export default StoryViewModal;
