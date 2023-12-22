import styles from "./InfoSection.module.css";
import LocationMap from "./LocationMap";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { toast } from "react-toastify";

type onCopyFn = (text: string) => void;

const copyClipBoard: onCopyFn = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("클립보드에 복사되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

// 디코딩
function base64ToBytes(base64: string): Uint8Array {
  try {
    const binString = window.atob(base64);
    return Uint8Array.from(binString, (c) => c.codePointAt(0) ?? 0);
  } catch (error) {
    console.error("Error decoding base64:", error);
    return new Uint8Array();
  }
}

const InfoSection = () => {
  const { showInfo } = useShowInfoStore();
  if (!showInfo) return <h2>loading...</h2>;

  const { univ, department, title, location, location_detail, start_date, end_date } = showInfo;

  const tags: string[] = showInfo.tags ? Object.values(JSON.parse(showInfo.tags)) : [];
  const position = showInfo.position && JSON.parse(showInfo.position);
  const decodedContent = showInfo.content ? new TextDecoder().decode(base64ToBytes(showInfo.content)) : null;

  return (
    <>
      <section>
        <section className={styles["info-title"]}>
          <h3 className="a11y-hidden">상세 정보</h3>
          <p className={styles["info-title__organizer"]}>{univ + " " + department}</p>
          <h4 className={styles["info-title__title"]}>{title}</h4>
          <p className={styles["info-title__date"]}>{start_date + " ~ " + end_date}</p>
          <p className={styles["info-title__location"]}>{location + " " + location_detail}</p>
          {!!tags.length && (
            <ul className={styles["info-title__tags"]}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </section>

        {decodedContent && (
          <section className={styles["info-description"]}>
            <h3>소개</h3>
            <pre className={styles["info-description__content"]} dangerouslySetInnerHTML={{ __html: decodedContent }}></pre>
          </section>
        )}

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

export default InfoSection;
