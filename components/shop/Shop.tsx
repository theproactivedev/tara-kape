import { BEANS } from '@/lib/constants';
import Image from 'next/image';
import React from 'react';

import RoastDots from '../RoastDots';
import AddToBagLink from './AddToBagLink';
import { useSession } from 'next-auth/react';

const Shop: React.FC = () => {
  const { data: session } = useSession();
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
        {BEANS.map((bean) => (
          <div
            key={bean.name}
            className="group border-pine/22 bg-cream-deep flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                fill
                src={bean.img}
                alt={bean.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-coffee/99 font-mono text-xs tracking-wider uppercase">
                  {bean.process}
                </p>
                <RoastDots level={bean.roast} />
              </div>

              <h3 className="text-pine font-serif text-xl">{bean.name}</h3>
              <p className="text-coffee mt-1 text-sm">{bean.origin}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {bean.notes.map((note) => (
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
                  {bean.price} <span className="text-coffee/99 text-xs">/ 12oz</span>
                </span>
                {session
                  ? (
                    <a href="#" className="focus-ring text-terracotta rounded-sm text-sm font-semibold">
                      Add to bag →
                    </a>
                  ) : <AddToBagLink />
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
