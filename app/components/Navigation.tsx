"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  {href: "/about", label:"About"},
  { href: "/work", label: "Work" },

];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-muted bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="relative font-semibold text-3xl tracking-tight">
        {/* keyframes injected inline */}
        <style>
            {`
            @keyframes xCycle {
                0%   { color: var(--accent-hover); }
                20%  { color: var(--accent); }
                80%  { color:  var(--bg); }
                100% { color: var(--accent-hover); }
            }
            `}
        </style>

        <span
            className="absolute left-0/100 top-0/100 -translate-x-1/2 -translate-y-1/2 text-sm"
            style={{ animation: "xCycle 6s linear infinite", animationDelay: "0s" }}
        >
            x
        </span>

        <span
            className="absolute left-100/100 top-0/100 -translate-x-1/2 -translate-y-1/2 text-sm"
            style={{ animation: "xCycle 4s linear infinite", animationDelay: "0.5s" }}
        >
            x
        </span>

        <span className="inline-block border px-2 py-1">
            PM
        </span>

        <span
            className="absolute left-100/100 top-100/100 -translate-x-1/2 -translate-y-1/2 text-sm"
            style={{ animation: "xCycle 2s linear infinite", animationDelay: "1s" }}
        >
            x
        </span>
        <span
            className="absolute left-0/100 top-100/100 -translate-x-1/2 -translate-y-1/2 text-sm"
            style={{ animation: "xCycle 5s linear infinite", animationDelay: "1.5s" }}
        >
            x
        </span>
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-[1.375rem] left-0 right-0 h-px bg-gradient-to-r from-accent to-accent-hover" />
              )}
            </Link>
          ))}
          <a
            href="https://x.com/pauly_murph"
            target="__blank"
            className="text-sm font-medium px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
