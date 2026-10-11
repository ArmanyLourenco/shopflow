import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, TOKEN_KEY } from '../services/api';
import { loginResponseSchema } from '../types/product';
import type { LoginValues } from '../schemas/authSchema';

type User = { id: number; username: string; firstName?: string; lastName?: string };
type AuthContextValue = { user: User | null; token: string | null; isAuthenticated: boolean; isLoading: boolean; login: (values: LoginValues) => Promise<void>; logout: () => void };
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => { const raw = localStorage.getItem('shopflow_user'); if (!raw) return null; try { return JSON.parse(raw) as User; } catch { return null; } });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => { if (!token) { setUser(null); localStorage.removeItem('shopflow_user'); } }, [token]);
  const login = useCallback(async (values: LoginValues) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { ...values, expiresInMins: 30 });
      const parsed = loginResponseSchema.safeParse(response.data);
      if (!parsed.success) throw new Error('A API retornou dados de autenticação inválidos.');
      const data = parsed.data;
      const receivedToken = data.accessToken ?? data.token;
      if (!receivedToken) throw new Error('A API não retornou um token de acesso.');
      const nextUser = { id: data.id, username: data.username, firstName: data.firstName, lastName: data.lastName };
      localStorage.setItem(TOKEN_KEY, receivedToken); localStorage.setItem('shopflow_user', JSON.stringify(nextUser));
      setToken(receivedToken); setUser(nextUser);
    } finally { setIsLoading(false); }
  }, []);
  const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('shopflow_user'); setToken(null); setUser(null); }, []);
  const value = useMemo(() => ({ user, token, isAuthenticated: Boolean(token && user), isLoading, login, logout }), [user, token, isLoading, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
