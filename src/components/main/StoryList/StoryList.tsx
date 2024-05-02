import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Carousel } from "@/components/common";
import { StoryCard } from "..";
import { getStoryList } from "@/apis";
import { useModalStore } from "@/stores";
import styles from "./StoryList.module.css";

interface PropsType {
  setInitialStorySlide: React.Dispatch<React.SetStateAction<number>>;
}
const StoryList: React.FC<PropsType> = ({ setInitialStorySlide }) => {
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const { setOpenModal } = useModalStore();

  const { data } = useSuspenseQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStoryList(),
    select: (item) => item.slice(0, 7),
  });

  const handleClickStoryCard = (slideNum: number) => (e: React.MouseEvent) => {
    if (isCarouselDragging) {
      e.stopPropagation();
      return;
    }
    setInitialStorySlide(slideNum);
    setOpenModal({ state: true, type: "storyView" });
  };

  return (
    <div className={styles["carousel-container"]}>
      {data && (
        <Carousel index={1} setIsDragging={setIsCarouselDragging}>
          {data.map((item, index) => (
            <StoryCard key={item.id} item={item} onClick={handleClickStoryCard(index)} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default StoryList;
