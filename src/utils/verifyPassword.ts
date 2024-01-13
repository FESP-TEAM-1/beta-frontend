/**
 * 비밀번호 정규식
 * 1. 영문, 숫자, 특수문자 조합
 * 2. 8자리 이상
 * 3. 특수문자는 ~!@#$%^&* 만 허용
 * 4. 숫자는 0~9만 허용
 * 5. 영문은 대소문자 구분
 * @param value
 * @returns boolean
 */

export const checkPassword = (value: string): boolean => {
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,}$/;
  return pwRegex.test(value);
};

export const checkPasswordMatch = (value: string, value2: string) => {
  return value === value2;
};
