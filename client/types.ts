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

export type ResponseVerificationAction = {
  error?: string;
  success?: string;
}

export type SearchUserType = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  accounts: {
      provider: string;
  }[];
}