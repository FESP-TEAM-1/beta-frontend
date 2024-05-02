import React from "react";
import { Button } from "@/components/common";
import { useDaumPostcodePopup, Address } from "react-daum-postcode";
import { AddressSearchResult } from "@/types";
import { useFormContext } from "react-hook-form";

const kakao = window.kakao;

const getAddressCoords = (address: string) => {
  const geoCoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geoCoder.addressSearch(address, (result: AddressSearchResult[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(+result[0].x, +result[0].y);
        resolve(coords);
      } else {
        reject(status);
      }
    });
  });
};

const getPosition = async (data: Address) => {
  try {
    const coords = (await getAddressCoords(data.roadAddress || data.jibunAddress)) as kakao.maps.LatLng;
    const x = coords.getLng();
    const y = coords.getLat();

    return { lat: x, lng: y };
  } catch (e) {
    console.error(e);
  }
};
const getLocation = (data: Address) => {
  let fullAddress = data.address;
  let extraAddress = ""; //추가될 주소
  // let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)

  //주소타입이 도로명주소일 경우
  if (data.addressType === "R") {
    //법정동, 법정리
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    //건물명
    if (data.buildingName !== "") {
      extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    //지역주소 제외 전체주소 치환
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
  }
  return fullAddress;
};

interface PropsType {
  setPosition: React.Dispatch<React.SetStateAction<object>>;
}

const Postcode: React.FC<PropsType> = ({ setPosition }) => {
  const { setValue } = useFormContext();
  const open = useDaumPostcodePopup();

  const handleComplete = async (data: Address) => {
    try {
      const position = await getPosition(data);

      if (position) {
        setValue("location", getLocation(data));
        setPosition(position);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({ onComplete: handleComplete });
  };

  return <Button onClick={handleClick}>주소찾기</Button>;
};

export default Postcode;
