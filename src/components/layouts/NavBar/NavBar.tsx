import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NavBar.module.css";
import { getTodayStringDate } from "@/utils";

const cx = classNames.bind(styles);

const NavBar = () => {
  const { todayString } = getTodayStringDate();
  const navList = [
    { pathname: "/concert", text: "공연" },
    { pathname: "/exhibition", text: "전시" },
  ];

  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-wrapper"]}>
        {navList.map((item) => (
          <li key={item.pathname} className={cx("navbar__item", location.pathname === item.pathname && "selected")}>
            <Link
              to={{
                pathname: item.pathname,
                search: `?location=all&start_date=${todayString}&end_date=${todayString}&progress=1&date=오늘${
                  item.pathname === "/concert" ? "&category=all" : ""
                }`,
              }}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
