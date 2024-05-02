import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Carousel } from "@/components/common";
import { ShowType } from "@/types";
import styles from "./Banner.module.css";
import { useLoginStore } from "@/stores";

const Banner = () => {
  const queryClient = useQueryClient();
  const { id: showId } = useParams();
  const {
    userState: { login_id },
  } = useLoginStore();

  const { main_image_url: mainImg, sub_images_url } = queryClient.getQueryData<ShowType>(["infoData", showId, login_id])!;
  const subImgs: string[] = sub_images_url ? Object.values(JSON.parse(sub_images_url)) : [];
  const bannerImgs: string[] = [mainImg, ...subImgs];

  return (
    <Carousel index={0} dataLength={bannerImgs.length}>
      {bannerImgs.map((img, index) => (
        <div key={index}>
          <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + img} className={styles["slider__img"]} />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
