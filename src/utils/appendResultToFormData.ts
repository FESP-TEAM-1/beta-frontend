import { ShowFormResultType } from "@/types";

const appendResultToFormData = (formData: FormData, result: ShowFormResultType) => {
  const keysToAppend: Array<keyof ShowFormResultType> = [
    "show_type",
    "show_sub_type",
    "title",
    "univ",
    "department",
    "start_date",
    "end_date",
    "location",
    "location_detail",
    "position",
    "main_image_color",
    "tags",
    "content",
    "is_reservation",
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
      formData.append(key as string, result[key] as string);
    }
  }
  return;
};

export default appendResultToFormData;
