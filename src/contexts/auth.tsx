import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/types";
import { api } from "@/lib/axios";
import axios from "axios";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin =
    user?.email === import.meta.env.VITE_ADMIN_EMAIL && user?.role === "admin";

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Only validate if we have a stored user
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setIsLoading(false);
          return;
        }

        const response = await api.get("/auth/validate");
        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log("Session expired");
        } else {
          console.error("Validation error", error);
        }
        localStorage.removeItem("user");
        setUser(null);
      }
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const login = (userData: User) => {
    // Ensure we're getting the full user object
    const completeUser = {
      ...userData,
      role: userData.role || "user", // Add fallback if needed
    };
    setUser(completeUser);
    localStorage.setItem("user", JSON.stringify(completeUser));
  };

  const logout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/login"; // Force full page reload
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
