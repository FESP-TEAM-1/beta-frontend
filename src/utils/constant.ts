const CATEGORY_LIST = ["공연", "전시"]; // "스포츠"
const CONCERT_CATEGORY_LIST = ["음악", "연극", "기타"];
// const sportsCategoryList = ["야구", "축구", "농구"];
const IS_RESERVATION_LIST = ["예", "아니오"];
const METHOD_LIST = ["구글폼", "예매 대행"];

const DATES = ["오늘", "+7일", "+2주", "직접선택"];
const LOCATIONS = [
  "전체",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];
const CONCERT_CATEGORIES = ["전체", ...CONCERT_CATEGORY_LIST];
const PROGRESSES = ["전체", "진행중", "진행 예정", "종료"];

export { CATEGORY_LIST, CONCERT_CATEGORY_LIST, IS_RESERVATION_LIST, METHOD_LIST, DATES, LOCATIONS, CONCERT_CATEGORIES, PROGRESSES };
