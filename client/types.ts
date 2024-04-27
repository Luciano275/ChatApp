export type MainFormErrors = {
  email?: string[];
  password?: string[];
}

export type ResponseMainFormAction = {
  errors?: MainFormErrors;
  message: null | string;
  success: null | boolean;
}