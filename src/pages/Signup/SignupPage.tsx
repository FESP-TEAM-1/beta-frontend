import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { SignForm, Button, InputField, InputFieldGroup, Timer } from "@/components/common";
import { checkPassword, checkPasswordMatch, checkEmail } from "@/utils";
import { getDuplicateIdCheck, postSignup } from "@/apis";
import { SignupBodyType } from "@/types";
import betaLogo from "@/assets/beta-logo.png";
import styles from "./SignupPage.module.css";
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

const SignupPage = () => {
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [id, setId] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [password, setPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [matchPassword, setMatchPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState({ phone1: "", phone2: "", phone3: "" });
  const [birthGender, setBirthGender] = useState<BirthdateGenderType>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString(),
    gender: null,
  });
  const [email, setEmail] = useState({ email1: "", email2: "gmail.com" });
  const [emailCertValue, setEmailCertValue] = useState("");
  const [univEmail, setUnivEmail] = useState(""); // 학교 이메일
  const [univName, setUnivName] = useState(""); // 학교 이름

  const [isEmailSend, setIsEmailSend] = useState(false);
  const [showInputField, setShowInputField] = useState(true); // 인증번호 필드
  const [isCodeCheck, setIsCodeCheck] = useState(false); // 인증번호 확인 여부
  const [isStop, setIsStop] = useState(false); // 타이머 정지
  const [reset, setReset] = useState(0); // 타이머 리셋

  const navigate = useNavigate();

  const { zoom } = useResizeZoom(625);

  useEffect(() => {
    if (userType === "user") {
      setUnivEmail("");
      setUnivName("");
      setEmailCertValue("");
    }
  }, [userType]);

  // 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id.isConfirm) {
      toast.error("아이디 중복확인을 해주세요.");
      return;
    }
    if (!password.isConfirm) {
      toast.error("비밀번호는 8자 이상의 영문, 숫자, 특수문자를 사용해 주세요.");
      return;
    }
    if (!matchPassword.isConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isEmailSend) {
      toast.error("이메일 인증을 해주세요.");
      return;
    }
    if (!isCodeCheck) {
      toast.error("인증번호 확인을 해주세요.");
      return;
    }
    if (userType === "admin" && !univEmail) {
      toast.error("학교 이메일을 입력해주세요.");
      return;
    }
    if (userType === "admin" && !univName) {
      toast.error("학교 이름을 입력해주세요.");
      return;
    }

    // 회원가입 api 호출
    const body: SignupBodyType = {
      user_name: name,
      user_email: `${email.email1}@${email.email2}`,
      login_id: id.value,
      login_pw: password.value,
      birth_date: `${birthGender.year}-${birthGender.month}-${birthGender.day}`,
      gender: `${birthGender.gender === "male" ? "1" : "2"}`,
      phone_number: `${phone.phone1}-${phone.phone2}-${phone.phone3}`,
      user_role: userType,
    };
    if (userType === "admin") {
      body["univ_email"] = univEmail;
      body["univ_name"] = univName;
    }

    const { isSuccess, message } = await postSignup(`/api/signup`, body);
    if (isSuccess) {
      navigate("/login");
    } else {
      toast.error(message);
      return;
    }
  };

  // 메인 페이지로 이동
  const moveToMain = () => {
    navigate("/");
  };

  // 아이디 중복확인
  const handleCheckId = async () => {
    // db 조회 후 중복확인
    const data = await getDuplicateIdCheck(id.value);

    if (id.value === "") {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    if (id.value.length < 4 || id.value.length > 20) {
      toast.error("아이디는 4자 이상 20자 이하로 입력해주세요.");
      return;
    }

    if (!data.ok) {
      toast.error("이미 가입된 아이디입니다.");
      return;
    }
    setId({ ...id, isConfirm: true });
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
    const fullEmail = userType === "admin" ? univEmail : `${email.email1}@${email.email2}`;
    const toastId = toast.loading("이메일을 전송중입니다.");
    if (checkEmail(fullEmail)) {
      setIsCodeCheck(false);
      setIsStop(false);
      const body: { user_email: string; univName?: string } = { user_email: fullEmail };
      if (userType === "admin") body["univName"] = univName;
      const endPoint = userType === "user" ? `/api/send-email` : `/api/send-univ-email`;
      const { isSuccess, message } = await postSignup(endPoint, body);
      if (isSuccess) {
        toast.update(toastId, {
          render: "이메일이 전송되었습니다.",
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 2000,
        });
        setReset((prev) => prev + 1);
        setIsEmailSend(true);
        setShowInputField(true);
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
        render: "이메일 형식이 올바르지 않습니다.",
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
  };

  // 인증번호 확인
  const handleCertConfirm = async () => {
    // 인증번호 확인
    const toastId = toast.loading("인증번호를 확인중입니다.");
    const fullEmail = userType === "admin" ? univEmail : `${email.email1}@${email.email2}`;
    const body: { user_email: string; code: string; univName?: string } = { user_email: fullEmail, code: emailCertValue };
    if (userType === "admin") body["univName"] = univName;
    const endPoint = userType === "user" ? `/api/verify-code` : `/api/verify-univ-code`;
    const { isSuccess, message } = await postSignup(endPoint, body);
    if (isSuccess) {
      toast.update(toastId, {
        render: "인증되었습니다.",
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

  // 타이머 종료
  const handleTimeEnd = () => {
    setShowInputField(false);
  };

  return (
    <main className={styles["sign-main"]} style={{ zoom: zoom }}>
      <img src={betaLogo} alt="로고 이미지" className={styles["logo-img"]} onClick={moveToMain} />
      <SignForm userType={userType} setUserType={setUserType}>
        <form onSubmit={handleSubmit} className={styles["sign-section-form"]}>
          <div className={styles["sign-section-form-group"]}>
            <InputField
              required
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요."
              maxlength={20}
              value={id.value}
              onChange={(e) => setId({ ...id, value: e.currentTarget.value })}
              isConfirm={id.isConfirm}
            >
              아이디
            </InputField>
            <Button onClick={handleCheckId}>중복확인</Button>
          </div>
          <InputField
            required
            type="password"
            name="password"
            placeholder="8자 이상 영문, 숫자, 특수문자를 입력해주세요."
            value={password.value}
            onChange={handlePassword}
            isConfirm={password.isConfirm}
          >
            비밀번호
          </InputField>
          <InputField
            required
            type="password"
            name="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={matchPassword.value}
            onChange={handleCheckPassword}
            isConfirm={matchPassword.isConfirm}
          >
            비밀번호 확인
          </InputField>
          <InputField required type="text" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.currentTarget.value)}>
            이름
          </InputField>
          <InputFieldGroup required type="phone" name="phone" values={phone} setValues={setPhone} />
          <InputFieldGroup required type="birthdate-gender" name="gender" values={birthGender} setValues={setBirthGender} />
          {userType === "user" ? (
            <div className={styles["sign-section-form-group"]}>
              <InputFieldGroup required type="email" name="email" values={email} setValues={setEmail} userType={userType} />
              <Button onClick={handleSendEmail}>인증</Button>
            </div>
          ) : (
            <>
              <InputField
                required
                type="text"
                placeholder="abc@mail.hongik.ac.kr"
                value={univEmail}
                onChange={(e) => setUnivEmail(e.currentTarget.value)}
              >
                학교 이메일
              </InputField>

              <div className={styles["sign-section-form-group"]}>
                <InputField
                  required
                  type="text"
                  placeholder="대학교 이름 (ex. 홍익대학교)"
                  value={univName}
                  onChange={(e) => setUnivName(e.currentTarget.value)}
                >
                  학교 이름
                </InputField>
                <Button onClick={handleSendEmail}>인증</Button>
              </div>
            </>
          )}
          {isEmailSend && showInputField && (
            <div className={cx("sign-section-form-group", "top-minus10")}>
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
              <Timer initialTime={180} isStop={isStop} reset={reset} onTimeEnd={handleTimeEnd} />
            </div>
          )}

          <Button type="submit">회원가입</Button>
        </form>
      </SignForm>
    </main>
  );
};

export default SignupPage;
