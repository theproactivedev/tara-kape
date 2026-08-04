"use client";

import { useState } from "react";
import { Coffee, Menu, X, MapPin } from "lucide-react";
import Image from "next/image";

import { BEANS } from '@/lib/constants';
import RoastDots from "@/components/RoastDots";
import LogoPine from '@/public/logo-pine.svg';
import LogoWhite from '@/public/logo-white.svg';
import Link from "next/link";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cream text-pine"
    >
      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-40 border-b bg-cream border-gray-300 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="focus-ring flex items-center gap-2 rounded-sm">
            <Coffee className="h-7 w-7 mb-1" style={{ color: "#D65F43" }} strokeWidth={2} />
            <Image src={LogoPine} alt="Tara Kape's logo" />
          </a>

          {/* <div className="hidden items-center gap-5 md:flex">
            <button
              className="focus-ring flex items-center gap-1.5 rounded-sm  text-sm font-medium"
              style={{ color: "#2F4842" }}
            >
              <ShoppingBag className="h-4 w-4" />
              Bag · 0
            </button>
          </div> */}

          <div className="hidden items-center gap-5 md:flex">
            <Link href="/login" className="text-sm font-medium hover:text-terracotta">
              Log In
            </Link>
            <Link href="/signup" className="text-sm font-medium hover:text-terracotta">
              Sign Up
            </Link>
          </div>

          <button
            className="focus-ring rounded-sm md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden" style={{ borderColor: "#2F484222" }}>
            <div className="flex flex-col gap-4">
              {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                <a key={link} href="#" className=" text-sm font-medium" style={{ color: "#5B3D2E" }}>
                  {link}
                </a>
              ))}
              <a href="#" className=" text-sm font-medium" style={{ color: "#2F4842" }}>
                Bag · 0
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          {/* Copy */}
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider border-coffee/40 text-coffee"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
              Roasted every Tuesday
            </div>

            <h1
              className="font-serif text-5xl text-pine leading-[1.05] tracking-tight md:text-6xl"
            >
              Coffee, the way
              <br />
              the farm <span className="italic text-terracotta">intended.</span>
            </h1>

            <p className=" mt-6 max-w-md text-base leading-relaxed text-coffee">
              We buy direct from three family farms, roast in small batches
              every Tuesday, and ship within 48 hours — so what lands on
              your counter still smells like the drum.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#shop"
                className="focus-ring rounded-full px-6 py-3  text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 bg-terracotta"
              >
                Shop this week&apos;s roast
              </a>
            </div>
          </div>

          {/* Visual: coffee bag + wax stamp + steam */}
          <div className="relative mx-auto flex max-w-sm justify-center">
            <div className="steam absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="absolute h-10 w-1.5 rounded-full bg-pine/33 -left-2.5" />
              <span className="absolute h-10 w-1.5 rounded-full bg-pine/33 left-0" />
              <span className="absolute h-10 w-1.5 rounded-full bg-pine/33 left-2.5" />
            </div>

            <div
              className="relative w-full overflow-hidden rounded-[28px] shadow-xl bg-coffee"
            >
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80"
                alt="Freshly roasted coffee beans"
                width={384}
                height={440}
                className="h-[440px] w-full object-cover opacity-90 mix-blend-luminosity"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-pine" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-xs uppercase tracking-widest text-white/70">Batch No. 214</p>
                <p className="font-serif text-2xl text-white">Yirgacheffe Morning</p>
              </div>
            </div>

            {/* Wax-seal stamp */}
            <div
              className="absolute -right-5 top-8 flex h-24 w-24 rotate-6 items-center justify-center rounded-full border-2 text-center shadow-lg bg-cream border-terracotta text-pine"
            >
              <p className="font-mono text-[9px] font-medium uppercase leading-tight tracking-wider">
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
      <div className="overflow-hidden py-4 bg-pine">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-10">
              {["Ethiopia", "Colombia", "Sumatra", "Guatemala", "Kenya", "Honduras"].map((c) => (
                <span key={c + dup} className="font-serif flex items-center gap-2 text-lg text-cream italic">
                  <MapPin className="h-4 w-4 bg-terracotta" />
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEATURED BEANS ================= */}
      <section id="shop" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-terracotta">
              This week&apos;s lineup
            </p>
            <h2 className="font-serif mt-2 text-4xl tracking-tight text-pine">
              Three farms, three cups.
            </h2>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {BEANS.map((bean) => (
            <div
              key={bean.name}
              className="group flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg border-pine/22 bg-cream-deep"
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
                  <p className="font-mono text-xs uppercase tracking-wider text-coffee/99">
                    {bean.process}
                  </p>
                  <RoastDots level={bean.roast} />
                </div>

                <h3 className="font-serif text-xl text-pine">
                  {bean.name}
                </h3>
                <p className=" mt-1 text-sm text-coffee">
                  {bean.origin}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {bean.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-coffee border-coffee/44"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-4 border-pine/22">
                  <span className="font-serif text-lg text-pine">
                    {bean.price}{" "}
                    <span className="text-xs text-coffee/99">
                      / 12oz
                    </span>
                  </span>
                  <a
                    href="#"
                    className="focus-ring rounded-sm text-sm font-semibold text-terracotta"
                  >
                    Add to bag →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS / RITUAL ================= */}
      <section className="px-6 py-20 md:py-28 bg-pine">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest text-terracotta">
            From cherry to cup
          </p>
          <h2 className="font-serif mt-2 max-w-lg text-4xl tracking-tight text-cream">
            Every bag follows the same short trip.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              { step: "01", title: "Harvest", copy: "Cherries hand-picked at peak ripeness by our partner farms." },
              { step: "02", title: "Rest", copy: "Green beans rest for three weeks so their sugars settle." },
              { step: "03", title: "Roast", copy: "Small 12kg batches, roasted to the bean's own logic, not a template." },
              { step: "04", title: "Ship", copy: "Bagged and mailed within 48 hours of leaving the drum." },
            ].map((s) => (
              <div key={s.step} className="border-t pt-5 border-cream/33">
                <span className="font-mono text-sm bg-terracotta">
                  {s.step}
                </span>
                <h3 className="font-serif mt-3 text-xl text-cream">
                  {s.title}
                </h3>
                <p className=" mt-2 text-sm leading-relaxed text-cream">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="font-serif text-3xl leading-snug tracking-tight md:text-4xl text-pine">
          &ldquo;First bag I&apos;ve bought that tastes like the tasting notes
          actually promised.&rdquo;
        </p>
        <p className=" mt-6 text-sm text-coffee">
          — Priya M., subscriber since Batch No. 178
        </p>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 pb-24">
        <div
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center md:flex-row md:justify-between md:text-left bg-cream-deep"
        >
          <div>
            <h3 className="font-serif text-2xl text-pine">
              Get first dibs on new roasts.
            </h3>
            <p className=" mt-1 text-sm text-coffee">
              One email a week, sent the morning we roast. No spam, ever.
            </p>
          </div>
          <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="focus-ring  w-full rounded-full border bg-white/60 px-4 py-2.5 text-sm border-coffee/44 text-pine"
            />
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-full px-5 py-2.5  text-sm font-semibold text-white bg-terracotta"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 pb-10 pt-14 bg-pine">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="h-7 w-7 text-terracotta" />
              <Image src={LogoWhite} alt="Tara Kape's Logo" />
            </div>
            <p className=" mt-3 text-sm text-cream/99">
              Small-batch coffee, roasted weekly in Antipolo
            </p>
          </div>

          {[
            { title: "Shop", links: ["All beans", "Subscriptions", "Gear", "Gift cards"] },
            { title: "Learn", links: ["Brew guide", "Origins", "Our story", "FAQ"] },
            { title: "Follow", links: ["Instagram", "TikTok", "Newsletter"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-wider text-terracotta">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="focus-ring text-sm text-cream">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-12 max-w-6xl border-t pt-6 text-xs border-cream/22 text-cream/77"
        >
          © {new Date().getFullYear()} Tara Kape
        </div>
      </footer>
    </div>
  );
}
