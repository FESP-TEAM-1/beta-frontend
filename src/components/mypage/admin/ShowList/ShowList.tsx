import { getAdminShowList } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { ShowListItem } from "@/components/mypage";
import { NullField } from "@/components/common";
import styles from "./ShowList.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ShowList = () => {
  // 게시글 리스트를 가져오는 쿼리
  const {
    status: statusShowList,
    data: showList,
    error: errorShowList,
  } = useQuery({
    queryKey: ["showList"],
    queryFn: () => getAdminShowList(),
  });
  if (statusShowList === "pending") return <h1>loading...</h1>;
  if (statusShowList === "error") return <h1>{errorShowList.message}</h1>;

  return (
    <ul className={cx("list", "gray-scrollbar")}>
      {showList.length ? (
        showList.map((item) => (
          <li className={styles["list-row"]} key={item.id}>
            <ShowListItem item={item} />
          </li>
        ))
      ) : (
        <NullField text1="아직 등록된 게시글이 없어요!" text2="" />
      )}
    </ul>
  );
};

export default ShowList;
