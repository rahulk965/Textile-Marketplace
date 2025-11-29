import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../utils/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    if (userRole) localStorage.setItem('role', userRole); else localStorage.removeItem('role');
  }, [token, userRole]);

  const loginVendor = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/vendor/login', { email, password });
      setToken(data.token);
      setUserRole('vendor');
      setLoading(false);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const registerVendor = async (payload) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/vendor/register', payload);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  const loginAdmin = async (username, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/admin/login', { username, password });
      setToken(data.token);
      setUserRole('admin');
      setLoading(false);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => { setToken(null); setUserRole(null); setError(null); };

  const value = useMemo(() => ({
    token,
    userRole,
    loading,
    error,
    isAuthenticated: Boolean(token),
    loginVendor,
    registerVendor,
    loginAdmin,
    logout,
  }), [token, userRole, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() { return useContext(AuthContext); }
