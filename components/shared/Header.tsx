import { Coffee, Menu, ShoppingBag, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import LogoPine from '@/public/logo-pine.svg';
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const Header = ({ isLoggedIn } : { isLoggedIn: string | undefined }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="bg-cream sticky top-0 z-40 border-b border-gray-300 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="focus-ring flex items-center gap-2 rounded-sm">
          <Coffee className="text-terracotta mb-1 h-7 w-7" strokeWidth={2} />
          <Image src={LogoPine} alt="Tara Kape's logo" />
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {isLoggedIn
            ? (
              <>
                <button
                  className="focus-ring flex items-center gap-1.5 rounded-sm  text-sm font-medium"
                  style={{ color: "#2F4842" }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Bag · 0
                </button>
                <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
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

      {menuOpen && (
        <div className="border-pine/22 border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {['Link 1', 'Link 2', 'Link 3'].map((link) => (
              <a key={link} href="#" className="text-coffee text-sm font-medium">
                {link}
              </a>
            ))}
            <a href="#" className="text-pine text-sm font-medium">
              Bag · 0
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;