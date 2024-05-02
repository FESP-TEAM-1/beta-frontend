import { ButtonAfterLogin, MypageNavBar } from "..";
import styles from "./MypageSideNavBar.module.css";

const MypageSideNavBar = () => {
  return (
    <div className={styles["side-navbar"]}>
      <MypageNavBar />
      <div className={styles["button-group"]}>
        <ButtonAfterLogin />
      </div>
    </div>
  );
};

export default MypageSideNavBar;
