'use client';

import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // The webhook clears MongoDB; this keeps the current browser state in sync immediately.
    clearCart();

    const redirectTimer = window.setTimeout(() => {
      router.push('/');
    }, 5_000);

    return () => window.clearTimeout(redirectTimer);
  }, [clearCart, router]);

  return (
    <main className="bg-cream text-pine flex min-h-screen items-center justify-center px-6 py-16">
      <section className="bg-cream-deep border-pine/15 w-full max-w-lg rounded-3xl border px-8 py-12 text-center shadow-lg sm:px-12">
        <div className="bg-terracotta mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Check className="text-cream h-8 w-8" strokeWidth={2.5} />
        </div>

        <p className="text-terracotta mt-7 font-mono text-xs tracking-[0.22em] uppercase">
          Payment confirmed
        </p>
        <h1 className="text-pine mt-3 font-serif text-4xl tracking-tight md:text-5xl">
          Your payment was successful.
        </h1>
        <p className="text-coffee mt-4 text-base leading-relaxed">
          Thanks for your order. We&apos;re getting your fresh roast ready.
        </p>

        <div className="border-pine/15 mt-8 border-t pt-6">
          <p className="text-coffee-soft font-mono text-xs tracking-wider uppercase">
            Redirecting you to the home page in 5 seconds
          </p>
          <div className="bg-pine/15 mx-auto mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full">
            <div className="bg-terracotta h-full w-full animate-pulse rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
