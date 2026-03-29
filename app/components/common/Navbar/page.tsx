'use client';

import Link from 'next/link';
import { Menu, Moon, Sun, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

type UserType = {
  name?: string;
  username?: string;
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 🔥 NEW
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // 🔥 CHECK LOGIN
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuth');

    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-blue-600">BLOG</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-primary">
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary"
            aria-label="Toggle theme"
            type="button"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* 🔥 AUTH UI */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-secondary"
              >
                <User className="h-4 w-4" />
                {user.name || user.username}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-md p-2 hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button className="rounded-md p-2 text-muted-foreground md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
