import { FormInputs } from ".";

export interface ShowFormType extends FormInputs {
  show_type: string;
  show_sub_type: string | null;
  title: string;
  univ: string;
  department: string;
  // location: string;
  location_detail: string | null;
  // main_image_color: string;
  // start_date: string;
  // end_date: string;
  // position: string;
  // tags: string;
  // content: string | null;
  is_reservation: string;
}

export interface ShowResFormType extends FormInputs {
  method: string | null;
  google_form_url: string | null;
  price: number | null;
  head_count: number | null;
  // date_time: string | null;
  // notice: string | null;
}

export interface ShowFormResultType extends ShowFormType, Omit<ShowResFormType, "price" | "head_count"> {
  location: string;
  main_image_color: string;
  start_date: string;
  end_date: string;
  position: string;
  tags: string;
  content: string | null;
  //
  price: string | null;
  head_count: string | null;
  date_time: string | null;
  notice: string | null;
}
