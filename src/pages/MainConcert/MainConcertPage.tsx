import { useState } from "react";
import { NavBar } from "@/components/layouts";
import { Filters } from "@/components/common";
import { ConcertListSection } from "@/components/mainConcert";
import { getTodayStringDate } from "@/utils";
import { ShowFilterRequestType } from "@/types";

const MainConcertPage = () => {
  const { todayString } = getTodayStringDate();

  const [filterRequest, setFilterRequest] = useState<ShowFilterRequestType>({
    start_date: todayString,
    end_date: todayString,
    location: "all",
    progress: "all",
    category: "all",
  });

  return (
    <>
      <NavBar />
      <main>
        <Filters filterRequest={filterRequest} setFilterRequest={setFilterRequest} />
        <ConcertListSection filterRequest={filterRequest} />
      </main>
    </>
  );
};

export default MainConcertPage;
