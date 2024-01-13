// TODO: 해당 type 선언 파일 위치 수정 필요
import { EmailValues, PhoneValues } from "@/components/common/InputFieldGroup/InputFieldGroupType";

export interface FormInputs {
  [key: string]: PhoneValues | EmailValues | number | boolean | string | object | null;
}
