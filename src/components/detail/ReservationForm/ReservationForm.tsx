import { useState } from "react";
import { useParams } from "react-router-dom";
import { queryClient } from "@/main";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button, CheckBox, InputField, InputFieldGroup } from "@/components/common";
import { useInputs } from "@/hooks";
import { useModalStore, useReservationFormStore } from "@/stores";
import { UserReservationInputsType, MemberType, UserReservationFormType, ShowReservationInfoType } from "@/types";
import { convertBase64ToBytes } from "@/utils";
import { postReservation } from "@/apis";
import RadioStyles from "@/components/common/RadioButtonGroup/RadioButtonGroup.module.css";
import styles from "./ReservationForm.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(RadioStyles);

interface PropsType {
  goToPaymentStep: () => void;
}

const ReservationForm: React.FC<PropsType> = ({ goToPaymentStep }) => {
  const { id: showId } = useParams();
  const { setOpenModal } = useModalStore();

  const { location, price, date_time, notice, show_id } = queryClient.getQueryData<ShowReservationInfoType>(["reservationData", showId])!;
  const { user_name, user_email, phone_number } = queryClient.getQueryData<MemberType>(["userInfo"])!;

  const [email1, email2] = user_email.split("@");
  const [phone1, phone2, phone3] = phone_number.split("-");
  const decodedNotice = new TextDecoder().decode(convertBase64ToBytes(notice));
  const [form, onChange] = useInputs<UserReservationInputsType>({
    show_times_id: -1,
    is_receive_email: false,
  });

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const { setReservationForm } = useReservationFormStore();

  const submitFreeReservation = async (reservationParam: UserReservationFormType) => {
    setSubmitBtnDisabled(true);
    const toastId = toast.loading("예매 진행 중...");
    try {
      await postReservation(reservationParam);

      toast.update(toastId, {
        render: (
          <p>
            예매 성공하였습니다. <br />
            마이페이지에서 확인하세요.
          </p>
        ),
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
      setOpenModal({ state: false, type: "" });
    } catch (err) {
      toast.update(toastId, {
        render: (err as AxiosError).message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setSubmitBtnDisabled(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formParam: UserReservationFormType = {
      show_id,
      show_times_id: form.show_times_id,
      is_receive_email: form.is_receive_email ? 1 : 0,
    } as const;

    if (form.show_times_id === -1) {
      toast.warn("회차를 선택해주세요");
      return;
    }

    setReservationForm(formParam);
    if (price !== 0) {
      goToPaymentStep();
      return;
    }

    submitFreeReservation(formParam);
  };

  return (
    <>
      <div className={styles["show-info"]}>
        <h2>공연 정보</h2>
        <p>
          <span>장소: </span>
          {location}
        </p>
        <p>
          <span>가격: </span>
          {price}원
        </p>
      </div>

      <div className={styles["show-notice"]}>
        <h2>티켓 예매 시 유의 사항</h2>
        <div dangerouslySetInnerHTML={{ __html: decodedNotice }}></div>
      </div>

      <form id="reservation" onSubmit={handleSubmit}>
        <div className={styles["show-round"]}>
          <h2>회차 선택</h2>
          <fieldset className={cx("fieldset", "column")}>
            {date_time.map((item) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name={"show_times_id"}
                  value={item.id}
                  checked={item.id === form.show_times_id}
                  onChange={onChange}
                  disabled={item.head_count === 0}
                />
                <span>{item.date_time}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className={styles["show-reservation-user-info"]}>
          <h2>예매자 정보</h2>
          <InputField type="text" name="name" value={user_name} readOnly>
            이름
          </InputField>
          <InputFieldGroup type="phone" name="phone" values={{ phone1, phone2, phone3 }} readOnly />
          <InputFieldGroup type="email" name="email" values={{ email1, email2 }} userType="user" readOnly />

          <CheckBox inputId="이메일받기" name="is_receive_email" checked={!!form.is_receive_email} onChange={onChange}>
            예매 완료 이메일 전송 동의
          </CheckBox>
        </div>
      </form>

      <Button type="submit" form="reservation" disabled={submitBtnDisabled}>
        예매하기
      </Button>
    </>
  );
};

export default ReservationForm;

{
  /* TODO: show_sub_type일때  */
}
{
  /* {show_sub_type === "연극" && (
        <div className={styles["show-agreement"]}>
          <h2 className="a11y-hidden">동의서</h2>
          <CheckBox inputId="외부 유출 금지 동의">
            본 공연에 대한 권리는 모두 00대학교 oo학과 및 '제목' 제작진에게 있으므로 관람 시 무단 녹화, 캡처, 녹음 및 유출 등 모든 외부 유출을 절대
            금지합니다.
          </CheckBox>
          <CheckBox inputId="노쇼 (NO SHOW) 및 양도 방지">
            예매자 본인은 본 공연을 관람 가능한 일시에 예매 하고 있으며, 확정된 예매 티켓을 타인에게 무단으로 양도하지 않을 것을 동의합니다. 이후
            사전에 취소 절차를 진행하지 않고 공연을 노쇼(NO SHOW)하게 될 경우 이에 따르는 불이익을 예매자 본인이 책임지는 것에 동의합니다.
            <span>*노쇼 (NO SHOW)및 무단양도 관객의 경우 다음 oo대학교 oo학과 공연 예매가 제한 될 수 있음을 안내드립니다.</span>
          </CheckBox>
        </div>
      )} */
}
