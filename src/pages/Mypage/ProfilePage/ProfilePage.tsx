import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { InputField, InputFieldGroup, Button, Timer } from "@/components/common";
import { checkEmail, checkPassword, checkPasswordMatch } from "@/utils";
import { ProfileBodyType } from "@/types";
import { getMemberInfo, postSignup, putProfile } from "@/apis";
import styles from "./ProfilePage.module.css";
import { useResizeZoom } from "@/hooks";

interface BirthdateGenderType {
  year: string;
  month: string;
  day: string;
  gender: "male" | "female" | null;
}

interface idPasswordCheck {
  value: string;
  isConfirm: boolean;
}

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const [password, setPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [matchPassword, setMatchPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState({ phone1: "", phone2: "", phone3: "" });
  const [birthGender, setBirthGender] = useState<BirthdateGenderType>({
    year: "",
    month: "",
    day: "",
    gender: null,
  });
  const [email, setEmail] = useState({ email1: "", email2: "" });
  const [emailCertValue, setEmailCertValue] = useState("");
  const [univEmail, setUnivEmail] = useState(""); // 학교 이메일
  // const [univName, setUnivName] = useState(""); // 학교 이름

  const [isEmailSend, setIsEmailSend] = useState(false);
  const [time, setTime] = useState(180); // 3분
  const [isCodeCheck, setIsCodeCheck] = useState(false); // 인증번호 확인 여부
  const [isStop, setIsStop] = useState(false); // 타이머 정지

  const { zoom } = useResizeZoom(600);

  const { data, status, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getMemberInfo(),
  });

  useEffect(() => {
    if (data) {
      const [year, month, day] = data.birth_date.split("-");
      const [phone1, phone2, phone3] = data.phone_number.split("-");
      const [email1, email2] = data.user_email.split("@");
      setName(data.user_name);
      setPhone({ phone1, phone2, phone3 });
      setBirthGender({ year, month, day, gender: data.gender === 1 ? "male" : "female" });
      setEmail({ email1, email2 });
      setUnivEmail(data.user_email);
    }
  }, [data]);

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  // 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullEmail = `${email.email1}@${email.email2}`;
    const phone_number = `${phone.phone1}-${phone.phone2}-${phone.phone3}`;
    const birth_date = `${birthGender.year}-${birthGender.month}-${birthGender.day}`;
    const gender = `${birthGender.gender === "male" ? "1" : "2"}`;

    if (password.value && matchPassword.value) {
      if (!password.isConfirm) {
        toast.error("비밀번호는 8자 이상의 영문, 숫자, 특수문자를 사용해 주세요.");
        return;
      }

      if (!matchPassword.isConfirm) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    if (
      name === data.user_name &&
      fullEmail === data.user_email &&
      phone_number === data.phone_number &&
      birth_date === data.birth_date &&
      gender === String(data.gender) &&
      !matchPassword.value
    ) {
      toast.error("수정할 내용이 없습니다.");
      return;
    }

    if (fullEmail !== data.user_email) {
      if (!isEmailSend) {
        toast.error("이메일 인증을 해주세요.");
        return;
      }
      if (!isCodeCheck) {
        toast.error("인증번호 확인을 해주세요.");
        return;
      }
    }

    const body: ProfileBodyType = {
      user_name: name,
      user_email: `${email.email1}@${email.email2}`,
      login_pw: password.value,
      birth_date,
      gender,
      phone_number,
      user_role: data.user_role as "user" | "admin",
    };

    const { isSuccess, message } = await putProfile(`/api/updateMember`, body);
    if (isSuccess) {
      toast.success("회원정보 수정 완료");
    } else {
      toast.error(message);
      return;
    }
  };

  // 비밀번호
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, value: e.currentTarget.value, isConfirm: checkPassword(e.currentTarget.value) });
  };

  // 비밀번호 확인
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchPassword({ ...checkPassword, value: e.currentTarget.value, isConfirm: checkPasswordMatch(password.value, e.currentTarget.value) });
  };

  // 이메일 전송
  const handleSendEmail = async () => {
    const fullEmail = `${email.email1}@${email.email2}`;
    if (checkEmail(fullEmail)) {
      const toastId = toast.loading("이메일을 전송중입니다.");
      if (fullEmail !== data.user_email) {
        setIsCodeCheck(false);
        setIsStop(false);
        const body: { user_email: string } = { user_email: fullEmail };
        const endPoint = `/api/send-email`;
        const { isSuccess, message } = await postSignup(endPoint, body);
        if (isSuccess) {
          toast.update(toastId, {
            render: "이메일 전송 완료 인증번호를 입력해주세요.",
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 2000,
          });
          setTime(180);
          setIsEmailSend(true);
        } else {
          toast.update(toastId, {
            render: message,
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 2000,
          });
          setIsEmailSend(false);
          return;
        }
      } else {
        toast.update(toastId, {
          render: "현재 이메일과 동일합니다.",
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 2000,
        });
        return;
      }
    }
  };

  // 인증번호 확인
  const handleCertConfirm = async () => {
    // 인증번호 확인
    const toastId = toast.loading("이메일을 전송중입니다.");
    const fullEmail = `${email.email1}@${email.email2}`;
    const body: { user_email: string; code: string } = { user_email: fullEmail, code: emailCertValue };
    const endPoint = `/api/verify-code`;
    const { isSuccess, message } = await postSignup(endPoint, body);
    if (isSuccess) {
      toast.update(toastId, {
        render: "인증 완료",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
      setIsCodeCheck(true);
      setIsStop(true);
    } else {
      toast.update(toastId, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["profile-section-form"]} style={{ zoom: zoom }}>
      <div className={styles["profile-section-form-group"]}>
        <InputField required type="text" value={data.login_id} readOnly>
          아이디
        </InputField>
      </div>
      <InputField
        type="password"
        name="password"
        placeholder="8자 이상 영문, 숫자, 특수문자를 입력해주세요."
        value={password.value}
        onChange={handlePassword}
        isConfirm={password.isConfirm}
      >
        새 비밀번호
      </InputField>
      <InputField
        type="password"
        name="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={matchPassword.value}
        onChange={handleCheckPassword}
        isConfirm={matchPassword.isConfirm}
      >
        새 비밀번호 확인
      </InputField>
      <InputField required type="text" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.currentTarget.value)}>
        이름
      </InputField>
      {data.user_role === "user" ? (
        <div className={styles["profile-section-form-group"]}>
          <InputFieldGroup required type="email" name="email" values={email} setValues={setEmail} userType={"user"} />
          <Button onClick={handleSendEmail}>인증</Button>
        </div>
      ) : (
        <>
          <InputField
            type="text"
            placeholder="abc@mail.hongik.ac.kr"
            value={univEmail}
            readOnly
            onChange={(e) => setUnivEmail(e.currentTarget.value)}
          >
            학교 이메일
          </InputField>
        </>
      )}
      {data.user_role === "user" && isEmailSend && time > 0 && (
        <div className={cx("profile-section-form-group", "top-minus10")}>
          <InputField
            required
            type="text"
            name="email-cert"
            placeholder="인증번호를 입력해주세요."
            value={emailCertValue}
            onChange={(e) => setEmailCertValue(e.currentTarget.value)}
            labelHidden={true}
          >
            인증번호
          </InputField>
          <Button onClick={handleCertConfirm} disabled={isCodeCheck}>
            확인
          </Button>
          <Timer time={time} setTime={setTime} isStop={isStop} />
        </div>
      )}
      <InputFieldGroup required type="birthdate-gender" name="gender" values={birthGender} setValues={setBirthGender} />
      <InputFieldGroup required type="phone" name="phone" values={phone} setValues={setPhone} />

      <div className={styles["profile-submit-button"]}>
        <Button type="submit">수정 완료</Button>
      </div>
    </form>
  );
};

export default ProfilePage;
