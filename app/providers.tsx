'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 🔥 FIX

  return <Provider store={store}>{children}</Provider>;
}
