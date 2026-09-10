import { Suspense } from "react";
import { Coffee } from "lucide-react";
import SignInForm from "./SignInForm";

function SignInLoading() {
  return (
    <main className="bg-cream text-pine flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl text-center">
        <div className="border-coffee/40 text-coffee mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase">
          <span className="bg-terracotta h-1.5 w-1.5 rounded-full" />
          Welcome back
        </div>

        <div className="bg-cream-deep border-pine/15 mx-auto mt-7 flex h-20 w-20 items-center justify-center rounded-full border shadow-sm">
          <Coffee className="text-terracotta h-9 w-9" strokeWidth={1.8} />
        </div>

        <h1 className="text-pine mt-7 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
          Brewing your
          <br />
          <span className="text-terracotta italic">sign-in.</span>
        </h1>

        <p className="text-coffee mx-auto mt-6 max-w-md text-base leading-relaxed">
          We&apos;re getting your account ready. Your next good cup is only a moment away.
        </p>

        <div className="bg-pine/15 mx-auto mt-9 h-1.5 w-40 overflow-hidden rounded-full">
          <div className="bg-terracotta h-full w-1/2 animate-pulse rounded-full" />
        </div>

        <p className="text-coffee-soft mt-4 font-mono text-[10px] tracking-[0.18em] uppercase">
          Small batch · Carefully prepared
        </p>
      </section>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm />
    </Suspense>
  );
}