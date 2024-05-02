import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, CheckBox, InputField, InputFieldGroup } from "@/components/common";
import { useInputs, useReservationAlert } from "@/hooks";
import { useLoginStore, useModalStore, useReservationFormStore } from "@/stores";
import { UserReservationInputsType, MemberType, UserReservationFormType, ShowReservationInfoType } from "@/types";
import { convertBase64ToBytes } from "@/utils";
import { postPayVerification, postReservation } from "@/apis";
import RadioStyles from "@/components/common/RadioButtonGroup/RadioButtonGroup.module.css";
import styles from "./ReservationForm.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(RadioStyles);

interface PropsType {
  goToPaymentStep: () => void;
}

const ReservationForm: React.FC<PropsType> = ({ goToPaymentStep }) => {
  const queryClient = useQueryClient();
  const { id: showId } = useParams();
  const {
    userState: { login_id },
  } = useLoginStore();

  // 공연 예매 정보(공연정보 및 회차/가격 정보)
  const { location, price, date_time, notice, show_id } = queryClient.getQueryData<ShowReservationInfoType>(["reservationData", showId])!;

  // 유저의 예매폼 정보
  const { user_name, user_email, phone_number } = queryClient.getQueryData<MemberType>(["userInfo"])!;
  const { reservationForm, setReservationForm } = useReservationFormStore();

  const [email1, email2] = user_email.split("@");
  const [phone1, phone2, phone3] = phone_number.split("-");
  const decodedNotice = new TextDecoder().decode(convertBase64ToBytes(notice));
  const [form, onChange] = useInputs<UserReservationInputsType>({
    show_times_id: -1,
    is_receive_email: false,
  });

  const { showReservationSuccessAlert, showReservationFailAlert } = useReservationAlert();
  const { setOpenModal } = useModalStore();
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const submitFreeReservation = async () => {
    await postReservation(reservationForm!);
    showReservationSuccessAlert();

    queryClient.invalidateQueries({
      queryKey: ["infoData", showId, login_id],
    });

    setOpenModal({ state: false, type: "" });
  };

  const submitReservation = async (formParam: UserReservationFormType) => {
    toast.dismiss();
    setSubmitBtnDisabled(true);
    try {
      await postPayVerification(formParam); // 예매 검증

      if (price !== 0) {
        goToPaymentStep();
        return;
      }

      await submitFreeReservation();
    } catch (err) {
      let errorMessage = "예매에 실패하였습니다.";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      showReservationFailAlert(errorMessage);
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
    submitReservation(formParam);
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

      <Button type="submit" form="reservation" disabled={submitBtnDisabled} loading={submitBtnDisabled}>
        예매하기
      </Button>
    </>
  );
};

export default ReservationForm;
