import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  mobile: string;
  email?: string;
  token: string;
  tokenExpiry: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (mobile: string, otp: string) => Promise<boolean>;
  setUserName: (name: string) => void;
  logout: () => void;
  verifyToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Check if token is still valid (5 minutes = 300000ms)
        if (userData.tokenExpiry && Date.now() < userData.tokenExpiry) {
          setUser(userData);
        } else {
          // Token expired, clear it
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setUser(null);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Verify OTP (dummy implementation - always returns true for demo)
  const login = async (mobile: string, otp: string): Promise<boolean> => {
    // Dummy OTP verification - accept any 6-digit OTP
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      const token = `dummy_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const tokenExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
      
      setUser({
        mobile,
        name: '', // Will be set later
        token,
        tokenExpiry,
      });
      return true;
    }
    return false;
  };

  const setUserName = (name: string) => {
    if (user) {
      const updatedUser = { ...user, name };
      setUser(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const verifyToken = (): boolean => {
    if (!user || !user.tokenExpiry) {
      return false;
    }
    const isValid = Date.now() < user.tokenExpiry;
    if (!isValid) {
      logout();
    }
    return isValid;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && verifyToken(),
    login,
    setUserName,
    logout,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

