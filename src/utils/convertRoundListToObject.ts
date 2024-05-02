import { DateWithTimeObj } from "@/types";

const convertRoundListToObject = (roundList: DateWithTimeObj[]) => {
  const obj: { [key: string]: string } = {};
  roundList.forEach((item) => {
    obj[item.id] = item.date + " - " + item.time;
  });
  return obj;
};

export default convertRoundListToObject;
