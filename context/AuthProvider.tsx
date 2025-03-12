"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, LoginUser } from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [token, setToken] = useState<string | null>(null);


  interface RegisterUser {
    username: string;
    email: string;
    password: string;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUser(jwtDecode<LoginUser>(storedToken));
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await axios.post("http://localhost:8080/login", credentials);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(jwtDecode<LoginUser>(res.data.token));
  };


  const register = async (credentials: RegisterUser) => {
    const res = await axios.post("http://localhost:8080/register", credentials);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(jwtDecode(res.data.token));
  };



  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
