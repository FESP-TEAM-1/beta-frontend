import { useState } from "react";
import { Filters } from "@/components/common";
import { NavBar } from "@/components/layouts";
import { ExhibitionListSection } from "@/components/mainExhibition/";
import { getTodayStringDate } from "@/utils";

const MainExhibitionPage = () => {
  const { todayString } = getTodayStringDate();
  const [filterRequest, setFilterRequest] = useState({
    start_date: todayString,
    end_date: todayString,
    location: "all",
    progress: "all",
  });

  return (
    <>
      <NavBar />
      <main>
        <Filters filterRequest={filterRequest} setFilterRequest={setFilterRequest} />
        <ExhibitionListSection filterRequest={filterRequest} />
      </main>
    </>
  );
};

export default MainExhibitionPage;
