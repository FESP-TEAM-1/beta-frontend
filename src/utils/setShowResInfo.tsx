import { ShowFormType, ShowResFormType, ShowReservationInfoType } from "@/types";
import { UseFormSetValue } from "react-hook-form";
import { convertBase64ToBytes } from ".";

interface ParamsType {
  showResInfoData: ShowReservationInfoType;
  setValue: UseFormSetValue<ShowFormType & ShowResFormType>;
}

const setShowResInfo = ({ showResInfoData, setValue }: ParamsType) => {
  const keysOfShowResInfo: Array<keyof ShowReservationInfoType> = ["method", "google_form_url", "price", "head_count", "notice"];

  keysOfShowResInfo.forEach((key) => {
    if (key === "method") setValue("method", showResInfoData.method === "google" ? "구글폼" : "예매 대행");
    else if (key === "notice") showResInfoData.notice && setValue("notice", new TextDecoder().decode(convertBase64ToBytes(showResInfoData.notice)));
    else setValue(key as string, showResInfoData[key]);
  });
};

export default setShowResInfo;
