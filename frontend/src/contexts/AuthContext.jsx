import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with anonymous user
  useEffect(() => {
    // Set a default anonymous user
    setUser({
      id: 'anonymous',
      name: 'Anonymous User',
      email: 'anonymous@example.com'
    });
    setLoading(false);
  }, []);

  // Simplified functions that don't require authentication
  const login = async (email, password) => {
    // No-op for anonymous access
    toast.info('Anonymous access enabled - no login required');
    return user;
  };

  const register = async (name, email, password) => {
    // No-op for anonymous access
    toast.info('Anonymous access enabled - no registration required');
    return user;
  };

  const logout = () => {
    // No-op for anonymous access
    toast.info('Anonymous access enabled - no logout required');
  };

  const updateProfile = async (data) => {
    // No-op for anonymous access
    toast.info('Profile updates not available in anonymous mode');
    return user;
  };

  const changePassword = async (currentPassword, newPassword) => {
    // No-op for anonymous access
    toast.info('Password changes not available in anonymous mode');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: true // Always true for anonymous access
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 