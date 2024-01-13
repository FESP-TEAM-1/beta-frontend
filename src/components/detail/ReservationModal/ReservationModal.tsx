import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReservationForm, ReservationPayment } from "..";
import { getMemberInfo } from "@/apis";
import styles from "./ReservationModal.module.css";

const ReservationModal: React.FC = () => {
  const [step, setStep] = useState("form");

  const goToPaymentStep = () => {
    setStep("payment");
  };

  const { status, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMemberInfo(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <section className={styles["reservation-section"]}>
      {step === "form" && <ReservationForm goToPaymentStep={goToPaymentStep} />}
      {step === "payment" && <ReservationPayment />}
    </section>
  );
};

export default ReservationModal;
