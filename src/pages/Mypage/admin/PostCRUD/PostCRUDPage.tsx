import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useColor } from "color-thief-react";
import { toast } from "react-toastify";
import { convertBase64ToBytes, convertBytesToBase64, convertUrlToFile, getResizedImgFiles, convertArrayToObject, reduceImageSize } from "@/utils";
import { DateInputType, DateWithTimeObj, ShowFormResultType, ShowFormType, ShowResFormType } from "@/types";
import { useInputs } from "@/hooks";
import { deleteAdminShow, getShow, getShowReservationInfo, putShow, postShow } from "@/apis";
import { Button, DatePicker, DeleteButton, Editor, InputField, RadioButtonGroup, TagInput } from "@/components/common";
import { Postcode, ReservationForm } from "@/components/mypage";
import ImgUploadIcon from "@/assets/ImgUploadIcon.svg?react";
import styles from "./PostCRUDPage.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const categoryList = ["공연", "전시"]; // "스포츠"
const concertCategoryList = ["음악", "연극", "기타"];
// const sportsCategoryList = ["야구", "축구", "농구"];
const isReservationList = ["예", "아니오"];
const methodList = ["구글폼", "예매 대행"];

const roundListArrToObj = (roundList: DateWithTimeObj[]) => {
  const obj: { [key: string]: string } = {};
  roundList.forEach((item) => {
    obj[item.id] = item.date + " - " + item.time;
  });
  return obj;
};

const defaultValues = {
  show_type: categoryList[0],
  show_sub_type: concertCategoryList[0],
  title: "",
  univ: "",
  department: "",
  // location: "",
  location_detail: null,
  is_reservation: isReservationList[0],
};

const defaultResValues = { method: methodList[0], google_form_url: null, price: null, head_count: null };

const PostCRUDPage = () => {
  const navigate = useNavigate();
  const locationObj = useLocation();
  const showId = locationObj.state || undefined;
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 정보
  const [initialFormValues, setInitialFormValues] = useState<ShowFormType>(defaultValues);
  const [form, onChangeForm, resetForm] = useInputs(initialFormValues);
  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<object>({});
  const [tagsInput, setTagInputs] = useState<string[]>([]);
  const [editorData, setEditorData] = useState<string>("");

  // 이미지 관련
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreviewUrls, setImgPreviewUrls] = useState<string[]>([]);
  const [imgExistingUrls, setImgExistingUrls] = useState<string[]>([]);
  const [originMainUrl, setOriginMainUrl] = useState<string>("");
  const { data: main_image_color } = useColor(
    imgExistingUrls[0] ? `${import.meta.env.VITE_APP_IMAGE_DOMAIN + imgExistingUrls[0]}` : imgPreviewUrls[0],
    "hex",
    {
      crossOrigin: "anonymous",
    },
  );

  // 게시글 예매 정보
  const [initialResFormValues, setInitialResFormValues] = useState<ShowResFormType>(defaultResValues);
  const [resForm, onChangeResForm, resetResForm] = useInputs(initialResFormValues);
  const [roundList, setRoundList] = useState<DateWithTimeObj[]>([]);
  const [editorNoticeData, setEditorNoticeData] = useState<string>("");

  useEffect(() => {
    return () => {
      if (imgPreviewUrls) {
        imgPreviewUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
      }
    };
  }, [imgPreviewUrls]);

  // 게시글 업로드 POST
  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => postShow(formData),
    onSuccess: (data) => {
      if (data) {
        toast.success("게시글 업로드 성공");
        navigate("/mypage/admin/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 기존 게시글 GET
  const {
    data: showInfoData,
    status: showInfoStatus,
    error,
  } = useQuery({
    queryKey: ["showInfoData", showId],
    queryFn: () => getShow(showId),
    enabled: !!showId,
  });

  // 기존 게시글 예매 정보 GET
  const {
    data: showReservationInfoData,
    status: showReservationInfoStatus,
    error: showReservationInfoError,
  } = useQuery({
    queryKey: ["showReservationInfoData", showId],
    queryFn: () => getShowReservationInfo(showId),
    enabled: !!showInfoData?.is_reservation,
  });

  // 게시글 수정 PUT
  const { mutate: editMutate } = useMutation({
    mutationFn: (formData: FormData) => putShow(formData),
    onSuccess: (data) => {
      if (data) {
        toast.success("게시글 수정 완료");
        navigate("/mypage/admin/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 게시글 삭제 DELETE
  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteAdminShow(showId),
    onSuccess: (data) => {
      if (data) {
        toast.success("게시글 삭제 완료");
        navigate("/mypage/admin/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (showInfoStatus === "success" && showInfoData) {
      const update = {
        title: showInfoData.title,
        show_type: showInfoData.show_type,
        show_sub_type: showInfoData.show_sub_type,
        univ: showInfoData.univ,
        department: showInfoData.department,
        location_detail: showInfoData.location_detail,
        is_reservation: showInfoData.is_reservation === 1 ? "예" : "아니오",
      };
      setInitialFormValues(() => update);

      setLocation(showInfoData.location);
      setPosition(JSON.parse(showInfoData.position));
      setDate({ start_date: showInfoData.start_date, end_date: showInfoData.end_date });
      showInfoData.tags?.length && setTagInputs(Object.values(JSON.parse(showInfoData.tags)) as string[]);
      showInfoData.content && setEditorData(new TextDecoder().decode(convertBase64ToBytes(showInfoData.content)));

      setOriginMainUrl(showInfoData.main_image_url);
      setImgExistingUrls(
        showInfoData.sub_images_url
          ? [showInfoData.main_image_url, ...(Object.values(JSON.parse(showInfoData.sub_images_url)) as string[])]
          : [showInfoData.main_image_url],
      );
    }
  }, [showInfoData]);

  useEffect(() => {
    if (showInfoData) {
      resetForm();
      if (!showInfoData.is_reservation) {
        setIsLoading(() => false);
      }
    }
  }, [initialFormValues, resetForm]);

  useEffect(() => {
    if (showReservationInfoStatus === "success" && showReservationInfoData) {
      const update = {
        method: showReservationInfoData.method === "google" ? "구글폼" : "예매 대행",
        google_form_url: showReservationInfoData.google_form_url,
        price: showReservationInfoData.price,
        head_count: showReservationInfoData.head_count,
      };
      setInitialResFormValues(() => update);

      setRoundList(
        showReservationInfoData.date_time.map((round) => {
          const [date, time] = round.date_time.split(" - ");
          return { id: round.id.toString(), date, time };
        }),
      );
      showReservationInfoData.notice && setEditorNoticeData(new TextDecoder().decode(convertBase64ToBytes(showReservationInfoData.notice)));
    }
  }, [showReservationInfoData]);

  useEffect(() => {
    if (showReservationInfoData) {
      resetResForm();
      setIsLoading(() => false);
    }
  }, [initialResFormValues, resetResForm]);

  if (showId) {
    if (showInfoStatus === "error") return <h1>{error.message}</h1>;
    if (showInfoStatus === "pending") return <h1>loading...</h1>;

    if (showReservationInfoStatus === "error") return <h1>{showReservationInfoError.message}</h1>;
    if (showInfoData.is_reservation && showReservationInfoStatus === "pending") return <h1>loading reservationInfo...</h1>;

    if (isLoading) return <h1>loading state update ...</h1>;
  }

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImgFiles([...imgFiles, ...e.target.files]);
    const previewImgSrc = [...e.target.files].map((file) => URL.createObjectURL(file));
    setImgPreviewUrls([...imgPreviewUrls, ...previewImgSrc]);
  };

  // 새로 입력된 이미지들 삭제
  const handleRemoveImage = (image: string) => {
    const deleteImgIndex = imgPreviewUrls.indexOf(image);
    // file 객체 리스트에서 제거
    const newImgFiles = [...imgFiles.slice(0, deleteImgIndex), ...imgFiles.slice(deleteImgIndex + 1)];
    setImgFiles(newImgFiles);
    // 미리보기 blob url 리스트에서 제거
    setImgPreviewUrls((prev) => prev.filter((previewUrl) => previewUrl !== image));
  };
  // 기존 이미지들 삭제
  const handleRemoveExistingImage = (image: string) => {
    setImgExistingUrls((prev) => prev.filter((existingUrl) => existingUrl !== image));
  };

  const handleDateInput = (event: DateInputType) => {
    const { name, value } = event.target;
    setDate({ ...date, [name]: value });
  };

  const handleChangeTags = (tags: string[]) => {
    setTagInputs(tags);
  };

  // 업로드하기, 수정하기 버튼
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, submitFor: "upload" | "update") => {
    e.preventDefault();

    const imgCnt = imgFiles.length + imgExistingUrls.length;

    if (imgCnt < 2) {
      toast.error("이미지를 2개 이상 업로드 해주세요.");
      return;
    }
    if (imgCnt > 10) {
      toast.error("이미지를 10개 이하로 업로드 해주세요.");
      return;
    }
    if (!form.title || !form.univ || !form.department) {
      toast.error("주최자 정보를 입력해주세요.");
      return;
    }
    if (!date.start_date || !date.end_date) {
      toast.error("기간을 입력해주세요.");
      return;
    }
    if (!location) {
      toast.error("주소를 입력해주세요.");
      return;
    }
    if (!tagsInput.length) {
      toast.error("tag를 입력해주세요.");
      return;
    }
    if (form.is_reservation === "예") {
      if (resForm.method === "구글폼" && !resForm.google_form_url) {
        toast.error("구글폼 URL을 입력해주세요.");
        return;
      }
      if (resForm.method === "예매 대행" && (resForm.price === null || !resForm.head_count || !roundList.length || !editorNoticeData)) {
        toast.error("예매 작성 폼을 완성해주세요.");
        return;
      }
    }

    const base64EncodedContents = (!!editorData && convertBytesToBase64(new TextEncoder().encode(editorData))) || null;
    const base64EncodedNotice =
      (resForm.method === "예매 대행" && !!editorNoticeData && convertBytesToBase64(new TextEncoder().encode(editorNoticeData))) || null;

    const result: ShowFormResultType = {
      ...form,
      main_image_color: main_image_color as string,
      show_sub_type: form.show_type === "전시" ? null : form.show_sub_type,
      start_date: date.start_date,
      end_date: date.end_date,
      location,
      location_detail: form.location_detail ? form.location_detail : null,
      position: JSON.stringify(position),
      tags: JSON.stringify(convertArrayToObject(tagsInput)),
      content: base64EncodedContents,
      is_reservation: form.is_reservation === "예" ? "1" : "0",
      //
      ...resForm,
      method: form.is_reservation === "예" ? (resForm.method === "구글폼" ? "google" : "agency") : null,
      google_form_url: (resForm.method === "구글폼" && resForm.google_form_url) || null,
      price: (resForm.method === "예매 대행" && (resForm.price as number).toString()) || null,
      head_count: (resForm.method === "예매 대행" && (resForm.head_count as number).toString()) || null,
      date_time: (resForm.method === "예매 대행" && JSON.stringify(roundListArrToObj(roundList))) || null,
      notice: base64EncodedNotice,
    };

    const formData = new FormData();

    // 텍스트 formData
    const keysToAppend: Array<keyof ShowFormResultType> = [
      "show_type",
      "show_sub_type",
      "title",
      "start_date",
      "end_date",
      "location",
      "location_detail",
      "position",
      "main_image_color",
      "univ",
      "department",
      "tags",
      "content",
      "is_reservation",
      //
      "method",
      "google_form_url",
      "price",
      "head_count",
      "date_time",
      "notice",
    ];

    for (const key of keysToAppend) {
      if (result[key]) {
        // 특정 키에 해당하는 값이 존재할 때만 append
        formData.append(key.toString(), result[key] as string);
      }
    }

    // 이미지 formData
    const resizedImgFiles = await getResizedImgFiles(imgFiles);

    switch (submitFor) {
      case "upload": {
        formData.append("mainImage", resizedImgFiles[0]); // 메인 이미지
        const finalSubImages = resizedImgFiles.slice(1);
        for (let i = 0; i < finalSubImages.length; i++) {
          formData.append("subImages", finalSubImages[i]); // 서브 이미지
        }

        const fileNames: { [key: number]: string } = {};
        finalSubImages.forEach((file: File, index: number) => (fileNames[index + 1] = file.name));
        formData.append("sub_images_url", JSON.stringify(fileNames)); // 서브 이미지 순서

        mutate(formData);
        break;
      }
      case "update": {
        showId && formData.append("show_id", showId);

        // 서버에 새로 업로드할 이미지들 고르기
        let finalSubImageFiles;
        // 기존 이미지가 남아있으면
        if (imgExistingUrls.length) {
          finalSubImageFiles = resizedImgFiles;
          // 기존 메인 이미지가 변경되면 (그대로면 보내지 않음)
          if (imgExistingUrls[0] !== originMainUrl) {
            // imgExistingUrls[0]을 file로 변환하고 jpeg 리사이즈해서 보내기
            const mainImageFile = await convertUrlToFile(import.meta.env.VITE_APP_IMAGE_DOMAIN + imgExistingUrls[0]);
            const blobString = URL.createObjectURL(mainImageFile);
            const jpeg = await reduceImageSize(blobString);
            const finalMainImageFile = new File([jpeg], imgExistingUrls[0], { type: "image/jpeg" });
            formData.append("mainImage", finalMainImageFile); // 메인 이미지
          }
        } // 기존 이미지가 다 삭제되면
        else {
          formData.append("mainImage", resizedImgFiles[0]); // 메인 이미지
          finalSubImageFiles = resizedImgFiles.slice(1);
        }

        for (let i = 0; i < finalSubImageFiles.length; i++) {
          formData.append("subImages", finalSubImageFiles[i]); // 서브 이미지
        }

        // 이미지 순서와 저장된 기존 서브 이미지 name를 파악하기 위한 file name list 만들기
        const fileNames: { [key: number]: string } = {};
        let finalSubImageUrls;
        if (imgExistingUrls.length > 1) {
          const existingFileNames = imgExistingUrls.slice(1).map((url) => url.split("/show/")[1]);
          const newFileNames = finalSubImageFiles.map((file) => file.name);
          finalSubImageUrls = [...existingFileNames, ...newFileNames];
        } else {
          finalSubImageUrls = finalSubImageFiles.map((file) => file.name);
        }
        finalSubImageUrls.forEach((fileName, index) => (fileNames[index + 1] = fileName));
        formData.append("sub_images_url", JSON.stringify(fileNames));

        editMutate(formData);
        break;
      }
    }
  };

  // 삭제하기 버튼
  const handleDeleteShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutate();
      return;
    }
  };

  return (
    <form className={styles["post-section-form"]}>
      <section>
        <h2 className={styles["title"]}>공연/전시 이미지</h2> {/*스포츠 */}
        <div className={styles["update-imgs-wrapper"]}>
          <label className={styles["update-img-input"]}>
            <ImgUploadIcon />
            <input type="file" accept="image/*" multiple onChange={handleChangeImage} />
          </label>
          <ul className={styles["imgs-list"]}>
            {imgExistingUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + image} alt="" />
                  <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveExistingImage(image)} forImage />
                </div>
              </li>
            ))}
            {imgPreviewUrls.map((image) => (
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

      <section>
        <h2 className={styles["title"]}>카테고리</h2>
        <RadioButtonGroup radioList={categoryList} name="show_type" onChange={onChangeForm} defaultValue={form.show_type} />
        {form.show_type === "공연" && (
          <RadioButtonGroup radioList={concertCategoryList} name="show_sub_type" defaultValue={form.show_sub_type} onChange={onChangeForm} />
        )}
        {/* {showType === "스포츠" && (
          <RadioButtonGroup radioList={sportsCategoryList} name="show_sub_type" defaultValue={form.show_sub_type} onChange={onChangeForm} />
        )} */}
      </section>

      <section>
        <h2 className={cx("a11y-hidden", "title")}>주최 정보</h2>
        <InputField
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          value={form.title}
          onChange={onChangeForm}
          style={{ padding: "0 1rem" }}
        >
          제목
        </InputField>
        <InputField
          type="text"
          name="univ"
          placeholder="대학을 입력해주세요."
          value={form.univ}
          onChange={onChangeForm}
          style={{ padding: "0 1rem" }}
        >
          대학
        </InputField>
        <InputField
          type="text"
          name="department"
          placeholder="학과 또는 학부를 입력해주세요."
          value={form.department}
          onChange={onChangeForm}
          style={{ padding: "0 1rem" }}
        >
          학과
        </InputField>
      </section>

      <section>
        <h2 className={styles["title"]}>기간</h2>
        <div className={styles["l_date"]}>
          <DatePicker type="period" startDate={date.start_date} endDate={date.end_date} onChange={handleDateInput} />
        </div>
      </section>

      <section>
        <h2 className={styles["title"]}>주소</h2>
        <div className={styles["l_address"]}>
          <InputField type="text" name="location" placeholder="도로명 주소" value={location} labelHidden style={{ padding: "0 1rem" }} readOnly>
            도로명 주소
          </InputField>
          <Postcode setPosition={setPosition} setLocation={setLocation} />
        </div>
        <InputField
          type="text"
          name="location_detail"
          placeholder="상세 주소"
          value={form.location_detail}
          onChange={onChangeForm}
          labelHidden
          style={{ padding: "0 1rem" }}
        >
          상세 주소
        </InputField>
      </section>

      <section className={styles["tags-section"]}>
        <h2 className={styles["title"]}>태그</h2>
        <TagInput defaultValue={tagsInput} handleChange={handleChangeTags} />
      </section>

      <section>
        <h2 className={styles["title"]}>소개</h2>
        <Editor editorData={editorData} setEditorData={setEditorData} />
      </section>

      <section>
        <h2 className={styles["title"]}>예매 여부</h2>
        <RadioButtonGroup radioList={isReservationList} name="is_reservation" defaultValue={form.is_reservation} onChange={onChangeForm} />
        {form.is_reservation === isReservationList[0] && (
          <>
            <h3 className={styles["title"]}>예매 방법</h3>
            <RadioButtonGroup radioList={methodList} name="method" onChange={onChangeResForm} defaultValue={resForm.method} />
            {resForm.method === methodList[0] && (
              <InputField
                type="url"
                name="google_form_url"
                placeholder="구글폼 URL을 입력해주세요."
                labelHidden
                value={resForm.google_form_url}
                onChange={onChangeResForm}
                // pattern="https://.*"
              >
                구글폼url
              </InputField>
            )}
            {resForm.method === methodList[1] && (
              <ReservationForm
                form={resForm}
                onChange={onChangeResForm}
                roundList={roundList}
                setRoundList={setRoundList}
                editorNoticeData={editorNoticeData}
                setEditorNoticeData={setEditorNoticeData}
              />
            )}
          </>
        )}
      </section>

      {showId ? (
        <div className={styles["button-group"]}>
          <Button type="submit" onClick={handleDeleteShow} reverseColor>
            삭제하기
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(e, "update")}>
            수정하기
          </Button>
        </div>
      ) : (
        <Button type="submit" onClick={(e) => handleSubmit(e, "upload")}>
          업로드하기
        </Button>
      )}
    </form>
  );
};

export default PostCRUDPage;
