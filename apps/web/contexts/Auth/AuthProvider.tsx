import { ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "../../interfaces/user.interface";
import { signOut, useSession } from "next-auth/react";
import { authReducer } from "./authReducer";
import Cookies from "js-cookie";
import axios from "axios";
import instance from "../../services/axios";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "Auth.Login", payload: data?.user as IUser });
    }
  }, [status, data]);

  // const checkToken = async () => {
  //   if (!Cookies.get("token")) {
  //     return;
  //   }
  //
  //   try {
  //     const { data } = await instance.get("/user/validate-token");
  //     const { token, user } = data;
  //     Cookies.set("token", token);
  //     dispatch({ type: "Auth.Login", payload: user });
  //   } catch (error) {
  //     Cookies.remove("token");
  //   }
  // };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await instance.post("/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth.Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await instance.post("/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth.Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    signOut({callbackUrl: "/"});
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
