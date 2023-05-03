import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../../interfaces/user.interface";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  login(email: string, password: string): Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
