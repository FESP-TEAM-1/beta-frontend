import { Suspense } from "react";
import { Banner, BannerSkeleton } from "..";

const BannerSection = () => {
  return (
    <section>
      <h2 className={"a11y-hidden"}>진행중인 공연/전시 배너</h2>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
    </section>
  );
};

export default BannerSection;
