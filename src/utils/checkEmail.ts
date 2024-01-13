/**
 * 이메일 형식 체크
 * @param value 이메일
 * @returns boolean
 */

const checkEmail = (value: string) => {
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  return value.match(emailRegex);
};

export default checkEmail;
