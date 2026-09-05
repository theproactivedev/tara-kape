'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';

import Header from '@/components/shared/Header';
import { updateCartItemQuantity } from '@/lib/actions/updateCartItemQuantity';
import { useCartStore } from '@/store/cartStore';

type CartProduct = {
  _id?: string;
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  origin?: string;
  process?: string;
  roast?: number;
  notes?: string[];
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);

export default function CartPage() {
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.cart);
  const refreshCart = useCartStore((state) => state.refreshCart);

  useEffect(() => {
    refreshCart(session?.user?.id);
  }, [refreshCart, session?.user?.id]);

  const cartItems = cart?.items ?? [];
  const subtotal = cartItems.reduce((total, item) => {
    const product =
      typeof item.product === 'object' && item.product !== null ? (item.product as CartProduct) : null;
    const price = Number(product?.price ?? item.priceAtAdd ?? 0);
    return total + price * item.quantity;
  }, 0);

  const handleQuantityChange = async (productId: string, delta: 1 | -1) => {
    if (!session?.user?.id || !productId) {
      return;
    }

    const result = await updateCartItemQuantity(session.user.id, productId, delta);

    if (result.success) {
      await refreshCart(session.user.id);
    }
  };

  return (
    <div className="bg-cream text-pine min-h-screen">
      <Header isLoggedIn={session?.user?.id} />

      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-terracotta font-mono text-xs tracking-[0.22em] uppercase">Your bag</p>
            <h1 className="text-pine mt-2 font-serif text-4xl tracking-tight md:text-5xl">
              Coffee for the next few mornings.
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-pine/20 bg-white/50 px-3 py-2 md:flex">
            <ShoppingBag className="text-pine h-4 w-4" />
            <span className="text-sm font-medium">
              {cartItems.reduce((count, item) => count + item.quantity, 0)} items
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-cream-deep border-pine/15 rounded-[28px] border px-6 py-16 text-center shadow-sm">
            <p className="text-pine font-serif text-3xl">Your cart is empty.</p>
            <p className="text-coffee mt-3 text-sm">
              Add a few small-batch roasts and they&apos;ll appear here.
            </p>
            <Link
              href="/"
              className="focus-ring bg-terracotta mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <section className="space-y-5">
              {cartItems.map((item) => {
                const product =
                  typeof item.product === 'object' && item.product !== null ? (item.product as CartProduct) : null;
                const productId = product?._id ?? product?.id ?? undefined;
                const unitPrice = Number(product?.price ?? item.priceAtAdd ?? 0);
                const productNotes = Array.isArray(product?.notes) ? product.notes : [];
                const lineTotal = unitPrice * item.quantity;

                return (
                  <article
                    key={productId ?? `${item.product ?? 'item'}-${item.quantity}`}
                    className="bg-cream-deep border-pine/15 overflow-hidden rounded-[24px] border"
                  >
                    <div className="flex flex-col gap-5 p-5 md:flex-row">
                      <div className="relative h-32 w-full overflow-hidden rounded-2xl md:w-32">
                        {product?.image ? (
                          <Image
                            src={product.image}
                            alt={product.name || 'Coffee product'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="bg-pine flex h-full w-full items-center justify-center text-sm font-medium text-white">
                            Coffee
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-coffee/90 font-mono text-[10px] tracking-[0.22em] uppercase">
                              {product?.process || 'Small batch'}
                            </p>
                            <h2 className="text-pine mt-1 font-serif text-2xl">
                              {product?.name || 'Roasted coffee'}
                            </h2>
                          </div>

                          <p className="text-pine font-serif text-2xl">
                            {formatPrice(lineTotal)}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-coffee md:text-sm">
                          {product?.origin ? (
                            <span className="rounded-full border border-pine/20 bg-white/50 px-2.5 py-1">
                              {product.origin}
                            </span>
                          ) : null}
                          {product?.roast ? (
                            <span className="rounded-full border border-pine/20 bg-white/50 px-2.5 py-1">
                              Roast {product.roast}/3
                            </span>
                          ) : null}
                        </div>

                        {productNotes.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {productNotes.map((note: string) => (
                              <span
                                key={note}
                                className="text-coffee border-coffee/40 rounded-full border px-2.5 py-1 font-mono text-[11px]"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-coffee text-sm">Qty</span>
                            <div className="border-pine/20 bg-white/70 inline-flex items-center overflow-hidden rounded-full border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => productId && handleQuantityChange(productId, -1)}
                                className="focus-ring hover:bg-pine/5 flex h-10 w-10 items-center justify-center text-lg text-pine"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="text"
                                aria-label="Quantity"
                                value={item.quantity}
                                readOnly
                                className="text-pine w-12 border-0 bg-transparent text-center text-sm font-semibold outline-none"
                              />
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => productId && handleQuantityChange(productId, 1)}
                                className="focus-ring hover:bg-pine/5 flex h-10 w-10 items-center justify-center text-lg text-pine"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-sm text-coffee">
                            <span className="mr-2">Unit price</span>
                            <span className="text-pine font-semibold">{formatPrice(unitPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="border-pine/15 bg-cream-deep self-start rounded-[28px] border p-6 shadow-sm">
              <p className="text-terracotta font-mono text-[11px] tracking-[0.22em] uppercase">Summary</p>
              <h3 className="text-pine mt-2 font-serif text-3xl">Total</h3>

              <div className="mt-6 space-y-4 text-sm text-coffee">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-pine font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="text-pine font-medium">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated total</span>
                  <span className="text-pine font-serif text-2xl">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="focus-ring bg-terracotta mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Checkout
              </Link>

              <Link
                href="/"
                className="text-pine mt-4 inline-flex w-full items-center justify-center rounded-full border border-pine/20 bg-white/60 px-5 py-3 text-sm font-medium transition-colors hover:bg-white"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
