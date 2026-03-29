'use client';

import { SyntheticEvent, useState } from 'react';
import { Send } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="flex-1">
      <section className="container mx-auto max-w-2xl px-4 py-16">
        {/* Header */}
        <header>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mb-10 text-gray-600">
            Have a question? We&apos;d love to hear from you.
          </p>
        </header>

        {/* Form Section */}
        <section className="rounded-lg border p-8 shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                placeholder="Enter your Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email-id"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                placeholder="Enter your message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-1"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Success Message */}
            {submitted && (
              <p className="text-green-600 text-sm">
                Message sent successfully!
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
