import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser({ token, role: decoded.role });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // mark as loaded
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token);
    setUser({ token, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
