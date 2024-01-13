// 인코딩
// 예시
// input: new Uint8Array([72, 101, 108, 108, 111])
// output: SGVsbG8=  // "Hello"

const convertBytesToBase64 = (bytes: Uint8Array): string => {
  const binString = String.fromCodePoint(...Array.from(bytes));
  return btoa(binString);
};
export default convertBytesToBase64;
