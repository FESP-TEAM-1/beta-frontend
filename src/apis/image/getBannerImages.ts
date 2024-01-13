import axios from "axios";

interface BannerImageResponse {
  ok: boolean;
  data: BannerImage[];
}

interface BannerImage {
  id: number;
  show_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const getBannerImages = async () => {
  const { data } = await axios<BannerImageResponse>(`/api/bannerImages`);
  return data.data;
};

export default getBannerImages;
