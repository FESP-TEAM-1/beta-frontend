import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { Carousel } from "@/components/common";
import { BannerSkeleton } from "@/components/detail";
import styles from "./Banner.module.css";

const Banner = () => {
  const { showInfo } = useShowInfoStore();
  if (!showInfo) return <BannerSkeleton />;

  const { main_image_url, sub_images_url } = showInfo;
  const subImgs = (sub_images_url && Object.values(JSON.parse(sub_images_url))) || [];

  return (
    <Carousel index={0}>
      {[main_image_url, ...subImgs].map((img, index) => (
        <div key={index}>
          <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + img} className={styles["slider__img"]} />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
