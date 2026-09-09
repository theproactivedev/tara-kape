'use client';

import { Coffee, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe/stripe-client';
import Header from '@/components/shared/Header';
import StripeCheckoutForm from './StripeCheckoutForm';
import { useSession } from 'next-auth/react';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!session?.user?.id) {
    return;
  }

  useEffect(() => {
    const controller = new AbortController();

    async function createPaymentIntent() {
      try {
        setPaymentError(null);
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok || !data.clientSecret) {
          throw new Error(data.error ?? 'Unable to prepare payment.');
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        if (!controller.signal.aborted) {
          setPaymentError(error instanceof Error ? error.message : 'Unable to prepare payment.');
        }
      }
    }

    createPaymentIntent();
    return () => controller.abort();
  }, [session?.user?.id]);

  if (paymentError) {
    return (
      <div className="bg-cream text-pine min-h-screen">
        <Header isLoggedIn={session.user.id} />
        <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-6 py-16">
          <div className="bg-cream-deep border-pine/15 w-full max-w-md rounded-3xl border px-8 py-12 text-center shadow-lg">
            <p className="text-terracotta font-mono text-xs tracking-[0.22em] uppercase">
              Checkout unavailable
            </p>
            <h1 className="text-pine mt-2 font-serif text-3xl tracking-tight">
              We couldn&apos;t prepare your payment.
            </h1>
            <p className="text-coffee mt-3 text-sm leading-relaxed">{paymentError}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-cream text-pine min-h-screen">
        <Header isLoggedIn={session.user.id} />
        <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-6 py-16">
          <div className="bg-cream-deep border-pine/15 w-full max-w-md rounded-3xl border px-8 py-12 text-center shadow-lg">
            <div className="bg-terracotta/15 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <Coffee className="text-terracotta h-6 w-6" />
            </div>
            <p className="text-terracotta mt-6 font-mono text-xs tracking-[0.22em] uppercase">
              Preparing your order
            </p>
            <h1 className="text-pine mt-2 font-serif text-3xl tracking-tight">
              Warming up the checkout.
            </h1>
            <p className="text-coffee mt-3 text-sm leading-relaxed">
              We&apos;re getting a secure payment session ready for your next roast.
            </p>
            <div className="bg-pine/15 mx-auto mt-8 h-1.5 w-32 overflow-hidden rounded-full">
              <div className="bg-terracotta h-full w-1/2 animate-pulse rounded-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-cream text-pine min-h-screen">
      <Header isLoggedIn={session.user.id} />

      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <section className="pt-2">
            <div className="border-coffee/40 text-coffee inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase">
              <span className="bg-terracotta h-1.5 w-1.5 rounded-full" />
              Secure checkout
            </div>
            <h1 className="text-pine mt-5 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              One good step
              <br />
              <span className="text-terracotta italic">closer to coffee.</span>
            </h1>
            <p className="text-coffee mt-6 max-w-md text-base leading-relaxed">
              Your beans are almost on their way. Complete your payment and we&apos;ll get your
              small-batch roast moving from our drum to your door.
            </p>

            <div className="border-pine/15 bg-cream-deep mt-10 max-w-md rounded-3xl border p-6">
              <div className="flex items-start gap-4">
                <div className="bg-pine flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <ShieldCheck className="text-cream h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-pine font-serif text-xl">Roasted with care.</h2>
                  <p className="text-coffee mt-1 text-sm leading-relaxed">
                    Payments are handled securely by Stripe. We&apos;ll only use your details to
                    complete this order and keep your cup full.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-cream-deep border-pine/15 rounded-3xl border px-6 py-8 shadow-lg sm:px-8">
            <div className="mb-7">
              <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
                Payment details
              </p>
              <h2 className="text-pine mt-2 font-serif text-3xl tracking-tight">
                Finish your order.
              </h2>
              <p className="text-coffee mt-2 text-sm">
                Select <span className="text-terracotta">Card</span>. Use <span className="text-terracotta">4242 4242 4242 4242</span> with any future expiry and CVC to test a successful payment.
              </p>
            </div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm />
            </Elements>
          </section>
        </div>
      </main>
    </div>
  );
}