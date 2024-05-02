import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ShowType } from "@/types";
import { useImgLazyLoading } from "@/hooks";
import styles from "./BasicCard.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  item: ShowType;
}
const BasicCard: React.FC<PropsType> = ({ item }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  return (
    <article className={styles.card}>
      <Link to={`/detail/${item.id}`}>
        <div className={styles["card__img-wrapper"]}>
          <img ref={imgRef} className={styles["card__img"]} data-src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.main_image_url}`} />
        </div>
        <h3 className={cx("card__title", "ellipsis")}>{item.title}</h3>
        <p className={cx("card__location", "ellipsis")}>{item.location}</p>
        <p className={styles["card__date"]}>
          {item.start_date} ~ {item.end_date}
        </p>
      </Link>
    </article>
  );
};

export default BasicCard;
