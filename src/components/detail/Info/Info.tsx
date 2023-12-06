import React from "react";
import styles from "./Info.module.css";
import LocationMap from "./LocationMap";
import { useOutletContext } from "react-router-dom";

interface ItemType {
  item: {
    organizer: string;
    title: string;
    location: string;
    date: string;
    tags: string[];
    position: {
      lat: number;
      lng: number;
    };
  };
}
type onCopyFn = (text: string) => Promise<boolean>;

const copyClipBoard: onCopyFn = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const Info = () => {
  const { item } = useOutletContext<ItemType>();
  const { organizer, title, location, date, tags, position } = item;

  return (
    <>
      <section>
        <section className={styles["info-title"]}>
          <h3 className="a11y-hidden">상세 정보</h3>
          <p className={styles["info-title__organizer"]}>{organizer}</p>
          <h4 className={styles["info-title__title"]}>{title}</h4>
          <p className={styles["info-title__date"]}>{date}</p>
          <p className={styles["info-title__location"]}>{location}</p>
          <ul className={styles["info-title__tags"]}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles["info-description"]}>
          <h3>소개</h3>
          {/* 커스텀 글 내용 */}
        </section>

        <section className={styles["info-location"]}>
          <h3 className="a11y-hidden">지도</h3>
          <LocationMap lat={position.lat} lng={position.lng} />
          <div className={styles["info-location__copy"]}>
            <p className={styles["text"]}>{location}</p>
            <button className={styles["button"]} onClick={() => copyClipBoard(location)}>
              복사하기
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Info;