'use client';

import { Coffee, Menu, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LogoPine from '@/public/logo-pine.svg';
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from '@/store/cartStore';

const Header = () => {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart?.items?.length
  ? cart.items.reduce((total, item) => total + item.quantity, 0)
  : 0;

  return (
    <header className="bg-cream sticky top-0 z-40 border-b border-gray-200 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="focus-ring flex items-center gap-2 rounded-sm">
          <Coffee className="text-terracotta mb-1 h-7 w-7" strokeWidth={2} />
          <Image src={LogoPine} alt="Tara Kape's logo" />
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {session?.user
            ? (
              <>
                <a
                  href="/cart"
                  className="focus-ring flex items-center gap-1.5 rounded-sm  text-sm font-medium text-pine hover:text-terracotta"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Bag · {itemCount}
                </a>
                <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })} className="hover:bg-terracotta hover:text-white">Sign out</Button>
              </>
            )
            : (
              <>
                <a href="/sign-up" className="text-sm hover:text-terracotta">Sign Up</a>
                <a href="/sign-in" className="text-sm hover:text-terracotta">Sign in</a>
              </>
            )
          }

          {/* <GitHubAuthBtn /> */}
        </div>

        <button
          className="focus-ring rounded-sm md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && session?.user && (
        <div className="border-pine/22 border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/cart" className="text-pine font-medium">
              Bag · {itemCount}
            </a>
            <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })} className="text-pine text-base font-medium justify-start pl-0 ">Sign out</Button>
          </div>
        </div>
      )}

      {menuOpen && !session?.user && (
        <div className="border-pine/22 border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/sign-up" className="text-pine font-medium">Sign Up</a>
            <a href="/sign-in" className="text-pine font-medium">Sign In</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;