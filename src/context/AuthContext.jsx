import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import authApi from "../api/authApi";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.login(credentials);
      setUser(result.user);
      setToken(result.token);
      return result;
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setError(null);
    setLoading(true);

    try {
      const result = await authApi.register(userData);
      setUser(result.user);
      setToken(localStorage.getItem("token"));
      return result;
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  // Computed properties
  const isAuthenticated = !!user && !!token;

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;
