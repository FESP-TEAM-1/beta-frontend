import React, { useMemo, useRef } from "react";
import { StoryType } from "@/types";
import { getTxtColorByBgColor } from "@/utils";
import { useImgLazyLoading } from "@/hooks";
import classNames from "classnames/bind";
import styles from "./StoryViewModalCard.module.css";

const cx = classNames.bind(styles);

interface PropsType {
  item: StoryType;
}
const StoryViewModalCard: React.FC<PropsType> = ({ item }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  const imgSrc = `${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.story_image_url}`;

  const tags = useMemo<string[]>(() => Object.values(JSON.parse(item.tags)), [item.tags]);

  return (
    <article
      className={cx("card", "gray-scrollbar")}
      style={{ backgroundColor: item.story_color || "", color: getTxtColorByBgColor(item.story_color) }}
    >
      <>
        <strong className={styles["card__nickname"]}>@{item.login_id.slice(0, 3)}***</strong>
        <div className={styles["card__img-wrapper"]}>
          <img ref={imgRef} className={styles["card__img"]} data-src={imgSrc} />
        </div>
        <div className={styles["card__tags"]}>
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>
      </>
    </article>
  );
};

export default StoryViewModalCard;
