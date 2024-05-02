import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { getTxtColorByBgColor } from "@/utils";
import { ShowType } from "@/types";
import { useImgLazyLoading } from "@/hooks";
import styles from "./TicketCard.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  item: ShowType;
}

const TicketCard: React.FC<PropsType> = ({ item }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  return (
    <article className={styles.card} style={{ backgroundColor: item.main_image_color || "" }}>
      <Link to={`/detail/${item.id}`}>
        <div className={styles["card__img-wrapper"]}>
          <img ref={imgRef} data-src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.main_image_url}`} alt="" />
        </div>

        <div className={styles["card__info"]} style={{ color: getTxtColorByBgColor(item.main_image_color) }}>
          <h3 className={cx("ellipsis-multi", "card__info__title")} style={{ wordBreak: "normal" }}>
            {item.title}
          </h3>
          <p className={cx("ellipsis-multi", "card__info__date")}>
            {item.start_date} ~ {item.end_date}
          </p>
          <p className={cx("ellipsis-multi", "card__info__location")}>{item.location}</p>
        </div>
      </Link>
    </article>
  );
};

export default TicketCard;
