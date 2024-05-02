import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useReservationFormStore } from "@/stores";
import { postTossConfirm } from "@/apis";
import CheckBoxIconSrc from "@/assets/checkbox-payment.svg";
import "@/styles/payment.css";

const PaySuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const paymentKey = searchParams.get("paymentKey");

  const { reservationForm } = useReservationFormStore();
  useEffect(() => {
    const confirm = async () => {
      try {
        await postTossConfirm({ orderId: orderId!, amount: amount!, paymentKey: paymentKey!, ...reservationForm! });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data.message;
          const status = err.response?.status;
          navigate(`/payment/fail?code=${status}&message=${encodeURIComponent(message)}`);
        }
      }
    };
    confirm();
  }, []);

  return (
    <div className="wrapper w-100">
      <div
        className="flex-column align-center confirm-success max-w-540 responsive"
        style={{
          display: "flex",
        }}
      >
        <img src={CheckBoxIconSrc} width="120" height="120" />
        <h2 className="title">결제를 완료했어요</h2>
        <div className="response-section w-100">
          <div className="flex justify-between">
            <span className="response-label">결제 금액</span>
            <span id="amount" className="response-text">
              {Number(searchParams.get("amount")).toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="response-label">주문번호</span>
            <span id="orderId" className="response-text">
              {searchParams.get("orderId")}
            </span>
          </div>
        </div>

        <div className="w-100 button-group">
          <div className="flex" style={{ gap: "16px" }}>
            <Link to="/mypage/user/reservation" className="btn w-100 ">
              마이페이지에서 확인
            </Link>
            <Link to="/" className="btn w-100 red">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySuccessPage;
