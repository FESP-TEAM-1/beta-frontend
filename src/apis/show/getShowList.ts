import axios from "axios";
import { ShowResponseType } from "@/types";

const getShowList = async (
  type: string,
  start_date: string,
  end_date: string,
  location: string = "all",
  progress: string = "all",
  category: string = "all",
) => {
  const { data } = await axios<ShowResponseType>(
    `${
      import.meta.env.VITE_APP_API_ENDPOINT
    }/api/${type}?start_date=${start_date}&end_date=${end_date}&location=${location}&progress=${progress}&category=${category}`,
  );

  return data.data;
};

export default getShowList;
