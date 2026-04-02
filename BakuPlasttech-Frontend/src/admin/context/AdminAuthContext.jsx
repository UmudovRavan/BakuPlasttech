import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUser, saveToken, saveUser, clearAuth } from '../utils/tokenStorage';
import axiosInstance from '../api/axiosInstance';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      // Backend DTOs use PascalCase: Username, Password
      const response = await axiosInstance.post('/auth/login', { 
        Username: username, 
        Password: password 
      });
      
      // Backend returns TokenDto: { AccessToken: "...", Expiration: "..." }
      // Access keys safely supporting both PascalCase and camelCase
      const accessToken = response.data.AccessToken || response.data.accessToken;
      const userInfo = response.data.User || response.data.user || { username };
      
      if (!accessToken) {
        throw new Error('No access token received from server.');
      }

      saveToken(accessToken);
      saveUser(userInfo);
      
      setToken(accessToken);
      setAdmin(userInfo);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.Message || error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setAdmin(null);
  };

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    if (storedToken) {
      setToken(storedToken);
      setAdmin(storedUser);
    }
    setLoading(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
