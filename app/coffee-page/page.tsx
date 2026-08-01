"use client";

import { useState } from "react";
import { Coffee, ArrowRight, ShoppingBag, Menu, X, MapPin } from "lucide-react";

import { BEANS } from '@/lib/constants';
import RoastDots from "@/components/RoastDots";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFDD0", color: "#2F4842" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes rise {
          0%   { transform: translateY(0) scaleX(1); opacity: 0.55; }
          50%  { transform: translateY(-14px) scaleX(1.15); opacity: 0.9; }
          100% { transform: translateY(-30px) scaleX(0.9); opacity: 0; }
        }
        .steam span {
          animation: rise 3.2s ease-in-out infinite;
        }
        .steam span:nth-child(2) { animation-delay: 0.6s; }
        .steam span:nth-child(3) { animation-delay: 1.2s; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 26s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .steam span, .marquee-track { animation: none !important; }
        }

        .focus-ring:focus-visible {
          outline: 2px solid #D65F43;
          outline-offset: 3px;
        }
      `}</style>

      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "#FFFDD0EE", borderColor: "#2F484222", backdropFilter: "blur(6px)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="focus-ring flex items-center gap-2 rounded-sm">
            <Coffee className="h-5 w-5" style={{ color: "#D65F43" }} strokeWidth={2} />
            <span className="font-display text-xl font-semibold tracking-tight" style={{ color: "#2F4842" }}>
              Kettle &amp; Bloom
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {['Link 1', 'Link 2', 'Link 3'].map((link) => (
              <a
                key={link}
                href="#"
                className="focus-ring font-body text-sm font-medium rounded-sm transition-colors"
                style={{ color: "#5B3D2E" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D65F43")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5B3D2E")}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <button
              className="focus-ring flex items-center gap-1.5 rounded-sm font-body text-sm font-medium"
              style={{ color: "#2F4842" }}
            >
              <ShoppingBag className="h-4 w-4" />
              Bag · 0
            </button>
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
                <a key={link} href="#" className="font-body text-sm font-medium" style={{ color: "#5B3D2E" }}>
                  {link}
                </a>
              ))}
              <a href="#" className="font-body text-sm font-medium" style={{ color: "#2F4842" }}>
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
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider"
              style={{ borderColor: "#5B3D2E55", color: "#5B3D2E" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#D65F43" }} />
              Roasted every Tuesday
            </div>

            <h1
              className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl"
              style={{ color: "#2F4842" }}
            >
              Coffee, the way
              <br />
              the farm <span style={{ fontStyle: "italic", color: "#D65F43" }}>intended.</span>
            </h1>

            <p className="font-body mt-6 max-w-md text-base leading-relaxed" style={{ color: "#5B3D2E" }}>
              We buy direct from three family farms, roast in small batches
              every Tuesday, and ship within 48 hours — so what lands on
              your counter still smells like the drum.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#shop"
                className="focus-ring rounded-full px-6 py-3 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#D65F43" }}
              >
                Shop this week&apos;s roast
              </a>
              <a
                href="#origins"
                className="focus-ring group flex items-center gap-1.5 rounded-sm font-body text-sm font-semibold"
                style={{ color: "#2F4842" }}
              >
                See where it&apos;s from
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "#D65F43" }} />
              </a>
            </div>
          </div>

          {/* Visual: coffee bag + wax stamp + steam */}
          <div className="relative mx-auto flex max-w-sm justify-center">
            <div className="steam absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="absolute h-10 w-1.5 rounded-full" style={{ backgroundColor: "#2F484233", left: -10 }} />
              <span className="absolute h-10 w-1.5 rounded-full" style={{ backgroundColor: "#2F484233", left: 0 }} />
              <span className="absolute h-10 w-1.5 rounded-full" style={{ backgroundColor: "#2F484233", left: 10 }} />
            </div>

            <div
              className="relative w-full overflow-hidden rounded-[28px] shadow-xl"
              style={{ backgroundColor: "#5B3D2E" }}
            >
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80"
                alt="Freshly roasted coffee beans"
                className="h-[440px] w-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, #2F4842CC 100%)" }} />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-xs uppercase tracking-widest text-white/70">Batch No. 214</p>
                <p className="font-display text-2xl text-white">Yirgacheffe Morning</p>
              </div>
            </div>

            {/* Wax-seal stamp */}
            <div
              className="absolute -right-5 top-8 flex h-24 w-24 rotate-6 items-center justify-center rounded-full border-2 text-center shadow-lg"
              style={{ backgroundColor: "#FFFDD0", borderColor: "#D65F43", color: "#2F4842" }}
            >
              <p className="font-mono text-[9px] font-medium uppercase leading-tight tracking-wider">
                Single
                <br />
                Origin
                <br />
                <span style={{ color: "#D65F43" }}>★</span>
                <br />
                Small Batch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGIN MARQUEE ================= */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: "#2F4842" }}>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-10">
              {["Ethiopia", "Colombia", "Sumatra", "Guatemala", "Kenya", "Honduras"].map((c) => (
                <span key={c + dup} className="font-display flex items-center gap-2 text-lg italic" style={{ color: "#FFFDD0" }}>
                  <MapPin className="h-4 w-4" style={{ color: "#D65F43" }} />
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
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#D65F43" }}>
              This week&apos;s lineup
            </p>
            <h2 className="font-display mt-2 text-4xl tracking-tight" style={{ color: "#2F4842" }}>
              Three farms, three cups.
            </h2>
          </div>
          <a href="#" className="focus-ring font-body text-sm font-semibold" style={{ color: "#D65F43" }}>
            View all beans →
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {BEANS.map((bean) => (
            <div
              key={bean.name}
              className="group flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
              style={{ borderColor: "#2F484222", backgroundColor: "#F5EFB8" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={bean.img}
                  alt={bean.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "#5B3D2E99" }}>
                    {bean.process}
                  </p>
                  <RoastDots level={bean.roast} />
                </div>

                <h3 className="font-display text-xl" style={{ color: "#2F4842" }}>
                  {bean.name}
                </h3>
                <p className="font-body mt-1 text-sm" style={{ color: "#5B3D2E" }}>
                  {bean.origin} · {bean.altitude}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {bean.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border px-2.5 py-1 font-mono text-[11px]"
                      style={{ borderColor: "#5B3D2E44", color: "#5B3D2E" }}
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: "#2F484222" }}>
                  <span className="font-display text-lg" style={{ color: "#2F4842" }}>
                    {bean.price}{" "}
                    <span className="font-body text-xs" style={{ color: "#5B3D2E99" }}>
                      / 12oz
                    </span>
                  </span>
                  <a
                    href="#"
                    className="focus-ring rounded-sm font-body text-sm font-semibold"
                    style={{ color: "#D65F43" }}
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
      <section className="px-6 py-20 md:py-28" style={{ backgroundColor: "#2F4842" }}>
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#D65F43" }}>
            From cherry to cup
          </p>
          <h2 className="font-display mt-2 max-w-lg text-4xl tracking-tight" style={{ color: "#FFFDD0" }}>
            Every bag follows the same short trip.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              { step: "01", title: "Harvest", copy: "Cherries hand-picked at peak ripeness by our partner farms." },
              { step: "02", title: "Rest", copy: "Green beans rest for three weeks so their sugars settle." },
              { step: "03", title: "Roast", copy: "Small 12kg batches, roasted to the bean's own logic, not a template." },
              { step: "04", title: "Ship", copy: "Bagged and mailed within 48 hours of leaving the drum." },
            ].map((s) => (
              <div key={s.step} className="border-t pt-5" style={{ borderColor: "#FFFDD033" }}>
                <span className="font-mono text-sm" style={{ color: "#D65F43" }}>
                  {s.step}
                </span>
                <h3 className="font-display mt-3 text-xl" style={{ color: "#FFFDD0" }}>
                  {s.title}
                </h3>
                <p className="font-body mt-2 text-sm leading-relaxed" style={{ color: "#FFFDD0AA" }}>
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="font-display text-3xl leading-snug tracking-tight md:text-4xl" style={{ color: "#2F4842" }}>
          &ldquo;First bag I&apos;ve bought that tastes like the tasting notes
          actually promised.&rdquo;
        </p>
        <p className="font-body mt-6 text-sm" style={{ color: "#5B3D2E" }}>
          — Priya M., subscriber since Batch No. 178
        </p>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 pb-24">
        <div
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center md:flex-row md:justify-between md:text-left"
          style={{ backgroundColor: "#F5EFB8" }}
        >
          <div>
            <h3 className="font-display text-2xl" style={{ color: "#2F4842" }}>
              Get first dibs on new roasts.
            </h3>
            <p className="font-body mt-1 text-sm" style={{ color: "#5B3D2E" }}>
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
              className="focus-ring font-body w-full rounded-full border bg-white/60 px-4 py-2.5 text-sm"
              style={{ borderColor: "#5B3D2E44", color: "#2F4842" }}
            />
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-full px-5 py-2.5 font-body text-sm font-semibold text-white"
              style={{ backgroundColor: "#D65F43" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 pb-10 pt-14" style={{ backgroundColor: "#2F4842" }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5" style={{ color: "#D65F43" }} />
              <span className="font-display text-lg" style={{ color: "#FFFDD0" }}>
                Kettle &amp; Bloom
              </span>
            </div>
            <p className="font-body mt-3 text-sm" style={{ color: "#FFFDD099" }}>
              Small-batch coffee, roasted weekly in Antipolo.
            </p>
          </div>

          {[
            { title: "Shop", links: ["All beans", "Subscriptions", "Gear", "Gift cards"] },
            { title: "Learn", links: ["Brew guide", "Origins", "Our story", "FAQ"] },
            { title: "Follow", links: ["Instagram", "TikTok", "Newsletter"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "#D65F43" }}>
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="focus-ring font-body text-sm" style={{ color: "#FFFDD0CC" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-12 max-w-6xl border-t pt-6 font-body text-xs"
          style={{ borderColor: "#FFFDD022", color: "#FFFDD077" }}
        >
          © {new Date().getFullYear()} Kettle &amp; Bloom Coffee Co.
        </div>
      </footer>
    </div>
  );
}
