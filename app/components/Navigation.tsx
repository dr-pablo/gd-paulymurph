"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
];

const moreLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/reading", label: "Reading" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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
          {primaryLinks.map((link) => (
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
          
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                moreLinks.some(link => pathname === link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              More
              <svg
                className={`w-4 h-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-muted border border-muted-foreground/20 shadow-lg overflow-hidden">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      pathname === link.href
                        ? "text-foreground bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
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
