import { Link, useLocation } from "react-router-dom";
import UserIcon from "@/assets/icon-login.svg?react";
import SignupIcon from "@/assets/icon-join.svg?react";
import styles from "./ButtonBeforeLogin.module.css";

const ButtonBeforeLogin = () => {
  const location = useLocation();

  return (
    <>
      <Link to="/login" className={styles["button-login"]} state={{ from: location }} replace>
        <UserIcon />
        로그인
      </Link>
      <Link to="/signup" className={styles["button-signup"]} state={{ from: location }} replace>
        <SignupIcon />
        회원가입
      </Link>
    </>
  );
};

export default ButtonBeforeLogin;
