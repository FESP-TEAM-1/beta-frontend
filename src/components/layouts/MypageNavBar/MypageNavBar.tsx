import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { useLoginStore } from "@/stores";
import styles from "./MypageNavBar.module.css";

const cx = classNames.bind(styles);

const userNavList = [
  { type: "info", pathname: "profile", text: "프로필" },
  { type: "manage", pathname: "user/like", text: "좋아요" },
  { type: "manage", pathname: "user/review", text: "후기" },
  { type: "manage", pathname: "user/story", text: "스토리" },
  { type: "manage", pathname: "user/reservation", text: "예매내역" },
];

const adminNavList = [
  { type: "info", pathname: "profile", text: "프로필" },
  { type: "manage", pathname: "admin/post", text: "게시글" },
  { type: "manage", pathname: "admin/reservation", text: "예매관리" },
];

const MypageNavBar = () => {
  const { userState } = useLoginStore();
  const navList = userState.user_role === "admin" ? adminNavList : userNavList;
  const location = useLocation();

  return (
    <nav className={styles["nav-container"]}>
      <ul className={styles["nav-ul"]}>
        <li>개인정보</li>
        {navList
          .filter((item) => item.type === "info")
          .map((item) => (
            <NavLink key={item.pathname} to={"/mypage/" + item.pathname} className={cx(location.pathname.includes(item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
        <li>관리</li>
        {navList
          .filter((item) => item.type === "manage")
          .map((item) => (
            <NavLink key={item.pathname} to={"/mypage/" + item.pathname} className={cx(location.pathname.includes(item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
      </ul>
    </nav>
  );
};

export default MypageNavBar;
