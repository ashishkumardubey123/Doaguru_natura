'use client';

import { createContext, useState, useEffect } from 'react';
import { registerAdmin as apiRegister, loginAdmin as apiLogin, logoutAdmin as apiLogout } from '../app/api/adminApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('natura_admin_logged_in');
    if (loggedInUser) {
      setUser({ 
        name: localStorage.getItem('natura_admin_name'),
        email: localStorage.getItem('natura_admin_email'),
        role: localStorage.getItem('natura_admin_role'),
        token: localStorage.getItem('natura_admin_token')
      });
    }
    setLoading(false);
  }, []);

  const register = async (name, email, phone, role, password) => {
    try {
      // Step 1: Register the admin
      await apiRegister(name, email, phone, role, password);
      
      // Step 2: ✅ Auto-login after successful registration
      const loginResult = await login(email, password);
      return loginResult;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      
      const adminData = data.admin;
      const token = data.token;

      const userWithToken = { 
        name: adminData.Name, 
        email: adminData.Email, 
        role: adminData.Role,
        token: token 
      };
      
      setUser(userWithToken);
      
      localStorage.setItem('natura_admin_logged_in', 'true');
      localStorage.setItem('natura_admin_name', adminData.Name);
      localStorage.setItem('natura_admin_email', adminData.Email);
      localStorage.setItem('natura_admin_role', adminData.Role);
      localStorage.setItem('natura_admin_token', token);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      if (user?.token) {
        await apiLogout(user.token);
      }
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('natura_admin_logged_in');
      localStorage.removeItem('natura_admin_name');
      localStorage.removeItem('natura_admin_email');
      localStorage.removeItem('natura_admin_role');
      localStorage.removeItem('natura_admin_token');
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};