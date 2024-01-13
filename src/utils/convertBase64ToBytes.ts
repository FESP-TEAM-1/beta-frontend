// 디코딩
// 예시
// input: SGVsbG8gd29ybGQh  // "Hello world!"
// output:  Uint8Array(12) [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, buffer: ArrayBuffer(12), byteLength: 12, byteOffset: 0, length: 12, Symbol(Symbol.toStringTag): 'Uint8Array']

const convertBase64ToBytes = (base64: string): Uint8Array => {
  try {
    const binString = window.atob(base64);
    return Uint8Array.from(binString, (c) => c.codePointAt(0) ?? 0);
  } catch (error) {
    console.error("Error decoding base64:", error);
    return new Uint8Array();
  }
};
export default convertBase64ToBytes;
