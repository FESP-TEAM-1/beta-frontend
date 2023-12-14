/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ShowResponseType {
  ok: boolean;
  data: ShowType[];
}

export interface ShowType {
  id: number;
  show_type: string;
  show_sub_type: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  position: any;
  main_image_url: string;
  sub_images_url: any;
  univ: string;
  department: string;
  tags: any;
  content: Content;
  is_reservation: number;
  created_at: string;
}

export interface Content {
  type: string;
  data: number[];
}

export interface ShowFilterRequestType {
  start_date: string;
  end_date: string;
  location: string;
  category?: string;
  progress: string;
}