import React, { useMemo, useRef } from "react";
import { StoryType } from "@/types";
import { useImgLazyLoading } from "@/hooks";
import styles from "./StoryCard.module.css";

interface PropsType {
  item: StoryType;
  onClick: (e: React.MouseEvent) => void;
}

const StoryCard: React.FC<PropsType> = ({ item, onClick }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  const tags = useMemo<string[]>(() => Object.values(JSON.parse(item.tags)), [item.tags]);

  return (
    <article className={styles.card} onClick={onClick}>
      <h3 className={"a11y-hidden"}>{tags}</h3>
      <div className={styles["card__img-wrapper"]}>
        <img ref={imgRef} className={styles["card__img"]} data-src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.story_image_url}`} />
      </div>
    </article>
  );
};

export default StoryCard;
