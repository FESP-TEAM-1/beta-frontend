export interface SignupBodyType {
  user_name: string;
  user_email: string;
  login_id: string;
  login_pw: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  user_role: "user" | "admin";
  univ_email?: string; // 선택적 필드
  univ_name?: string; // 선택적 필드
}

export interface ProfileBodyType {
  user_name: string;
  user_email: string;
  login_id?: string;
  login_pw: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  user_role: "user" | "admin";
}
