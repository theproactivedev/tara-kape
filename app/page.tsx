'use client';

import { Coffee, MapPin } from 'lucide-react';
import Image from 'next/image';

import LogoWhite from '@/public/logo-white.svg';
import Shop from '@/components/shop/Shop';
import Header from '@/components/shared/Header';
import { GetAllProducts, getAllProducts, ProductWithId } from '@/lib/actions/getAllProducts';
import { getCart, GetCartResult } from '@/lib/actions/getCart';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ICartPopulated } from '@/database/cart.model';

export default function Home() {
  const { data: session } = useSession();
  const [coffeeProducts, setCoffeeProducts] = useState<ProductWithId[] | []>([])
  const [cart, setCart] = useState<ICartPopulated>({
    user: '',
    items: []
  })

  useEffect(() => {
    getAllProducts().then((productResult: GetAllProducts) => {
      if(productResult.success) {
        setCoffeeProducts(productResult.products || [])
      }
    });

    getCart(session?.user?.id as string).then((cartResult: GetCartResult) => {
      if(cartResult.success) {
        setCart(cartResult.cart);
      }
    });
  }, []);

  return (
    <div className="bg-cream text-pine min-h-screen">
      {/* ================= NAV ================= */}
      <Header isLoggedIn={session?.user?.id} cart={cart} />

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          {/* Copy */}
          <div>
            <div className="border-coffee/40 text-coffee mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase">
              <span className="bg-terracotta h-1.5 w-1.5 rounded-full" />
              Roasted every Tuesday
            </div>

            <h1 className="text-pine font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Coffee, the way
              <br />
              the farm <span className="text-terracotta italic">intended.</span>
            </h1>

            <p className="text-coffee mt-6 max-w-md text-base leading-relaxed">
              We buy direct from three family farms, roast in small batches every Tuesday, and ship
              within 48 hours — so what lands on your counter still smells like the drum.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#shop"
                className="focus-ring bg-terracotta rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Shop this week&apos;s roast
              </a>
            </div>
          </div>

          {/* Visual: coffee bag + wax stamp + steam */}
          <div className="relative mx-auto flex max-w-sm justify-center">
            <div className="steam absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-pine/33 absolute -left-2.5 h-10 w-1.5 rounded-full" />
              <span className="bg-pine/33 absolute left-0 h-10 w-1.5 rounded-full" />
              <span className="bg-pine/33 absolute left-2.5 h-10 w-1.5 rounded-full" />
            </div>

            <div className="bg-coffee relative w-full overflow-hidden rounded-[28px] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80"
                alt="Freshly roasted coffee beans"
                width={384}
                height={440}
                className="h-[440px] w-full object-cover opacity-90 mix-blend-luminosity"
              />

              <div className="to-pine absolute inset-0 bg-gradient-to-b from-transparent from-40%" />

              <div className="absolute right-6 bottom-6 left-6">
                <p className="font-mono text-xs tracking-widest text-white/70 uppercase">
                  Batch No. 214
                </p>
                <p className="font-serif text-2xl text-white">Yirgacheffe Morning</p>
              </div>
            </div>

            {/* Wax-seal stamp */}
            <div className="bg-cream border-terracotta text-pine absolute top-8 -right-5 flex h-24 w-24 rotate-6 items-center justify-center rounded-full border-2 text-center shadow-lg">
              <p className="font-mono text-[9px] leading-tight font-medium tracking-wider uppercase">
                Single
                <br />
                Origin
                <br />
                <span className="text-terracotta">★</span>
                <br />
                Small Batch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGIN MARQUEE ================= */}
      <div className="bg-pine overflow-hidden py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-10">
              {['Ethiopia', 'Colombia', 'Sumatra', 'Guatemala', 'Kenya', 'Honduras'].map((c) => (
                <span
                  key={c + dup}
                  className="text-cream flex items-center gap-2 font-serif text-lg italic"
                >
                  <MapPin className="bg-terracotta h-4 w-4" />
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEATURED BEANS ================= */}
      <Shop products={coffeeProducts ?? []} userId={session?.user?.id} />

      {/* ================= PROCESS / RITUAL ================= */}
      <section className="bg-pine px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-terracotta font-mono text-xs tracking-widest uppercase">
            From cherry to cup
          </p>
          <h2 className="text-cream mt-2 max-w-lg font-serif text-4xl tracking-tight">
            Every bag follows the same short trip.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Harvest',
                copy: 'Cherries hand-picked at peak ripeness by our partner farms.',
              },
              {
                step: '02',
                title: 'Rest',
                copy: 'Green beans rest for three weeks so their sugars settle.',
              },
              {
                step: '03',
                title: 'Roast',
                copy: "Small 12kg batches, roasted to the bean's own logic, not a template.",
              },
              {
                step: '04',
                title: 'Ship',
                copy: 'Bagged and mailed within 48 hours of leaving the drum.',
              },
            ].map((s) => (
              <div key={s.step} className="border-cream/33 border-t pt-5">
                <span className="bg-terracotta font-mono text-sm">{s.step}</span>
                <h3 className="text-cream mt-3 font-serif text-xl">{s.title}</h3>
                <p className="text-cream mt-2 text-sm leading-relaxed">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="text-pine font-serif text-3xl leading-snug tracking-tight md:text-4xl">
          &ldquo;First bag I&apos;ve bought that tastes like the tasting notes actually
          promised.&rdquo;
        </p>
        <p className="text-coffee mt-6 text-sm">— Priya M., subscriber since Batch No. 178</p>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 pb-24">
        <div className="bg-cream-deep mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-pine font-serif text-2xl">Get first dibs on new roasts.</h3>
            <p className="text-coffee mt-1 text-sm">
              One email a week, sent the morning we roast. No spam, ever.
            </p>
          </div>
          <form className="flex w-full max-w-sm gap-2">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="focus-ring border-coffee/44 text-pine w-full rounded-full border bg-white/60 px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              className="focus-ring bg-terracotta shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-pine px-6 pt-14 pb-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="text-terracotta h-7 w-7" />
              <Image src={LogoWhite} alt="Tara Kape's Logo" />
            </div>
            <p className="text-cream/99 mt-3 text-sm">
              Small-batch coffee, roasted weekly in Antipolo
            </p>
          </div>

          {[
            { title: 'Shop', links: ['All beans', 'Subscriptions', 'Gear', 'Gift cards'] },
            { title: 'Learn', links: ['Brew guide', 'Origins', 'Our story', 'FAQ'] },
            { title: 'Follow', links: ['Instagram', 'TikTok', 'Newsletter'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-terracotta font-mono text-xs tracking-wider uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="focus-ring text-cream text-sm">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-cream/22 text-cream/77 mx-auto mt-12 max-w-6xl border-t pt-6 text-xs">
          © {new Date().getFullYear()} Tara Kape
        </div>
      </footer>
    </div>
  );
}
