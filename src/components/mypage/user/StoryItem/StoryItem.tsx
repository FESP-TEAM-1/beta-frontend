import React, { useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { DeleteButton } from "@/components/common";
import { formatDate, getTxtColorByBgColor } from "@/utils";
import { StoryType } from "@/types";
import { deleteStory } from "@/apis";
import { useImgLazyLoading } from "@/hooks";
import styles from "./StoryItem.module.css";

const StoryItem: React.FC<StoryType> = ({ id, login_id, story_image_url, story_color, created_at }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useImgLazyLoading(imgRef);

  const queryClient = useQueryClient();
  // const openModal = (id: number) => {
  //   console.log("openModal", id);
  // };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (story: { story_id: string; login_id: string }) => deleteStory(story.story_id, story.login_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userStoryList"],
      });
    },
  });

  const handleClickDeleteStory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm("정말 스토리를 삭제 하시겠습니까?")) {
      const story_id = e.currentTarget.name;
      deleteMutate({ story_id, login_id });
      return;
    }
  };

  return (
    <div
      className={styles["story-item"]}
      style={{ backgroundColor: story_color || "", color: getTxtColorByBgColor(story_color) }}
      // onClick={() => openModal(id)}
    >
      <DeleteButton onClick={handleClickDeleteStory} spanHidden={`${id}`} name={`${id}`} />
      <img ref={imgRef} data-src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${story_image_url}`} alt="스토리 이미지" />
      <div className={styles["story-date"]}>{formatDate(new Date(created_at))}</div>
    </div>
  );
};

export default StoryItem;
