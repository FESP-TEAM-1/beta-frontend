import { useFormContext } from "react-hook-form";
import { InputFieldRHF, RadioButtonGroupRHF } from "@/components/common";
import { ReservationForm } from "@/components/mypage";
import { DateWithTimeObj } from "@/types";
import { METHOD_LIST } from "@/utils";
import styles from "./ShowResInfoInputsSection.module.css";

interface PropsType {
  roundList: DateWithTimeObj[];
  setRoundList: React.Dispatch<React.SetStateAction<DateWithTimeObj[]>>;
}

const ShowResInfoInputsSection: React.FC<PropsType> = ({ roundList, setRoundList }) => {
  const { watch } = useFormContext();
  const watchMethod = watch("method");

  return (
    <section>
      <h3 className={styles["title"]}>예매 방법</h3>
      <RadioButtonGroupRHF radioList={METHOD_LIST} name="method" />
      {watchMethod === METHOD_LIST[0] && (
        <InputFieldRHF
          type="url"
          placeholder="구글폼 URL을 입력해주세요."
          labelHidden
          name="google_form_url"
          // pattern="https://.*"
        >
          구글폼url
        </InputFieldRHF>
      )}
      {watchMethod === METHOD_LIST[1] && <ReservationForm roundList={roundList} setRoundList={setRoundList} />}
    </section>
  );
};

export default ShowResInfoInputsSection;
