import React from "react";
import { DeleteButton } from "@/components/common";
import { getTxtColorByBgColor } from "@/utils";
import { formattingDate } from "@/utils";
import { StoryType } from "@/types";
import { deleteStoryUser } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import styles from "./StoryItem.module.css";

const StoryItem: React.FC<StoryType> = ({ id, login_id, story_image_url, story_color, created_at }) => {
  // const openModal = (id: number) => {
  //   console.log("openModal", id);
  // };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (story: { story_id: string; login_id: string }) => deleteStoryUser(story.story_id, story.login_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userStoryList"],
      });
    },
  });

  const deleteStory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const story_id = e.currentTarget.name;
    deleteMutate({ story_id, login_id });
  };

  return (
    <div
      className={styles["story-item"]}
      style={{ backgroundColor: story_color || "", color: getTxtColorByBgColor(story_color) }}
      // onClick={() => openModal(id)}
    >
      <DeleteButton onClick={deleteStory} spanHidden={`${id}`} name={`${id}`} />
      <img src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${story_image_url}`} alt="스토리 이미지" />
      <div className={styles["story-date"]}>{formattingDate(new Date(created_at))}</div>
    </div>
  );
};

export default StoryItem;
