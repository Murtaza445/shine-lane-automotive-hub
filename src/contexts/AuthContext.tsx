
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, mockUsers, setCurrentUser, getCurrentUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (userData: Partial<User>) => boolean;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin (for demo, admin email contains 'admin')
    setIsAdmin(user?.email.includes('admin') || false);
  }, [user]);

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === 'admin@carwash.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin',
        name: 'Admin User',
        email: 'admin@carwash.com',
        phone: '+1 (555) 000-0000',
        joinDate: '2024-01-01',
        subscriptionType: 'luxury',
        subscriptionDuration: '1-year',
        subscriptionStartDate: '2024-01-01',
        subscriptionEndDate: '2025-01-01',
        status: 'active',
        totalSpent: 0,
        cars: [],
        appointments: [],
        feedback: []
      };
      setUser(adminUser);
      setCurrentUser(adminUser);
      return true;
    }

    // Regular user login
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      setCurrentUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const signup = (userData: Partial<User>): boolean => {
    if (!userData.email || !userData.name) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      joinDate: new Date().toISOString().split('T')[0],
      subscriptionType: 'basic',
      subscriptionDuration: '1-month',
      subscriptionStartDate: new Date().toISOString().split('T')[0],
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      totalSpent: 0,
      cars: [],
      appointments: [],
      feedback: []
    };

    mockUsers.push(newUser);
    setUser(newUser);
    setCurrentUser(newUser);
    return true;
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentUser(updatedUser);
    
    // Update in mock data
    const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      logout,
      signup,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
