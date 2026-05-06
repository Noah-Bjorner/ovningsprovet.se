import Link from "next/link";

import BlobIcon from "@/components/logo/icons/BlobIcon";

export default function Header() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-background to-transparent md:bg-transparentif">
      <div className="flex w-full items-center md:items-start justify-between p-4">
        <Link
          className="flex items-center gap-[0.35rem] md:gap-[0.4rem] font-sans md:translate-y-[0.25rem]"
          href="/"
        >
          <BlobIcon
            aria-hidden="true"
            className="h-[1.5rem] w-[1.5rem] shrink-0 text-text md:h-[1.4rem] md:w-[1.4rem]"
          />
          <span className="translate-y-[0.08rem] text-[1rem] md:text-[0.95rem] font-[750] uppercase tracking-tight text-text [font-variation-settings:'ROND'_100]">
            Övningsprovet
          </span>
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
