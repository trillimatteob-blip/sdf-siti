"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Chi Sono", href: "/chi-sono" },
  { label: "Coaching", href: "/coaching" },
  { label: "Video Corso", href: "/corso" },
  { label: "Contatti", href: "/contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black-deep/80 backdrop-blur-md border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-heading text-2xl tracking-widest text-white-warm">
          ANDREA MAMMOLI
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm tracking-wider text-gray-muted hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/corso" className="btn-gold text-sm px-5 py-2.5">
              INIZIA ORA
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label="Apri menu"
          className="md:hidden relative z-50 flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-full bg-white-warm transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white-warm transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white-warm transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 z-40 bg-black-deep/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-heading text-3xl tracking-widest text-white-warm hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/corso"
          onClick={() => setMobileOpen(false)}
          className="btn-gold mt-4 text-lg px-8 py-3"
        >
          INIZIA ORA
        </Link>
      </div>
    </header>
  );
}
