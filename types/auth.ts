export interface LoginUser {
  email: string;
  password: string;
  exp: number;
}

export interface AuthContextType {
  user: LoginUser | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}
