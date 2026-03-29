import api from "./api";

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  token: string;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthUser> => {
  const response = await api.post<AuthUser>("/auth/login", payload);
  return response.data;
};
