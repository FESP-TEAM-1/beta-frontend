import { usePreventScroll } from "@/hooks";
import styles from "./ErrorPage.module.css";

const NetworkErrorPage = () => {
  usePreventScroll({ isModal: false });
  return (
    <div className={styles.container} style={{ position: "fixed", inset: 0, zIndex: "200", backgroundColor: "white", textAlign: "center" }}>
      <main className={styles.main}>
        <h1 className="a11y-hidden">인터넷 접속 오류 페이지</h1>
        <svg width="300" height="180" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_759_1027)">
            <rect x="10.5" y="1.5" width="277" height="177" rx="18.5" fill="#DA3017" stroke="white" strokeWidth="3" />
            <circle cx="289.64" cy="90.6398" r="23.5" transform="rotate(-178.514 289.64 90.6398)" fill="white" stroke="white" strokeWidth="3" />
            <circle cx="9" cy="93" r="23.5" fill="white" stroke="white" strokeWidth="3" />
            <path d="M138 56H161L158 104H141L138 56Z" fill="white" />
            <rect x="141" y="114" width="17" height="10" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_759_1027">
              <rect width="300" height="180" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <section>
          <h2 className={styles.title}>현재 접속이 원활하지 않아요.</h2>
          <p className={styles["title-desc"]} style={{ margin: "20px 0 0" }}>
            일시적인 오류로 서버와 연결이 끊겼습니다.
            {/* 네트워크 문제로 화면을 불러오지 못하였습니다. */}
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </section>
      </main>
    </div>
  );
};

export default NetworkErrorPage;
