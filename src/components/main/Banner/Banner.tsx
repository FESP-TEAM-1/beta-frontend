import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@/components/common";
import { getBannerImages } from "@/apis";
import styles from "./Banner.module.css";

const Banner = () => {
  const navigate = useNavigate();
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const { data } = useSuspenseQuery({
    queryKey: ["bannerData"],
    queryFn: async () => await getBannerImages(),
  });

  const handleClickBannerImage = (showId: number) => (e: React.MouseEvent) => {
    if (isCarouselDragging) {
      e.stopPropagation();
      return;
    }
    navigate(`detail/${showId}`);
  };

  return (
    <>
      {data.length ? (
        <Carousel index={0} setIsDragging={setIsCarouselDragging} dataLength={data?.length}>
          {data.map((item) => (
            <img
              key={item.id}
              onClick={handleClickBannerImage(item.show_id)}
              src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.image_url}`}
              className={styles["banner-image"]}
            />
          ))}
        </Carousel>
      ) : (
        <span className="a11y-hidden">현재 진행중인 공연/전시가 존재하지 않습니다!</span>
      )}
    </>
  );
};

export default Banner;
