import { useImagePreviewUrlStore } from "@/stores";
import { useColor } from "color-thief-react";
import { useRef } from "react";

const usePickMainImageColor = (imageExistingUrl = "") => {
  const { imagePreviewUrls } = useImagePreviewUrlStore();

  const timestamp = useRef(new Date().getTime()).current;

  const { data: main_image_color } = useColor(
    imageExistingUrl ? `${import.meta.env.VITE_APP_IMAGE_DOMAIN + imageExistingUrl + "?" + timestamp}` : imagePreviewUrls[0],
    "hex",
    {
      crossOrigin: "anonymous",
    },
  );
  return main_image_color;
};

export default usePickMainImageColor;
