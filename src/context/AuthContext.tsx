import { createContext, useContext, useState, type ReactNode } from "react";
import { DEMO_CREDENTIALS } from "../data/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialAuth(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("assurium-auth") === "true";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuth);

  function login(email: string, password: string): boolean {
    const valid = email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
    if (valid) {
      window.localStorage.setItem("assurium-auth", "true");
      setIsAuthenticated(true);
    }
    return valid;
  }

  function logout() {
    window.localStorage.removeItem("assurium-auth");
    setIsAuthenticated(false);
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
