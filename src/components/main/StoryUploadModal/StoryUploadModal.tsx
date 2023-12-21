import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useColor } from "color-thief-react";
import { toast } from "react-toastify";
import { Button, TagInput } from "@/components/common";
import reduceImageSize from "@/utils/reduceImageSize";
import convertArrayToObject from "@/utils/convertArrayToObject";
import { useLoginStore } from "@/stores/useLoginStore";
import { useModalStore } from "@/stores/useModalStore";
import { postStory } from "@/apis";
import styles from "./StoryUploadModal.module.css";

const StoryUploadModal = () => {
  const queryClient = useQueryClient();
  const { userState } = useLoginStore();
  const { setOpenModal } = useModalStore();
  const [objUrl, setObjUrl] = useState<string>("");
  const [tagsInput, setTagInputs] = useState<string[]>([]);
  const { data: story_color } = useColor(objUrl, "hex");
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => postStory(formData),
    onSuccess: () => {
      toast.info("스토리 업로드 성공!");
      setOpenModal({ state: false, type: "" });
      queryClient.invalidateQueries({ queryKey: ["storyData"] });
    },
    onError: () => {
      toast.error("스토리 업로드에 실패하였습니다. 다시 시도해주세요");
    },
  });

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const imgSrc = URL.createObjectURL(selectedFile);
    setObjUrl(imgSrc);
  };

  const handleChangeTags = (tags: string[]) => {
    setTagInputs(tags);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!objUrl) return;
    if (!tagsInput) return;

    const jpeg = await reduceImageSize(objUrl);
    const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });
    const tags = JSON.stringify(convertArrayToObject(tagsInput));

    const formData = new FormData();
    formData.append("story_image_url", file);
    formData.append("login_id", userState.login_id);
    formData.append("tags", tags);
    formData.append("story_color", story_color as string);

    mutate(formData);
  };

  useEffect(() => {
    return () => {
      if (objUrl) {
        URL.revokeObjectURL(objUrl);
      }
    };
  }, [objUrl]);

  return (
    <form className={styles.form} id={"story-upload-modal"} onSubmit={handleSubmit}>
      <label className={styles["img-upload"]} htmlFor="img" style={{ backgroundImage: `url(${objUrl})` }}>
        <input type="file" id="img" accept="image/*" onChange={handleChangeImage} />
      </label>
      <TagInput handleChange={handleChangeTags} />
      <Button type="submit" borderRadius={"16px"} form={"story-upload-modal"}>
        업로드하기
      </Button>
    </form>
  );
};

export default StoryUploadModal;
