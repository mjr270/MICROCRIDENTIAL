import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

/**
 * AuthProvider
 * -------------------------
 * Manages authentication, role-based access, and persistence.
 * Ready for real API integration (JWT or OAuth).
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role }
  const [loading, setLoading] = useState(true); // helps prevent flicker
  const [error, setError] = useState(null);

  // 🔹 Load stored session on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("mc_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error loading stored user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Login handler - now accepts full user object
  const login = useCallback((userData) => {
    try {
      setError(null);
      const newUser = { 
        ...userData, 
        loggedInAt: new Date().toISOString() 
      };
      setUser(newUser);
      localStorage.setItem("mc_user", JSON.stringify(newUser));
      console.info(`[Auth] User logged in as ${userData.role}`);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to log in. Please try again.");
    }
  }, []);

  // 🔹 Register handler - for backward compatibility
  const register = useCallback((userData) => {
    console.info(`[Auth] Registration handled by separate system`);
  }, []);

  // 🔹 Logout handler
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mc_user");
    console.info("[Auth] User logged out.");
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
            Loading authentication...
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Hook
 * -------------------------
 * Access authentication state and functions across the app.
 */
export const useAuth = () => useContext(AuthContext);
