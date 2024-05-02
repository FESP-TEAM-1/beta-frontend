import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  appendResultToFormData,
  appendUpdateImageToFormData,
  convertFormatForFormData,
  setShowInfo,
  setShowResInfo,
  validateShowForm,
} from "@/utils";
import { DateWithTimeObj, ShowFormType, ShowResFormType } from "@/types";
import { useDeleteShowQuery, useEditShowQuery, useGetShowInfoQuery, useGetShowResInfoQuery, usePickMainImageColor } from "@/hooks";
import { useImageFileStore } from "@/stores";
import { Button } from "@/components/common";
import { ImageInputSection, ShowInfoInputsSection, ShowResInfoInputsSection } from "@/components/mypage";
import styles from "./PostUpdatePage.module.css";

const PostUpdatePage = () => {
  const locationObj = useLocation();
  const showId = locationObj.state;
  const [isLoading, setIsLoading] = useState(true);

  const method = useForm<ShowFormType & ShowResFormType>();

  // 이미지 관련
  const { imageFiles } = useImageFileStore();
  const [imgExistingUrls, setImgExistingUrls] = useState<string[]>([]);
  const [originMainUrl, setOriginMainUrl] = useState<string>("");
  const main_image_color = usePickMainImageColor(imgExistingUrls[0]);

  // 게시글 정보
  const [position, setPosition] = useState<object>({});

  // 게시글 예매 정보
  const [roundList, setRoundList] = useState<DateWithTimeObj[]>([]);

  // 기존 게시글 GET
  const { showInfoData, showInfoStatus, showInfoError } = useGetShowInfoQuery(showId);
  // 기존 게시글 예매 정보 GET
  const { showResInfoData, showResInfoStatus, showResInfoError } = useGetShowResInfoQuery(showId);
  // 게시글 수정 PUT
  const { mutateEditShow } = useEditShowQuery();
  // 게시글 삭제 DELETE
  const { mutateDeleteShow } = useDeleteShowQuery();

  useEffect(() => {
    if (showInfoStatus === "success" && showInfoData) {
      setShowInfo({ showInfoData, setValue: method.setValue });
      setPosition(JSON.parse(showInfoData.position));
      setOriginMainUrl(showInfoData.main_image_url);
      setImgExistingUrls(
        showInfoData.sub_images_url
          ? [showInfoData.main_image_url, ...(Object.values(JSON.parse(showInfoData.sub_images_url)) as string[])]
          : [showInfoData.main_image_url],
      );

      if (showInfoData.is_reservation === 0) setIsLoading(() => false);
    }
  }, [showInfoData]);

  useEffect(() => {
    if (showResInfoStatus === "success" && showResInfoData) {
      setShowResInfo({ showResInfoData, setValue: method.setValue });
      setRoundList(
        showResInfoData.date_time.map((round) => {
          const [date, time] = round.date_time.split(" - ");
          return { id: round.id.toString(), date, time };
        }),
      );

      setIsLoading(() => false);
    }
  }, [showResInfoData]);

  if (showInfoStatus === "error") return <h1>{showInfoError?.message}</h1>;
  if (showResInfoStatus === "error") return <h1>{showResInfoError?.message}</h1>;

  if (isLoading) return <h1>loading update data ...</h1>;

  // 수정하기 버튼
  const onSubmit = async (data: ShowFormType & ShowResFormType) => {
    const imgCnt = imgExistingUrls.length + imageFiles.length;
    const checkValid = validateShowForm(imgCnt, data, roundList.length);
    if (!checkValid.isValid) {
      toast.error(checkValid.message);
      return;
    }

    const formData = new FormData();
    formData.append("show_id", showId);

    // 1. 이미지 formData
    await appendUpdateImageToFormData(formData, imageFiles, imgExistingUrls, originMainUrl);

    // 2. 텍스트 formData
    const result = convertFormatForFormData(data, main_image_color!, position, roundList);
    appendResultToFormData(formData, result);

    mutateEditShow(formData);
  };

  // 삭제하기 버튼
  const handleDeleteShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      mutateDeleteShow(showId);
      return;
    }
  };

  const watchIsRes = method.watch("is_reservation");

  return (
    <FormProvider {...method}>
      <form className={styles["post-section-form"]}>
        <ImageInputSection imgExistingUrls={imgExistingUrls} setImgExistingUrls={setImgExistingUrls} />
        <ShowInfoInputsSection setPosition={setPosition} />
        {watchIsRes === "예" && <ShowResInfoInputsSection roundList={roundList} setRoundList={setRoundList} />}

        <div className={styles["button-group"]}>
          <Button type="submit" onClick={handleDeleteShow} reverseColor>
            삭제하기
          </Button>
          <Button type="submit" onClick={method.handleSubmit(onSubmit)}>
            수정하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PostUpdatePage;
