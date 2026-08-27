'use client';

import { SubmitEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

interface SignInFormData {
  email: string;
  password: string;
}

const initialFormData: SignInFormData = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>(initialFormData);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const { email, password } = formData;
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError('Invalid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const signInResult = await signIn('credentials', {
        email: normalizedEmail,
        password,
        redirect: false
      });

      if (signInResult?.error) {
        throw new Error('Sign in failed');
      }
      
      setSuccess(true);
      setFormData(initialFormData);
      window.location.href = "/";
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-cream-deep text-pine w-full max-w-md rounded-3xl px-6 py-8 shadow-lg sm:px-8 mx-auto mt-16">
      <div className="mb-7">
        <p className="text-terracotta font-mono text-xs tracking-widest uppercase">Join the roast</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight">Sign In.</h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-email" className="text-coffee mb-2 block text-sm font-medium">
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-coffee mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
          />
          <p className="text-coffee-soft mt-2 text-xs">Use at least 8 characters.</p>
        </div>

        {error && (
          <p className="text-terracotta text-sm" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="text-pine text-sm" role="status">
            Welcome back to Tara Kape.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (!formData.email || !formData.password)}
          className="focus-ring bg-terracotta w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
