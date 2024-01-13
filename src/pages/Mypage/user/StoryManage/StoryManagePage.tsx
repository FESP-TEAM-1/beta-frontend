import { useQuery } from "@tanstack/react-query";
import { getUserStoryList } from "@/apis";
import { StoryItem } from "@/components/mypage";
import { NullField } from "@/components/common";
import styles from "./StoryManagePage.module.css";

const StoryManagePage = () => {
  const {
    status,
    error,
    data: userStoryList,
  } = useQuery({
    queryKey: ["userStoryList"],
    queryFn: () => getUserStoryList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <>
      {userStoryList.length > 0 ? (
        <div className={styles["story-container"]}>
          {userStoryList.map((item) => (
            <StoryItem
              key={item.id}
              id={item.id}
              login_id={item.login_id}
              story_image_url={item.story_image_url}
              story_color={item.story_color}
              tags={item.tags}
              created_at={item.created_at}
              updated_at={item.updated_at}
            />
          ))}
        </div>
      ) : (
        <NullField text1="작성한 스토리가 없어요!" text2="좋은 추억을 남겨보세요!" />
      )}
    </>
  );
};

export default StoryManagePage;
