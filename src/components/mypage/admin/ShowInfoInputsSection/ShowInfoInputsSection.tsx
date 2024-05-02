import { useFormContext } from "react-hook-form";
import { CATEGORY_LIST, CONCERT_CATEGORY_LIST, IS_RESERVATION_LIST } from "@/utils";
import { DatePickerRHF, Editor, InputFieldRHF, RadioButtonGroupRHF, TagInputRHF } from "@/components/common";
import { Postcode } from "../..";
import styles from "./ShowInfoInputsSection.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  setPosition: React.Dispatch<React.SetStateAction<object>>;
}

const ShowInfoInputsSection: React.FC<PropsType> = ({ setPosition }) => {
  const { watch } = useFormContext();
  const watchShowType = watch("show_type");

  return (
    <>
      <section>
        <h2 className={styles["title"]}>카테고리</h2>
        <RadioButtonGroupRHF radioList={CATEGORY_LIST} name="show_type" />
        {watchShowType === "공연" && <RadioButtonGroupRHF radioList={CONCERT_CATEGORY_LIST} name="show_sub_type" />}
      </section>

      <section>
        <h2 className={cx("a11y-hidden", "title")}>주최 정보</h2>
        <InputFieldRHF type="text" placeholder="제목을 입력해주세요." style={{ padding: "0 1rem" }} name="title">
          제목
        </InputFieldRHF>
        <InputFieldRHF type="text" placeholder="대학을 입력해주세요." style={{ padding: "0 1rem" }} name="univ">
          대학
        </InputFieldRHF>
        <InputFieldRHF type="text" placeholder="학과 또는 학부를 입력해주세요." style={{ padding: "0 1rem" }} name="department">
          학과
        </InputFieldRHF>
      </section>

      <section>
        <h2 className={styles["title"]}>기간</h2>
        <div className={styles["l_date"]}>
          <DatePickerRHF type="period" />
        </div>
      </section>

      <section>
        <h2 className={styles["title"]}>주소</h2>
        <div className={styles["l_address"]}>
          <InputFieldRHF type="text" placeholder="도로명 주소" labelHidden style={{ padding: "0 1rem" }} readOnly name="location">
            도로명 주소
          </InputFieldRHF>
          <Postcode setPosition={setPosition} />
        </div>
        <InputFieldRHF type="text" placeholder="상세 주소" labelHidden style={{ padding: "0 1rem" }} name="location_detail">
          상세 주소
        </InputFieldRHF>
      </section>

      <section className={styles["tags-section"]}>
        <h2 className={styles["title"]}>태그</h2>
        <TagInputRHF />
      </section>

      <section>
        <h2 className={styles["title"]}>소개</h2>
        <Editor name="content" />
      </section>

      <section>
        <h2 className={styles["title"]}>예매 여부</h2>
        <RadioButtonGroupRHF radioList={IS_RESERVATION_LIST} name="is_reservation" />
      </section>
    </>
  );
};

export default ShowInfoInputsSection;
