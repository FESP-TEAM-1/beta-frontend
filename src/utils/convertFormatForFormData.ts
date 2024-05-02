import { DateWithTimeObj, ShowFormResultType, ShowFormType, ShowResFormType } from "@/types";
import { convertBytesToBase64, convertArrayToObject, convertRoundListToObject, formatDate } from ".";

const convertFormatForFormData = (data: ShowFormType & ShowResFormType, main_image_color: string, position: object, roundList: DateWithTimeObj[]) => {
  const base64EncodedContents = (!!data.content && convertBytesToBase64(new TextEncoder().encode(data.content))) || null;
  const base64EncodedNotice = (data.method === "예매 대행" && !!data.notice && convertBytesToBase64(new TextEncoder().encode(data.notice))) || null;

  const result: ShowFormResultType = {
    main_image_color: main_image_color as string,
    ...data,
    show_sub_type: data.show_type === "전시" ? null : data.show_sub_type,
    start_date: formatDate(data.start_date!),
    end_date: formatDate(data.end_date!),
    position: JSON.stringify(position),
    tags: JSON.stringify(convertArrayToObject(data.tags)),
    content: base64EncodedContents,
    is_reservation: data.is_reservation === "예" ? "1" : "0",
    method: data.is_reservation === "예" ? (data.method === "구글폼" ? "google" : "agency") : null,
    google_form_url: (data.method === "구글폼" && data.google_form_url) || null,
    price: (data.method === "예매 대행" && (data.price as number).toString()) || null,
    head_count: (data.method === "예매 대행" && (data.head_count as number).toString()) || null,
    date_time: (data.method === "예매 대행" && JSON.stringify(convertRoundListToObject(roundList))) || null,
    notice: base64EncodedNotice,
  };
  return result;
};
export default convertFormatForFormData;
