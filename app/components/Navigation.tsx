"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "../content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/ask", label: "Ask" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Primary navigation">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center border border-foreground bg-foreground font-mono text-xs font-semibold text-background transition-colors group-hover:bg-accent">
            PM
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Paul Murphy</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b py-1 text-sm transition-colors ${active ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-border md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="font-mono text-lg" aria-hidden="true">{isOpen ? "x" : "+"}</span>
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-border py-3 text-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
