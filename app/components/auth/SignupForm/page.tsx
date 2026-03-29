'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SignupFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = Partial<Record<keyof SignupFormValues, string>>;

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState<SignupFormValues>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const nextErrors: SignupErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.username.trim()) nextErrors.username = 'Username is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = 'Enter a valid email address.';
    if (!form.password.trim()) nextErrors.password = 'Password is required.';
    else if (form.password.length < 6)
      nextErrors.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword.trim())
      nextErrors.confirmPassword = 'Confirm your password.';
    else if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = 'Passwords do not match.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange =
    (field: keyof SignupFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setSuccess(false);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    // 🔥 save user in localStorage
    const userData = {
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password
    };

    localStorage.setItem('user', JSON.stringify(userData));

    setSuccess(true);

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to get started with BlogApp.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your name"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-sm font-medium"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange('username')}
            placeholder="Choose a username"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.username && (
            <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Create password"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Repeat password"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {success && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Account form is valid. Redirecting you to login...
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:opacity-90"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
