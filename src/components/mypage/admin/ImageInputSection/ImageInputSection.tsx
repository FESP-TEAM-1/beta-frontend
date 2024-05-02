import React, { useEffect, useRef } from "react";
import ImgUploadIcon from "@/assets/ImgUploadIcon.svg?react";
import { DeleteButton } from "@/components/common";
import styles from "./ImageInputSection.module.css";
import { useImageFileStore, useImagePreviewUrlStore } from "@/stores";

interface PropsType {
  imgExistingUrls?: string[];
  setImgExistingUrls?: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageInputSection: React.FC<PropsType> = ({ imgExistingUrls, setImgExistingUrls }) => {
  const { resetImageFiles, addImageFiles, removeImageFiles } = useImageFileStore();
  const { imagePreviewUrls, resetImagePreviewUrls, addImagePreviewUrls, removeImagePreviewUrls } = useImagePreviewUrlStore();

  const timestamp = useRef(new Date().getTime()).current;

  useEffect(() => {
    return () => {
      resetImageFiles();
      resetImagePreviewUrls();
    };
  }, []);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    addImageFiles(files);
    addImagePreviewUrls(files);
  };

  // 새로 입력된 이미지들 삭제
  const handleRemoveImage = (image: string) => {
    // file 객체 리스트에서 제거
    const deleteImgIndex = imagePreviewUrls.indexOf(image);
    removeImageFiles(deleteImgIndex);
    // 미리보기 blob url 리스트에서 제거
    removeImagePreviewUrls(image);
  };

  // 기존 이미지들 삭제
  const handleRemoveExistingImage = (image: string) => {
    setImgExistingUrls && setImgExistingUrls((prev) => prev.filter((existingUrl) => existingUrl !== image));
  };

  return (
    <section>
      <div className={styles["update-imgs-wrapper"]}>
        <label className={styles["update-img-input"]}>
          <ImgUploadIcon />
          <input type="file" accept="image/*" multiple onChange={handleChangeImage} />
        </label>
        <ul className={styles["imgs-list"]}>
          {imgExistingUrls &&
            imgExistingUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + image + "?" + timestamp} alt="" />
                  <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveExistingImage(image)} forImage />
                </div>
              </li>
            ))}
          {imagePreviewUrls.map((image) => (
            <li key={image}>
              <div className={styles["img-cover"]}>
                <img src={image} alt="" />
                <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveImage(image)} forImage />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImageInputSection;
