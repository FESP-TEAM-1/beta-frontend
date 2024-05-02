import { convertUrlToFile, getResizedImgFiles, reduceImageSize } from ".";

const appendUpdateImageToFormData = async (formData: FormData, imageFiles: File[], imgExistingUrls: string[], originMainUrl: string) => {
  const resizedImgFiles = await getResizedImgFiles(imageFiles);

  // 서버에 새로 업로드할 이미지들 고르기
  let finalSubImageFiles;
  // 기존 이미지가 남아있으면
  if (imgExistingUrls.length) {
    finalSubImageFiles = resizedImgFiles;
    // 기존 메인 이미지가 변경되면 (그대로면 보내지 않음)
    if (imgExistingUrls[0] !== originMainUrl) {
      // imgExistingUrls[0]을 file로 변환하고 jpeg 리사이즈해서 보내기
      const mainImageFile = await convertUrlToFile(import.meta.env.VITE_APP_IMAGE_DOMAIN + imgExistingUrls[0] + "?" + new Date().getTime());
      const blobString = URL.createObjectURL(mainImageFile);
      const jpeg = await reduceImageSize(blobString);
      const finalMainImageFile = new File([jpeg], imgExistingUrls[0], { type: "image/jpeg" });
      formData.append("mainImage", finalMainImageFile); // 메인 이미지
    }
  } // 기존 이미지가 다 삭제되면
  else {
    formData.append("mainImage", resizedImgFiles[0]); // 메인 이미지
    finalSubImageFiles = resizedImgFiles.slice(1);
  }

  for (let i = 0; i < finalSubImageFiles.length; i++) {
    formData.append("subImages", finalSubImageFiles[i]); // 서브 이미지
  }

  // 이미지 순서와 저장된 기존 서브 이미지 name를 파악하기 위한 file name list 만들기
  const fileNames: { [key: number]: string } = {};
  let finalSubImageUrls;
  if (imgExistingUrls.length > 1) {
    const existingFileNames = imgExistingUrls.slice(1).map((url) => url.split("/show/")[1]);
    const newFileNames = finalSubImageFiles.map((file) => file.name);
    finalSubImageUrls = [...existingFileNames, ...newFileNames];
  } else {
    finalSubImageUrls = finalSubImageFiles.map((file) => file.name);
  }
  finalSubImageUrls.forEach((fileName, index) => (fileNames[index + 1] = fileName));
  formData.append("sub_images_url", JSON.stringify(fileNames));
};

export default appendUpdateImageToFormData;
