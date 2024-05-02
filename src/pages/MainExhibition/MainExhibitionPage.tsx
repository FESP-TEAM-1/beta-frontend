import { Filters } from "@/components/common";
import { ExhibitionListSection } from "@/components/mainExhibition";

const MainExhibitionPage = () => {
  return (
    <main>
      <Filters />
      <ExhibitionListSection />
    </main>
  );
};

export default MainExhibitionPage;
