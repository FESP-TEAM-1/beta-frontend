import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonBeforeLogin, ButtonAfterLogin, NavBar, SideNavBar, MypageSideNavBar } from "@/components/layouts";
import logo from "@/assets/beta-logo.png";
import MenuIcon from "@/assets/menu.svg?react";
import NavbarCloseIcon from "@/assets/navbar-close.svg?react";
import { useLoginStore } from "@/stores";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = () => {
  const location = useLocation();
  const { userState } = useLoginStore();
  const [isSideNavbarShow, setIsSideNavbarShow] = useState(false);

  const isInMyPage = location.pathname.includes("/mypage");

  useEffect(() => {
    handleClose();
  }, [location.pathname, userState.isLogin]);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setIsSideNavbarShow(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "auto";
    setIsSideNavbarShow(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-wrapper"]}>
        <h1 className={styles["header-logo"]}>
          <Link to={"/"}>
            <img src={logo} alt="beta-logo" />
          </Link>
        </h1>

        {!isInMyPage && <NavBar />}

        <div className={styles["button-group"]}>
          {!userState.isLogin ? <ButtonBeforeLogin /> : <ButtonAfterLogin />}

          <button type="button" className={cx("button-icon", "menu")} onClick={handleOpen}>
            <span className={"a11y-hidden"}>메뉴 아이콘 버튼</span>
            <MenuIcon />
          </button>
        </div>
      </div>

      {isSideNavbarShow && (
        <>
          <div className="dim" onClick={handleClose}></div>
          <div className={styles["side-navbar"]}>
            <button type="button" className={cx("button-icon")} onClick={handleClose}>
              <span className={"a11y-hidden"}>메뉴 닫기</span>
              <NavbarCloseIcon />
            </button>
            {!isInMyPage ? <SideNavBar /> : <MypageSideNavBar />}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
