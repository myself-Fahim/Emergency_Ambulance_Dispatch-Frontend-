export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export type AuthResult = {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
};

export type AuthActionState = {
  message?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
  };
};
