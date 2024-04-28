export type MainFormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
}

export type ResponseMainFormAction = {
  errors?: MainFormErrors;
  message: null | string;
  success: null | boolean;
}