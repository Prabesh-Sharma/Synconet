import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../axiosConfig.js";

const AuthContext = createContext({
  login: () => { },
  logout: () => { },
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (userData) => {
    try {
      const response = await axios.post("/api/user/login", userData);
      if (response.status === 200) {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      if (err.response) {
        throw err.response;
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await axios.get("/api/user/getuserinfo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.log("Token validation failed");
          logout();
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    validateToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
