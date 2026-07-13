import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("linklane-user") || "null"),
  );
  const login = (data = {}) => {
    const next = {
      name: data.name || "Alex Morgan",
      email: data.email || "alex@example.com",
    };
    setUser(next);
    localStorage.setItem("linklane-user", JSON.stringify(next));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("linklane-user");
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
