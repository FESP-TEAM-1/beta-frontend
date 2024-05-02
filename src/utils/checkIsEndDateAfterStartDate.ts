const checkIsEndDateAfterStartDate = (startDate: string, endDate: string) => {
  const start_date = new Date(startDate).getTime();
  const end_date = new Date(endDate).getTime();

  if (end_date >= start_date) {
    return true;
  } else return false;
};

export default checkIsEndDateAfterStartDate;
