import { getResizedImgFiles } from ".";

const appendUploadImageToFormData = async (formData: FormData, imageFiles: File[]) => {
  const resizedImgFiles = await getResizedImgFiles(imageFiles);

  formData.append("mainImage", resizedImgFiles[0]); // 메인 이미지
  const finalSubImages = resizedImgFiles.slice(1);
  for (let i = 0; i < finalSubImages.length; i++) {
    formData.append("subImages", finalSubImages[i]); // 서브 이미지
  }

  const fileNames: { [key: number]: string } = {};
  finalSubImages.forEach((file: File, index: number) => (fileNames[index + 1] = file.name));
  formData.append("sub_images_url", JSON.stringify(fileNames)); // 서브 이미지 순서
};

export default appendUploadImageToFormData;
