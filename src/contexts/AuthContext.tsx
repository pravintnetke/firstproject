import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleUsers, User } from '@/data/sampleData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Demo credentials mapping to Indian users
  const demoCredentials = {
    // Admin credentials
    'priya.sharma@delhiuniv.ac.in': { password: 'admin123', userId: '1' },
    'rajesh.kumar@iitb.ac.in': { password: 'admin123', userId: '2' },
    
    // Candidate credentials
    'ananya.patel@student.delhiuniv.ac.in': { password: 'student123', userId: '3' },
    'arjun.singh@student.delhiuniv.ac.in': { password: 'student123', userId: '4' },
    'priyanka.reddy@student.iitb.ac.in': { password: 'student123', userId: '5' },
    'karan.mehta@student.delhiuniv.ac.in': { password: 'student123', userId: '6' },
    'sneha.gupta@student.iitb.ac.in': { password: 'student123', userId: '7' }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const credential = demoCredentials[email as keyof typeof demoCredentials];
    if (credential && credential.password === password) {
      const foundUser = sampleUsers.find(u => u.id === credential.userId);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('authUser', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  // Initialize user from localStorage on app start
  React.useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
