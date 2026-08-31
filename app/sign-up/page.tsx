'use client';

import { SubmitEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

import { registerUser } from '@/lib/actions/registerUser';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: SignUpFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const { name, email, password, confirmPassword } = formData;
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError('Invalid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerUser({
        name: normalizedName,
        email: normalizedEmail,
        password,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      const signInResult = await signIn('credentials', {
        email: normalizedEmail,
        password,
        redirect: false
      });

      if (signInResult?.error) {
        throw new Error('Your account was created, but sign in failed');
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
        <h1 className="mt-2 font-serif text-4xl tracking-tight">Create your account.</h1>
        <p className="text-coffee mt-3 text-sm leading-relaxed">
          Save your details and keep every weekly roast close at hand.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="text-coffee mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
          />
        </div>

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

        <div>
          <label
            htmlFor="password-confirmation"
            className="text-coffee mb-2 block text-sm font-medium"
          >
            Confirm password
          </label>
          <input
            id="password-confirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={formData.confirmPassword}
            onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
            className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
          />
        </div>

        {error && (
          <p className="text-terracotta text-sm" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="text-pine text-sm" role="status">
            Account created. Welcome to Tara Kape.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (!formData.name || !formData.email || !formData.password || !formData.confirmPassword)}
          className="focus-ring bg-terracotta w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </main>
  );
}
