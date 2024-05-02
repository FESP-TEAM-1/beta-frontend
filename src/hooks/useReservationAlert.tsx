import { toast } from "react-toastify";

const useReservationAlert = () => {
  const showReservationSuccessAlert = () => {
    toast(
      <p>
        예매 성공하였습니다. <br />
        마이페이지에서 확인하세요.
      </p>,
      {
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      },
    );
  };

  const showReservationFailAlert = (errorMessage: string) => {
    toast(errorMessage, {
      type: toast.TYPE.ERROR,
      isLoading: false,
      autoClose: 2000,
    });
  };

  return { showReservationSuccessAlert, showReservationFailAlert };
};

export default useReservationAlert;
