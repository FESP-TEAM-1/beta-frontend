export interface ReviewsGetResponse {
  ok: boolean;
  data: ReviewType[];
}

export interface ReviewType {
  id: number;
  user_id: number;
  login_id: string;
  show_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  title?: string;
}

export interface ReviewPostParamType {
  show_id: string;
  comment: string;
}

export interface ReviewDeleteParamType {
  review_id: number;
  show_id: number;
}

export interface ReviewPatchParamType {
  review_id: number;
  show_id: number;
  comment: string;
}
