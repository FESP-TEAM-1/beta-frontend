import { ShowFormType, ShowResFormType, ShowType } from "@/types";
import { convertBase64ToBytes } from "@/utils";
import { UseFormSetValue } from "react-hook-form";

interface ParamsType {
  showInfoData: ShowType;
  setValue: UseFormSetValue<ShowFormType & ShowResFormType>;
}

const setShowInfo = ({ showInfoData, setValue }: ParamsType) => {
  const keysOfShowInfo: Array<keyof ShowType> = [
    "show_type",
    "show_sub_type",
    "title",
    "start_date",
    "end_date",
    "location",
    "location_detail",
    // "position",
    "univ",
    "department",
    "tags",
    "content",
    "is_reservation",
  ];

  keysOfShowInfo.forEach((key) => {
    if (key === "start_date" || key === "end_date") {
      setValue(key as string, new Date(showInfoData[key]));
    } else if (key === "tags") {
      showInfoData.tags?.length && setValue("tags", Object.values(JSON.parse(showInfoData.tags)) as string[]);
    } else if (key === "content") {
      showInfoData.content && setValue("content", new TextDecoder().decode(convertBase64ToBytes(showInfoData.content)));
    } else if (key === "is_reservation") {
      setValue("is_reservation", showInfoData.is_reservation === 0 ? "아니오" : "예");
    } else {
      setValue(key as string, showInfoData[key]!);
    }
  });
};

export default setShowInfo;
