import { useReservationFormStore } from "@/stores";
import { Link, useSearchParams } from "react-router-dom";

const PayFailPage = () => {
  const { reservationForm } = useReservationFormStore();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  return (
    <div className="wrapper w-100">
      <div className="flex-column align-center  max-w-540 responsive">
        <img src="https://static.toss.im/lotties/error-spot-apng.png" width="120" height="120" />
        <h2 className="title">결제를 실패했어요</h2>
        <div className="response-section w-100">
          <div className="flex justify-between">
            <span className="response-label">code</span>
            <span id="error-code" className="response-text">
              {errorCode}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="response-label">message</span>
            <span id="error-message" className="response-text">
              {errorMessage}
            </span>
          </div>
        </div>

        <div className="w-100 button-group">
          <div className="flex" style={{ gap: "16px" }}>
            <Link to={`/detail/${reservationForm?.show_id}`} className={"btn w-100"}>
              뒤로 가기
            </Link>
            <Link to="/" className={"btn w-100 red"}>
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayFailPage;
