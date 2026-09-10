'use client';

import { SubmitEvent, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed');
      setIsProcessing(false);
    }
    // on success, Stripe redirects to return_url automatically
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-pine/15 rounded-2xl border bg-white/60 p-4 sm:p-5">
        <PaymentElement />
      </div>

      <div className="flex items-center gap-2 text-xs text-coffee-soft">
        <span className="bg-terracotta h-1.5 w-1.5 rounded-full" />
        Your payment information is encrypted and securely processed.
      </div>

      {errorMessage && (
        <p className="border-terracotta/30 bg-terracotta/10 text-terracotta rounded-2xl border px-4 py-3 text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="focus-ring bg-terracotta w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isProcessing ? 'Processing your payment...' : 'Complete payment'}
      </button>

      <p className="text-coffee-soft text-center font-mono text-[10px] tracking-[0.18em] uppercase">
        Freshly roasted · Carefully packed · Sent with thanks
      </p>
    </form>
  );
}