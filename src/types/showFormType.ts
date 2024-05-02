import { FormInputs } from ".";

export interface ShowFormType extends FormInputs {
  show_type: string;
  show_sub_type: string | null;
  title: string;
  univ: string;
  department: string;
  location: string;
  location_detail: string | null;
  // main_image_color: string;
  start_date: Date | null;
  end_date: Date | null;
  // position: string;
  tags: string[];
  content: string | null;
  is_reservation: string;
}

export interface ShowResFormType extends FormInputs {
  method: string | null;
  google_form_url: string | null;
  price: number | null;
  head_count: number | null;
  date_time: string | null;
  notice: string | null;
}

export interface ShowFormResultType extends Omit<ShowFormType, "start_date" | "end_date">, Omit<ShowResFormType, "price" | "head_count"> {
  main_image_color: string;
  position: string;
  start_date: string;
  end_date: string;
  //
  price: string | null;
  head_count: string | null;
}
