import Link from "next/link";

import { LogoFull } from "@/components/svgs/Logos";

export default function Header() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-background to-transparent md:bg-transparentif">
      <div className="flex w-full items-center justify-between p-4">
        <Link href="/">
          <LogoFull
            className="translate-y-[-1px] md:translate-y-[-2px]"
            color="var(--text)"
            height="h-5"
          />
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-text transition-all duration-200 hover:bg-foreground-secondary active:scale-95 md:px-4 md:py-2"
            href="#"
          >
            Log in
          </Link>
          <Link
            className="rounded-full bg-text px-3 py-1.5 text-sm font-medium text-background transition-all hover:opacity-80 active:scale-95 md:px-4 md:py-2"
            href="#"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
