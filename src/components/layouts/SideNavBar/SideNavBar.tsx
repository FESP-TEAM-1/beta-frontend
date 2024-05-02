import { ButtonAfterLogin, ButtonBeforeLogin, NavBar } from "..";
import { useLoginStore } from "@/stores";
import styles from "./SideNavBar.module.css";

const SideNavBar = () => {
  const { userState } = useLoginStore();

  return (
    <div className={styles["side-navbar"]}>
      <NavBar />
      <div className={styles["button-group"]}>{!userState.isLogin ? <ButtonBeforeLogin /> : <ButtonAfterLogin />}</div>
    </div>
  );
};

export default SideNavBar;
