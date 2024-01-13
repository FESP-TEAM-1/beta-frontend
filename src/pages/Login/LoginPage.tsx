import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignForm, Button, InputField } from "@/components/common";
import { patchMemberLogin } from "@/apis";
import { useLoginStore } from "@/stores";
import { useResizeZoom } from "@/hooks";
import betaLogo from "@/assets/beta-logo.png";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const { setUserState } = useLoginStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { zoom } = useResizeZoom(625);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await patchMemberLogin(id, password, userType);

    if (res.isSuccess) {
      setUserState(res.userLoginInfo);
      if (state?.from) {
        navigate(`${state.from.pathname}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      toast.error(res.message);
    }
  };

  const moveToMain = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className={styles["login-main"]} style={{ zoom: zoom }}>
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
