import { useContext } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';

export function useAuth() {
  const ctx = useAuthContext();
  return ctx;
}
