import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    isPremium: false,
    role: 'user',
    dailyUsage: 2,
    totalUsage: 15,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'premium@example.com',
    name: 'Jane Smith',
    isPremium: true,
    role: 'user',
    dailyUsage: 8,
    totalUsage: 156,
    createdAt: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    isPremium: true,
    role: 'admin',
    dailyUsage: 0,
    totalUsage: 0,
    createdAt: '2024-01-01T09:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Simulate checking for stored auth
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in reality, this would call your backend API
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isPremium: false,
      role: 'user',
      dailyUsage: 0,
      totalUsage: 0,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};