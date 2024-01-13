/**
 *
 * @param dateObject Date
 * @returns string
 * @example Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 오전 0:00
 */

const formatTime = (dateObject: Date) => {
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  const formattedTime = `${period} ${hours % 12}:${minutes}`;
  return formattedTime;
};
export default formatTime;
