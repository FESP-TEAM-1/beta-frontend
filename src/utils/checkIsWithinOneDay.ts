const checkIsWithinOneDay = (stringDate: string): boolean => {
  const inputDate = new Date(stringDate).getTime();
  const now = new Date().getTime();

  const diffHours = (now - inputDate) / (1000 * 60 * 60);

  return diffHours < 24;
};

export default checkIsWithinOneDay;
