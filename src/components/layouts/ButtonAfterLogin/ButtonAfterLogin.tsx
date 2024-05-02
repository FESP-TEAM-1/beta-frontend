import { Link } from "react-router-dom";
import UserIcon from "@/assets/icon-login.svg?react";
import LogoutIcon from "@/assets/icon-logout.svg?react";
import { useLoginStore } from "@/stores";
import { patchMemberLogout } from "@/apis";
import styles from "./ButtonAfterLogin.module.css";

const ButtonAfterLogin = () => {
  const isInMyPage = location.pathname.includes("/mypage");
  const { setUserState } = useLoginStore();

  const handleLogout = async () => {
    const res = await patchMemberLogout();
    if (res.ok) {
      setUserState({ isLogin: false, login_id: "", user_name: "", user_role: "" });
    }
  };

  return (
    <>
      <button type="button" className={styles["button-logout"]} onClick={handleLogout}>
        <LogoutIcon />
        로그아웃
      </button>
      {!isInMyPage && (
        <Link to="/mypage/profile" className={styles["button-mypage"]}>
          <UserIcon />
          마이페이지
        </Link>
      )}
    </>
  );
};

export default ButtonAfterLogin;
