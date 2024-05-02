import React, { useMemo } from "react";
import Slider, { Settings } from "react-slick";
import nextArrow from "@/assets/next-arrow.png";
import prevArrow from "@/assets/prev-arrow.png";
import DummyBannerImage from "@/assets/dummy-banner-img.svg?react";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

interface PropsType {
  index: number;
  initialSlide?: number;
  dataLength?: number;
  children: React.ReactNode;
  setIsDragging?: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderCustomDots = (dots: never) => {
  return (
    <div style={{ width: "100%", position: "absolute", bottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ul>{dots}</ul>
    </div>
  );
};

const NextArrows = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick} className={styles["next-arrow"]}>
      <span className="a11y-hidden">다음 사진 보기</span>
      <img src={nextArrow} alt="" />
    </button>
  );
};

const PrevArrows = (props: { onClick?: () => void }) => {
  const { onClick } = props;

  return (
    <button type="button" onClick={onClick} className={styles["prev-arrow"]}>
      <span className="a11y-hidden">이전 사진 보기</span>
      <img src={prevArrow} alt="" />
    </button>
  );
};

const settings: Settings[] = [
  {
    lazyLoad: "anticipated",
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: never) => renderCustomDots(dots),
    dotsClass: "dots",
    slidesToShow: 2,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <NextArrows />,
    prevArrow: <PrevArrows />,
  },
  {
    infinite: false,
    slidesToShow: 4.2,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3.2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.2,
        },
      },
    ],
  },
  {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    nextArrow: <NextArrows />,
    prevArrow: <PrevArrows />,
  },
];

const Carousel: React.FC<PropsType> = ({ index, initialSlide = 0, children, setIsDragging, dataLength }) => {
  const calculatedSettings = useMemo(() => {
    if (index === 0 && dataLength! <= 2) {
      return { ...settings[0], autoplay: false };
    } else return settings[index];
  }, [index, dataLength]);

  return (
    <Slider
      {...calculatedSettings}
      initialSlide={initialSlide}
      beforeChange={() => {
        setIsDragging?.(true);
      }}
      afterChange={() => {
        setIsDragging?.(false);
      }}
    >
      {children}
      {dataLength === 1 && (
        <div className={styles["dummy-image"]}>
          <DummyBannerImage />
          <p>게시물을 기다리고 있어요</p>
        </div>
      )}
    </Slider>
  );
};

export default Carousel;
