import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { queryClient } from "@/main";
import { useQuery } from "@tanstack/react-query";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { MemberType, ShowReservationInfoType } from "@/types";
import "./style.css";

const selector = "#payment-widget";
const clientKey = import.meta.env.VITE_APP_TOSS_PAYMENTS_CLIENT_KEY as string;
const customerKey = nanoid();

const ReservationPayment: React.FC = () => {
  const { id: showId } = useParams();
  const { price, title } = queryClient.getQueryData<ShowReservationInfoType>(["reservationData", showId])!;
  const { user_name, user_email, phone_number } = queryClient.getQueryData<MemberType>(["userInfo"])!;

  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price! }, { variantKey: "DEFAULT" }); // 결제위젯 렌더링
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" }); // 이용약관 렌더링
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(price!); // 금액 업데이트
  }, [price]);

  return (
    <div className="wrapper w-100">
      <div className="w-100">
        <div id="payment-widget" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <p className="test-payment">실제로 금액이 빠져나가지 않는 테스트에요</p>
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                // '결제하기' 버튼 누르면 결제창 띄우기
                await paymentWidget?.requestPayment({
                  orderId: nanoid(),
                  orderName: title,
                  customerName: user_name,
                  customerEmail: user_email,
                  customerMobilePhone: phone_number.replace(/-/g, ""),
                  successUrl: `${window.location.origin}/payment/success`,
                  failUrl: `${window.location.origin}/payment/fail`,
                });
              } catch (error) {
                // 에러 처리하기
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPayment;

const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // 결제위젯 초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
};
