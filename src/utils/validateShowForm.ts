import { ShowFormType, ShowResFormType } from "@/types";

const validateShowForm = (imgCnt: number, data: ShowFormType & ShowResFormType, dateTimeLength: number) => {
  if (imgCnt < 2) {
    return { isValid: false, message: "이미지를 2개 이상 업로드 해주세요." };
  }
  if (imgCnt > 10) {
    return { isValid: false, message: "이미지를 10개 이하로 업로드 해주세요." };
  }
  if (!data.title || !data.univ || !data.department) {
    return { isValid: false, message: "주최자 정보를 입력해주세요." };
  }
  if (!data.start_date || !data.end_date) {
    return { isValid: false, message: "기간을 입력해주세요." };
  }
  if (!location) {
    return { isValid: false, message: "주소를 입력해주세요." };
  }
  if (!data.tags.length) {
    return { isValid: false, message: "tag를 입력해주세요." };
  }
  if (data.is_reservation === "예") {
    if (data.method === "구글폼" && !data.google_form_url) {
      return { isValid: false, message: "구글폼 URL을 입력해주세요." };
    }
    if (data.method === "예매 대행" && (data.price === null || !data.head_count || !dateTimeLength || !data.notice)) {
      return { isValid: false, message: "예매 작성 폼을 완성해주세요." };
    }
  }
  return { isValid: true, message: "" };
};

export default validateShowForm;
