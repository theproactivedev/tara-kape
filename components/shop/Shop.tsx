'use client';

import Image from 'next/image';
import React from 'react';

import RoastDots from '../RoastDots';
import AddToBagLink from './AddToBagLink';
import { Button } from '../ui/button';
import { addToCart } from '@/lib/actions/addToCart';
import type { ProductWithId } from '@/lib/actions/getAllProducts';
import { useCartStore } from '@/store/cartStore';

type ShopProps = {
  products: ProductWithId[];
  userId?: string;
};

const Shop: React.FC<ShopProps> = ({ products, userId }) => {
  const refreshCart = useCartStore((state) => state.refreshCart);

  const handleAddToCart = async (bean: ProductWithId) => {
    const productId = bean.id ?? bean._id;

    if (!userId || !productId) {
      return;
    }

    await addToCart(userId, productId);
    await refreshCart(userId);
  };

  if (!products.length) {
    return null;
  }

  return (
    <section id="shop" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
            This week&apos;s lineup
          </p>
          <h2 className="text-pine mt-2 font-serif text-4xl tracking-tight">
            Three farms, three cups.
          </h2>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {products.map((bean: ProductWithId) => (
          <div
            key={bean.id ?? bean._id ?? bean.name}
            className="group border-pine/22 bg-cream-deep flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                fill
                src={bean.image}
                alt={bean.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-coffee/99 font-mono text-xs tracking-wider uppercase">
                  {bean.process}
                </p>
                <RoastDots level={bean.roast || 0} />
              </div>

              <h3 className="text-pine font-serif text-xl">{bean.name}</h3>
              <p className="text-coffee mt-1 text-sm">{bean.origin}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {bean.notes?.map((note) => (
                  <span
                    key={note}
                    className="text-coffee border-coffee/44 rounded-full border px-2.5 py-1 font-mono text-[11px]"
                  >
                    {note}
                  </span>
                ))}  
              </div>

              <div className="border-pine/22 mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-pine font-serif text-lg">
                  ${bean.price} <span className="text-coffee/99 text-xs">/ 12oz</span>
                </span>
                {userId
                  ? (
                    <Button
                      variant="ghost"
                      className="focus-ring text-terracotta rounded-sm text-sm font-semibold"
                      onClick={() => handleAddToCart(bean)}
                    >
                      Add to bag →
                    </Button>
                  )
                  : <AddToBagLink />
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
