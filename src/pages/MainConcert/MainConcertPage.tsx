import { Filters } from "@/components/common";
import { ConcertListSection } from "@/components/mainConcert";

const MainConcertPage = () => {
  return (
    <main>
      <Filters />
      <ConcertListSection />
    </main>
  );
};

export default MainConcertPage;
