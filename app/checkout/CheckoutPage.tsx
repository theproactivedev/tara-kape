'use client';

import Link from 'next/link';
import { SubmitEvent, useState } from 'react';
import { useSession } from 'next-auth/react';

import Header from '@/components/shared/Header';
import {
  ShippingInformationInput,
  updateUserShippingInformation,
} from '@/lib/actions/updateUserShippingInformation';
import { UserDocument } from '@/database/user.model';

const initialFormData: ShippingInformationInput = {
  address: '',
  city: '',
  stateOrProvince: '',
  zip: '',
  country: '',
};

export default function CheckoutPage({ user } : { user: UserDocument | null }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<ShippingInformationInput>(user
    ? {
      address: user.address || '',
      city: user.city || '',
      stateOrProvince: user.stateOrProvince || '',
      zip: user.zip || '',
      country: user.country || ''
    } : initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isFormComplete = Object.values(formData).every((value) => value.trim().length > 0);

  function handleFieldChange(field: keyof ShippingInformationInput, value: string) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
    setSuccess(false);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!session?.user?.id) {
      setError('Please sign in before entering your shipping information.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateUserShippingInformation(session.user.id, formData);

      if (!result.success) {
        setError(result.error);
        return;
      }
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-cream text-pine min-h-screen">
      <Header isLoggedIn={session?.user?.id} />

      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        {!session?.user?.id ? (
          <section className="bg-cream-deep border-pine/15 mx-auto max-w-xl rounded-3xl border px-6 py-12 text-center shadow-lg sm:px-8">
            <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
              Checkout
            </p>
            <h1 className="text-pine mt-2 font-serif text-4xl tracking-tight">
              Sign in to continue.
            </h1>
            <p className="text-coffee mt-4 text-sm leading-relaxed">
              Your shipping information is saved securely to your Tara Kape account.
            </p>
            <Link
              href="/sign-in"
              className="focus-ring bg-terracotta mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Sign in
            </Link>
          </section>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="pt-2">
              <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
                Nearly there
              </p>
              <h1 className="text-pine mt-2 font-serif text-5xl leading-tight tracking-tight">
                Where should we send your roast?
              </h1>
              <p className="text-coffee mt-6 max-w-md text-base leading-relaxed">
                Add your shipping details so every small-batch order arrives at the right door.
              </p>
              <Link
                href="/cart"
                className="text-pine mt-8 inline-flex text-sm font-semibold underline decoration-terracotta underline-offset-4 hover:text-terracotta"
              >
                Back to your bag
              </Link>
            </div>

            <section className="bg-cream-deep border-pine/15 rounded-3xl border px-6 py-8 shadow-lg sm:px-8">
              <div className="mb-7">
                <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
                  Shipping information
                </p>
                <h2 className="text-pine mt-2 font-serif text-3xl tracking-tight">
                  Delivery details.
                </h2>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="address" className="text-coffee mb-2 block text-sm font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    required
                    value={formData.address}
                    onChange={(event) => handleFieldChange('address', event.target.value)}
                    className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="text-coffee mb-2 block text-sm font-medium">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={(event) => handleFieldChange('city', event.target.value)}
                      className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stateOrProvince"
                      className="text-coffee mb-2 block text-sm font-medium"
                    >
                      State or province
                    </label>
                    <input
                      id="stateOrProvince"
                      name="stateOrProvince"
                      type="text"
                      autoComplete="address-level1"
                      required
                      value={formData.stateOrProvince}
                      onChange={(event) =>
                        handleFieldChange('stateOrProvince', event.target.value)
                      }
                      className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="zip" className="text-coffee mb-2 block text-sm font-medium">
                      ZIP or postal code
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      required
                      value={formData.zip}
                      onChange={(event) => handleFieldChange('zip', event.target.value)}
                      className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="text-coffee mb-2 block text-sm font-medium">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      autoComplete="country-name"
                      required
                      value={formData.country}
                      onChange={(event) => handleFieldChange('country', event.target.value)}
                      className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                {error ? (
                  <p className="text-terracotta text-sm" role="alert">
                    {error}
                  </p>
                ) : null}

                {success ? (
                  <p className="text-pine text-sm" role="status">
                    Shipping information saved successfully.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormComplete}
                  className="focus-ring bg-terracotta w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving details...' : 'Save shipping information'}
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
