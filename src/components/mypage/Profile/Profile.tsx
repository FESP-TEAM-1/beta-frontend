import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { InputField, InputFieldGroup, Button, Timer } from "@/components/common";
import styles from "./Profile.module.css";
import { checkPassword, checkPasswordMatch } from "@/utils";
import { checkEmail } from "@/utils";

const item = {
  user_id: "test",
  user_name: "홍길동",
  user_email: "test@naver.com",
  user_phone: "010-1234-5678",
  user_birthdate: "1990-01-01",
  user_gender: 1,
  user_role: "user",
};

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

const Profile = () => {
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
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [emailCertValue, setEmailCertValue] = useState("");
  const [time, setTime] = useState(180); // 3분

  useEffect(() => {
    const [year, month, day] = item.user_birthdate.split("-");
    const [phone1, phone2, phone3] = item.user_phone.split("-");
    const [email1, email2] = item.user_email.split("@");

    setName(item.user_name);
    setPhone({ phone1, phone2, phone3 });
    setBirthGender({ year, month, day, gender: item.user_gender === 1 ? "male" : "female" });
    setEmail({ email1, email2 });
  }, []);

  // 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      타입: item.user_role,
      아이디: item.user_id,
      비밀번호: password.value,
      이름: name,
      전화번호: `${phone.phone1}-${phone.phone2}-${phone.phone3}`,
      생년월일: `${birthGender.year}-${birthGender.month}-${birthGender.day}`,
      성별: `${birthGender.gender === "male" ? 1 : 2}`,
      이메일: `${email.email1}@${email.email2}`,
    });
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
  const handleSendEmail = () => {
    const fullEmail = `${email.email1}@${email.email2}`;
    if (checkEmail(fullEmail)) {
      if (fullEmail !== item.user_email) {
        // 인증번호 이메일 발송
        console.log("이메일 전송");
        setTime(180);
        setIsEmailSend(true);
      }
    }
  };

  // 인증번호 확인
  const handleCertConfirm = () => {
    // 인증번호 확인
    console.log("인증번호 확인");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["profile-section-form"]}>
      <div className={styles["profile-section-form-group"]}>
        <InputField required type="text" value={item.user_id} readOnly>
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
      <div className={styles["profile-section-form-group"]}>
        <InputFieldGroup required type="email" name="email" values={email} setValues={setEmail} userType={"user"} />
        <Button onClick={handleSendEmail}>인증</Button>
      </div>
      {isEmailSend && time > 0 && (
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
          <Button onClick={handleCertConfirm}>확인</Button>
          <Timer time={time} setTime={setTime} />
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

export default Profile;
