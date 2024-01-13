import React from "react";
import Slider from "react-slick";
import { useCarouselDragStore } from "@/stores";
import nextArrow from "@/assets/next-arrow.png";
import prevArrow from "@/assets/prev-arrow.png";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

interface PropsType {
  index: number;
  initialSlide?: number;
  children: React.ReactNode;
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

const settings = [
  {
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
        breakpoint: 500,
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
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  },
  {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    centerPadding: "10%",

    nextArrow: <NextArrows />,
    prevArrow: <PrevArrows />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          centerPadding: "0",
        },
      },
    ],
  },
  {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: never) => renderCustomDots(dots),
    dotsClass: "dots",
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <NextArrows />,
    prevArrow: <PrevArrows />,
  },
];

const Carousel: React.FC<PropsType> = ({ index, initialSlide = 0, children }) => {
  const { setIsDragging } = useCarouselDragStore();

  return (
    <Slider
      {...settings[index]}
      initialSlide={initialSlide}
      beforeChange={() => {
        setIsDragging(true);
      }}
      afterChange={() => {
        setIsDragging(false);
      }}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
