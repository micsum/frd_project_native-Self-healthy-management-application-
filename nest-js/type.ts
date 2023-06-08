export type JWTPayload = {
  email: string;
  id: number;
};

export interface LoginData {
  email: String;
  password: String;
}

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  height: string;
  target: string;
};
