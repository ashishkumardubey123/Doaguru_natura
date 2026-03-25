'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  registerAdmin as apiRegister,
  loginAdmin as apiLogin,
  logoutAdmin as apiLogout,
  fetchPendingAdmins as apiFetchPendingAdmins
} from '../app/api/adminApi';
import { fetchFormsData } from '../app/api/formsApi';

export const UserContext = createContext();

const STORAGE_KEYS = {
  isLoggedIn: 'natura_admin_logged_in',
  id: 'natura_admin_id',
  name: 'natura_admin_name',
  email: 'natura_admin_email',
  phone: 'natura_admin_phone',
  role: 'natura_admin_role',
  status: 'natura_admin_status',
  token: 'natura_admin_token'
};

const normalizeAdmin = (adminData = {}, token) => ({
  id: adminData.id ?? adminData.AdminID ?? adminData.adminId ?? null,
  name: adminData.Name ?? adminData.name ?? '',
  email: adminData.Email ?? adminData.email ?? '',
  phone: adminData.Phone ?? adminData.phone ?? '',
  role: adminData.Role ?? adminData.role ?? '',
  status: adminData.status ?? adminData.Status ?? null,
  token: token ?? adminData.token ?? null
});

const readPersistedUser = () => {
  const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn);
  if (!isLoggedIn) return null;

  return {
    id: localStorage.getItem(STORAGE_KEYS.id) || null,
    name: localStorage.getItem(STORAGE_KEYS.name) || '',
    email: localStorage.getItem(STORAGE_KEYS.email) || '',
    phone: localStorage.getItem(STORAGE_KEYS.phone) || '',
    role: localStorage.getItem(STORAGE_KEYS.role) || '',
    status: localStorage.getItem(STORAGE_KEYS.status) || null,
    token: localStorage.getItem(STORAGE_KEYS.token) || null
  };
};

const persistUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
  localStorage.setItem(STORAGE_KEYS.id, user.id ?? '');
  localStorage.setItem(STORAGE_KEYS.name, user.name ?? '');
  localStorage.setItem(STORAGE_KEYS.email, user.email ?? '');
  localStorage.setItem(STORAGE_KEYS.phone, user.phone ?? '');
  localStorage.setItem(STORAGE_KEYS.role, user.role ?? '');
  localStorage.setItem(STORAGE_KEYS.status, user.status ?? '');
  localStorage.setItem(STORAGE_KEYS.token, user.token ?? '');
};

const clearPersistedUser = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

const mergeUser = (baseUser, nextFields) => ({
  id: nextFields.id ?? baseUser?.id ?? null,
  name: nextFields.name ?? baseUser?.name ?? '',
  email: nextFields.email ?? baseUser?.email ?? '',
  phone: nextFields.phone ?? baseUser?.phone ?? '',
  role: nextFields.role ?? baseUser?.role ?? '',
  status: nextFields.status ?? baseUser?.status ?? null,
  token: nextFields.token ?? baseUser?.token ?? null
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const applyUser = useCallback((nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      persistUser(nextUser);
    } else {
      clearPersistedUser();
    }
  }, []);

  const refreshSession = useCallback(async (seedUser = null) => {
    const cachedUser = seedUser || readPersistedUser();
    const token = cachedUser?.token;

    try {
      const formsResponse = await fetchFormsData(token);

      if (formsResponse?.isPending) {
        const nextUser = mergeUser(cachedUser, {
          role: 'Admin',
          status: 'pending',
          token
        });
        applyUser(nextUser);
        return { success: true, user: nextUser };
      }

      if (Array.isArray(formsResponse)) {
        try {
          await apiFetchPendingAdmins(token);
          const nextUser = mergeUser(cachedUser, {
            role: 'SuperAdmin',
            status: null,
            token
          });
          applyUser(nextUser);
          return { success: true, user: nextUser };
        } catch (roleError) {
          if (roleError.response?.status === 403) {
            const nextUser = mergeUser(cachedUser, {
              role: 'Admin',
              status: 'live',
              token
            });
            applyUser(nextUser);
            return { success: true, user: nextUser };
          }

          if (roleError.response?.status === 401) {
            applyUser(null);
            return { success: false, message: roleError.response?.data?.message || 'Unauthorized' };
          }

          const fallbackUser = mergeUser(cachedUser, {
            role: cachedUser?.role || 'Admin',
            status: cachedUser?.status || 'live',
            token
          });
          applyUser(fallbackUser);
          return { success: true, user: fallbackUser, warning: roleError.response?.data?.message || roleError.message };
        }
      }

      applyUser(null);
      return { success: false, message: 'Unable to verify session' };
    } catch (error) {
      if (error.response?.status === 401) {
        applyUser(null);
        return { success: false, message: error.response?.data?.message || 'Unauthorized' };
      }

      if (cachedUser) {
        const fallbackUser = mergeUser(cachedUser, { token });
        applyUser(fallbackUser);
        return { success: true, user: fallbackUser, warning: error.response?.data?.message || error.message };
      }

      applyUser(null);
      return { success: false, message: error.response?.data?.message || error.message || 'Session refresh failed' };
    }
  }, [applyUser]);

  useEffect(() => {
    let active = true;

    const bootstrapSession = async () => {
      const cachedUser = readPersistedUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      const isAdminRoute = pathname?.startsWith('/admin');
      if (!isAdminRoute) {
        if (!active) return;
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await refreshSession(cachedUser);
      if (!active) return;

      if (!result.success && !cachedUser) {
        setUser(null);
      }

      setLoading(false);
    };

    bootstrapSession();

    return () => {
      active = false;
    };
  }, [pathname, refreshSession]);

  const register = async (name, email, phone, role, password) => {
    try {
      await apiRegister(name, email, phone, role, password);
      const loginResult = await login(email, password);

      if (!loginResult.success) return loginResult;

      return {
        ...loginResult,
        requiresApproval: role === 'Admin'
      };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      const adminData = data.admin;
      const token = data.token;

      const immediateUser = normalizeAdmin(adminData, token);
      applyUser(immediateUser);

      const refreshed = await refreshSession(immediateUser);
      return refreshed.success
        ? { success: true, user: refreshed.user || immediateUser }
        : { success: true, user: immediateUser };
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
      applyUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, register, login, logout, refreshSession }}>
      {children}
    </UserContext.Provider>
  );
};
