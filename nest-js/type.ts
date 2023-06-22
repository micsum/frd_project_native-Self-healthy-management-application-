export type JWTPayload = {
  email: string;
  id: number;
};

export interface LoginData {
  email: string;
  password: string;
}

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  height: string;
  target: string;
};
