import { Link, useLocation } from "react-router-dom";
import { useLoginStore } from "@/stores";
import styles from "./UserAccessModal.module.css";

const UserAccessModal = () => {
  const location = useLocation();
  const {
    userState: { user_role },
  } = useLoginStore();

  return (
    <div className={styles["guest-access"]}>
      {user_role === "" && (
        <>
          <div className={styles["guest-access__signup"]}>
            <p>아직 회원이 아니시라면,</p>
            <Link to="/signup">회원가입</Link>
          </div>
          <div className={styles["guest-access__login"]}>
            <p>이미 가입한 아이디가 있다면,</p>
            <Link to="/login" state={{ from: location }} replace>
              로그인
            </Link>
          </div>
        </>
      )}

      {user_role === "admin" && (
        <>
          <div className={styles["guest-access__signup"]}>
            <p>일반 회원만 사용할 수 있는 기능입니다.</p>
            <Link to="/signup">일반 회원가입</Link>
          </div>
          <div className={styles["guest-access__login"]}>
            <p>이미 가입한 아이디가 있다면,</p>
            <Link to="/login" state={{ from: location }} replace>
              로그인
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccessModal;
