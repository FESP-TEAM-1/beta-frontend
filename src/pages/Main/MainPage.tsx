import { BannerSection, StorySection, CalendarSection } from "@/components/main";
import "react-loading-skeleton/dist/skeleton.css";
import { ErrorBoundary } from "react-error-boundary";

const MainPage = () => {
  return (
    <main>
      <ErrorBoundary fallback={<div>에러페이지</div>}>
        <BannerSection />
        <StorySection />
        <CalendarSection />
      </ErrorBoundary>
    </main>
  );
};

export default MainPage;
