import React from "react";
import LikeSvg from "@/assets/like.svg?react";
import styles from "./LikeButton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  active: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<PropsType> = ({ active, onClick }) => {
  return (
    <button type="button" className={cx("like-button", active && "active")} onClick={onClick}>
      <LikeSvg className={styles["like-button__svg"]} />
      <span>좋아요</span>
    </button>
  );
};

export default LikeButton;
