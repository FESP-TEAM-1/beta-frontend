import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignForm, Button, InputField } from "@/components/common";
import { patchUserLogin } from "@/apis/patchUserLogin";
import { useLoginStore } from "@/stores/useLoginStore";
import betaLogo from "@/assets/beta-logo.png";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const { setUserState } = useLoginStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await patchUserLogin(id, password, userType);

    // TODO: alert 부분은 toast로 변경
    if (res.isSuccess) {
      // alert("로그인 성공");
      setUserState(res.userLoginInfo);
      if (state?.from) {
        navigate("/", { replace: true });
        // navigate(`${state.from.pathname}`, { replace: true });
      } else {
        // TODO: 로그인 버튼을 눌렀을 때, 로그인 이전 페이지로 이동하게 해야 함
        navigate("/", { replace: true });
      }
    } else {
      alert(res.message);
    }
  };

  const moveToMain = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className={styles["login-main"]}>
      <div className={styles["logo-div"]}>
        <img src={betaLogo} alt="로고 이미지" className={styles["logo-img"]} onClick={moveToMain} />
      </div>
      <SignForm userType={userType} setUserType={setUserType}>
        <form onSubmit={handleSubmit} className={styles["login-section-form"]}>
          <InputField required={false} type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(e) => setId(e.target.value)}>
            아이디
          </InputField>
          <InputField
            required={false}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            비밀번호
          </InputField>
          <Button type="submit">로그인</Button>
        </form>
      </SignForm>
      <section className={styles["login-link"]}>
        <Link to="/signup">회원가입</Link>
        <span className={styles["login-link-span"]}>|</span>
        <Link to="/findPW">비밀번호 찾기</Link>
      </section>
    </main>
  );
};

export default LoginPage;
