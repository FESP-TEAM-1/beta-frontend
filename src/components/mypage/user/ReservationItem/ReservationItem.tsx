import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useImgLazyLoading } from "@/hooks";
import styles from "./ReservationItem.module.css";

const ReservationItem = ({ ...args }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  const navigate = useNavigate();
  const { show_id, title, location, location_detail, main_image_url, date_time, modalOpen } = args;

  const moveToDetail = () => {
    navigate(`/detail/${show_id}`);
  };

  return (
    <article className={styles["reservation-article"]}>
      <div className={styles["reservation-box"]}>
        <img
          ref={imgRef}
          className={styles["reservation-img"]}
          data-src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${main_image_url}`}
          alt="메인 이미지"
          onClick={moveToDetail}
        />
        <div className={styles["reservation-item"]}>
          <div className={styles["reservation-info-text"]}>
            <p>
              <strong>제목</strong>
              <span className="ellipsis">{title}</span>
            </p>
            <p>
              <strong>장소</strong>
              <span className="ellipsis">{location + " " + location_detail}</span>
            </p>
            <p>
              <strong>회차</strong>
              <span className="ellipsis">{date_time}</span>
            </p>
          </div>
          <div className={styles["reservation-info-button"]}>
            <button className={styles["reservation-delete-button"]} onClick={modalOpen}>
              예매 정보
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReservationItem;
