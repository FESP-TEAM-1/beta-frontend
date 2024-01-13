import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import LocationMap from "@/components/detail/InfoSection/LocationMap";
import { deleteReservation } from "@/apis";
import { useModalStore } from "@/stores";
import { queryClient } from "@/main";
import styles from "./ReservationUserModal.module.css";

type onCopyFn = (text: string) => void;

const copyClipBoard: onCopyFn = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("클립보드에 복사되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

const convertBase64ToBytes = (base64: string): Uint8Array => {
  try {
    const binString = window.atob(base64);
    return Uint8Array.from(binString, (c) => c.codePointAt(0) ?? 0);
  } catch (error) {
    console.error("Error decoding base64:", error);
    return new Uint8Array();
  }
};

const ReservationUserModal = ({ ...item }) => {
  const { setOpenModal } = useModalStore();
  const {
    show_times_id,
    orderId,
    id,
    user_name,
    user_email,
    phone_number,
    show_type,
    title,
    location,
    location_detail,
    position,
    date_time,
    amount,
    notice,
  } = item.item;

  const decodedContent = notice ? new TextDecoder().decode(convertBase64ToBytes(notice)) : null;
  const positionJson = position && JSON.parse(position);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ id, show_times_id, orderId }: { id: number; show_times_id: number; orderId: string }) =>
      deleteReservation(id, show_times_id, orderId),
    onSuccess: (data) => {
      if (data && data.ok) {
        toast.success("예매가 취소되었습니다.");
      } else {
        toast.error("예매 취소에 실패했습니다.");
      }
      queryClient.invalidateQueries({
        queryKey: ["userReservationList"],
      });
      setOpenModal({ state: false, type: "" });
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
  });

  const cancelShow = async (id: number, show_times_id: number, orderId: string) => {
    if (window.confirm("정말로 예매를 취소하시겠습니까?")) {
      deleteMutate({ id, show_times_id, orderId });
    }
  };

  return (
    <div className={styles["show-reservation-modal"]}>
      <h3>{title}</h3>
      <section className={styles["show-info"]}>
        <ul className={styles["show-reservation-modal-ul"]}>
          <h4>{show_type} 정보</h4>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>
              장소 :&nbsp;{location}
              {location_detail && ` ${location_detail}`}
            </span>
          </li>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>가격 : {amount ? amount + "원" : "무료"}</span>
          </li>
        </ul>
      </section>

      {decodedContent && (
        <section className={styles["show_notice"]}>
          <h4>유의 사항</h4>
          <pre className={styles["show_notice__content"]} dangerouslySetInnerHTML={{ __html: decodedContent }}></pre>
        </section>
      )}

      <section className={styles["show_time"]}>
        <ul className={styles["show-reservation-modal-ul"]}>
          <h4>회차</h4>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>{date_time}</span>
          </li>
        </ul>
      </section>

      <section className={styles["show_user"]}>
        <ul className={styles["show-reservation-modal-ul"]}>
          <h4>예매자 정보</h4>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>이름 : {user_name}</span>
          </li>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>이메일 : {user_email}</span>
          </li>
          <li className={styles["show-reservation-modal-li"]}>
            <span className={styles["show-reservation-modal-span"]}>휴대폰 번호 : {phone_number}</span>
          </li>
        </ul>
      </section>

      <section>
        <LocationMap lat={positionJson.lat} lng={positionJson.lng} />
        <div className={styles["info-location__copy"]}>
          <p className={styles["text"]}>{location}</p>
          <button className={styles["button"]} onClick={() => copyClipBoard(location)}>
            복사하기
          </button>
        </div>
      </section>

      <section className={styles["reservation-info-button"]}>
        <button className={styles["reservation-delete-button"]} onClick={() => cancelShow(id, show_times_id, orderId)}>
          예매 취소
        </button>
      </section>
    </div>
  );
};

export default ReservationUserModal;
