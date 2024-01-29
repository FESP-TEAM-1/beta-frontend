import { useState } from "react";
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
    progress: "1",
    category: "all",
  });

  return (
    <main>
      <Filters filterRequest={filterRequest} setFilterRequest={setFilterRequest} />
      <ConcertListSection filterRequest={filterRequest} />
    </main>
  );
};

export default MainConcertPage;
