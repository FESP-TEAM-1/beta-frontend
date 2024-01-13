/**
 * 년 월 일 선택을 위한 함수
 * @returns {number[]} 년도 배열
 * @returns {number[]} 월 배열
 * @returns {number[]} 일 배열
 * @example
 * const [years, months, days] = getDateSelect();
 * console.log(years); // [1900, 1901, 1902, ... , 2021]
 * console.log(months); // [1, 2, 3, ... , 12]
 * console.log(days); // [1, 2, 3, ... , 31]
 */

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
};

const getMonths = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

const getDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export { getYears, getMonths, getDays };
