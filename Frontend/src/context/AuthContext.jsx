import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const TOKEN_KEY = "auth_token";

  // Function to save token to local storage
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  // Function to get token from local storage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  // Function to handle user login
  const login = (userData, token) => {
    setUser(userData);
    saveTokenToLocalStorage(token);
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  // Check for existing token on application startup
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      // Perform any necessary validation or decoding of the token
      // Set user state based on the decoded token
      // Example:
      // const decodedToken = decodeToken(token);
      // setUser(decodedToken.userData);
    }
  }, []);

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting the context and the hook
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
