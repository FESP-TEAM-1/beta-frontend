import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useReservationFormStore } from "@/stores";
import CheckBoxIconSrc from "@/assets/checkbox-payment.svg";
import { postReservation } from "@/apis";

interface ErrorType {
  response: { data: { code: string; message: string } };
}
const PaySuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const paymentKey = searchParams.get("paymentKey");

  const { reservationForm } = useReservationFormStore();

  useEffect(() => {
    const requestData = {
      orderId,
      amount,
      paymentKey,
    };

    const secretKey = import.meta.env.VITE_APP_TOSS_PAYMENTS_SECRET_KEY as string;
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    const confirm = async () => {
      try {
        await axios.post("https://api.tosspayments.com/v1/payments/confirm", requestData, {
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
          },
        });

        await postReservation({ orderId: orderId!, amount: amount!, ...reservationForm! });
      } catch (err) {
        if (err === "서버 요청 실패") {
          // Todo 성공했던 결제 취소 및 navigate
          return;
        }
        const { code, message } = (err as ErrorType).response.data;
        navigate(`/payment/fail?code=${code}&message=${message}`);
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
