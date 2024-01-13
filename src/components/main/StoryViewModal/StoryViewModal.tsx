import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@/components/common";
import { StoryViewModalCard } from "..";
import { getStoryList } from "@/apis";
import styles from "./StoryViewModal.module.css";

interface PropsType {
  initialSlide: number;
}

const StoryViewModal: React.FC<PropsType> = ({ initialSlide }) => {
  const { data, status, error } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStoryList(),
  });

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <div className={styles["modal"]}>
      <Carousel index={2} initialSlide={initialSlide}>
        {data.map((item) => {
          return <StoryViewModalCard key={item.id} item={item} />;
        })}
      </Carousel>
    </div>
  );
};

export default StoryViewModal;
