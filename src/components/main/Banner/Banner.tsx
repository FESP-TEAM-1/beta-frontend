import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "@/components/common";
import { useCarouselDragStore } from "@/stores";
import { getBannerImages } from "@/apis";
import styles from "./Banner.module.css";

const Banner = () => {
  const navigate = useNavigate();
  const { isDragging } = useCarouselDragStore();
  const { data, status, error } = useQuery({
    queryKey: ["bannerData"],
    queryFn: async () => await getBannerImages(),
  });

  const handleClickBannerImage = (showId: number) => (e: React.MouseEvent) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    navigate(`detail/${showId}`);
  };

  if (status === "pending") return <Skeleton className={styles.section} />;
  return (
    <section className={styles.section}>
      <h2 className={"a11y-hidden"}>진행중인 공연/전시 배너</h2>

      <>
        {status === "error" && <>{error.message}</>}
        <Carousel index={3}>
          {data?.map((item) => (
            <div onClick={handleClickBannerImage(item.show_id)} key={item.id}>
              <img src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.image_url}`} className={styles["banner-image"]} />
            </div>
          ))}
        </Carousel>
      </>
    </section>
  );
};

export default Banner;
