import instance from "./axios";

export const login = async (data: {email: string, password: string}) => {
  return await instance.post<{accessToken: string}>("/login", data);
};
