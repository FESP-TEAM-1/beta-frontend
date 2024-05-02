import { Link, useNavigate } from "react-router-dom";
import { useModalStore, useShowIdStore } from "@/stores";
import { ShowListItemType } from "@/apis/show/getAdminShowList";
import { Button } from "@/components/common";
import LikeIcon from "@/assets/like.svg?react";
import CommentIcon from "@/assets/comment.svg?react";
import styles from "./ShowListItem.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  item: ShowListItemType;
}

const ShowListItem: React.FC<PropsType> = ({ item }) => {
  const navigate = useNavigate();
  const { setOpenModal } = useModalStore();
  const { setShowId } = useShowIdStore();

  const handleClickReviewsCnt = async (title: string, showId: string) => {
    setOpenModal({ state: true, type: title });
    setShowId(showId);
  };

  return (
    <>
      <Link to={`/detail/${item.id}`} className={styles["list-row-left"]}>
        <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
        <p className={styles["list-item__date"]}>{item.start_date + " ~ " + item.end_date}</p>
      </Link>
      <div className={styles["list-row-right"]}>
        <div className={styles["like-cnt"]}>
          <LikeIcon />
          <span>{item.likes_count}</span>
        </div>
        <Button reverseColor={true} onClick={() => handleClickReviewsCnt(item.title, item.id.toString())} style={{ padding: "0.6rem" }}>
          <CommentIcon className={styles["cmt-icon"]} />
          <span>{item.reviews_count}</span>
        </Button>
        <Button reverseColor={true} style={{ padding: "0.6rem" }} onClick={() => navigate("./update", { state: item.id })}>
          수정/삭제
        </Button>
      </div>
    </>
  );
};

export default ShowListItem;
