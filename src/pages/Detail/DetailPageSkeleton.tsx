import { BannerSkeleton, ButtonGroupSkeleton, InfoSectionSkeleton, ReviewSectionSkeleton, SubMenuBarSkeleton } from "@/components/detail";
import { useLocation } from "react-router-dom";

const DetailPageSkeleton = () => {
  const location = useLocation();

  return (
    <main>
      <BannerSkeleton />
      <ButtonGroupSkeleton />
      <SubMenuBarSkeleton />
      {location.pathname.endsWith("review") ? <ReviewSectionSkeleton /> : <InfoSectionSkeleton />}
    </main>
  );
};

export default DetailPageSkeleton;
