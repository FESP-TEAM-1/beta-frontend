import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CATEGORY_LIST,
  CONCERT_CATEGORY_LIST,
  IS_RESERVATION_LIST,
  METHOD_LIST,
  appendResultToFormData,
  appendUploadImageToFormData,
  convertFormatForFormData,
  validateShowForm,
} from "@/utils";
import { DateWithTimeObj, ShowFormType, ShowResFormType } from "@/types";
import { useUploadShowQuery, usePickMainImageColor } from "@/hooks";
import { Button } from "@/components/common";
import { ImageInputSection, ShowInfoInputsSection, ShowResInfoInputsSection } from "@/components/mypage";
import styles from "../PostUpdate/PostUpdatePage.module.css";
import { useImageFileStore } from "@/stores";

const PostUploadPage = () => {
  const method = useForm<ShowFormType & ShowResFormType>({
    defaultValues: {
      show_type: CATEGORY_LIST[0],
      show_sub_type: CONCERT_CATEGORY_LIST[0],
      title: "",
      univ: "",
      department: "",
      start_date: null,
      end_date: null,
      location: "",
      location_detail: null,
      tags: [],
      content: "",
      is_reservation: IS_RESERVATION_LIST[0],
      method: METHOD_LIST[0],
      google_form_url: null,
      price: null,
      head_count: null,
      date_time: null,
      notice: "",
    },
  });

  // 이미지 관련
  const { imageFiles } = useImageFileStore();
  const main_image_color = usePickMainImageColor();

  // 게시글 정보
  const [position, setPosition] = useState<object>({});

  // 게시글 예매 정보
  const [roundList, setRoundList] = useState<DateWithTimeObj[]>([]);

  // 게시글 업로드 POST
  const { mutateUploadShow } = useUploadShowQuery();

  // 업로드하기 버튼
  const onSubmit = async (data: ShowFormType & ShowResFormType) => {
    const checkValid = validateShowForm(imageFiles.length, data, roundList.length);
    if (!checkValid.isValid) {
      toast.error(checkValid.message);
      return;
    }

    const formData = new FormData();

    // 1. 이미지 formData
    await appendUploadImageToFormData(formData, imageFiles);

    // 2. 텍스트 formData
    const result = convertFormatForFormData(data, main_image_color!, position, roundList);
    appendResultToFormData(formData, result);

    mutateUploadShow(formData);
  };

  const watchIsRes = method.watch("is_reservation");

  return (
    <FormProvider {...method}>
      <form className={styles["post-section-form"]} onSubmit={method.handleSubmit(onSubmit)}>
        <ImageInputSection />
        <ShowInfoInputsSection setPosition={setPosition} />
        {watchIsRes === "예" && <ShowResInfoInputsSection roundList={roundList} setRoundList={setRoundList} />}

        <Button type="submit">업로드하기</Button>
      </form>
    </FormProvider>
  );
};

export default PostUploadPage;
