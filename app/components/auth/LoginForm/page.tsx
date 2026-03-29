'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

type LoginFormValues = {
  username: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginFormValues, string>>;

export default function LoginForm() {
  const { login } = useAuth(); // ✅ hook use

  const [form, setForm] = useState<LoginFormValues>({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Validation
  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!form.username.trim()) {
      nextErrors.username = 'Username is required.';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ✅ Input Change
  const handleChange =
    (field: keyof LoginFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setError(null);
    };

  // ✅ Submit
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError(null);

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      setErrors({ username: 'No user found. Please signup first.' });
      setLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.username === form.username && user.password === form.password) {
      // ✅ CLEAN LOGIN (HOOK)
      login(user);
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border p-8 shadow-sm">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Login using your registered account.
        </p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Username */}
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={handleChange('username')}
            placeholder="Enter username"
            className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1"
          />
          {errors.username && (
            <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Enter password"
            className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1"
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Global Error */}
        {error && (
          <div className="text-red-500 text-sm bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600">
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}
