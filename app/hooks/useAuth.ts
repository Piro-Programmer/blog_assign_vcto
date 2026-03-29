'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from './useLocalStorage';

type User = {
  username: string;
  email?: string;
};

export function useAuth() {
  const router = useRouter();

  // ✅ persistent state
  const [user, setUser] = useLocalStorage<User | null>('currentUser', null);
  const [isAuth, setIsAuth] = useLocalStorage<boolean>('isAuth', false);

  // 🔐 LOGIN
  const login = (userData: User) => {
    setUser(userData);
    setIsAuth(true);
    router.push('/dashboard');
  };

  // 🔓 LOGOUT
  const logout = () => {
    setUser(null);
    setIsAuth(false);
    router.push('/login');
  };

  return {
    user,
    isAuth,
    login,
    logout
  };
}
