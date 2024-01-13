/**
 *
 * @param dateObject Date
 * @returns string
 * @example Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 2023/12/15
 */

const formatDate = (dateObject: Date) => {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
export default formatDate;
