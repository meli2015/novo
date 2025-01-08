import Link from "next/link";

import { Links } from "./links";
import { ToggleTheme } from "@/components/toggleTheme";

import { Logo } from "./logo";

export function Navbar() {
  return (
    <header className="w-full bg-background border-b border-muted shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
        </Link>

        <nav className="flex items-center gap-4">
          <Links />
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
}

Navbar.displayName = "Navbar";
