"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-deep/60 via-black-deep/80 to-black-deep z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Label */}
        <p
          className="section-label mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          Andrea Mammoli
        </p>

        {/* Main headline */}
        <h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <span className="text-gold-gradient">THE ITALIAN GIFT</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base tracking-[0.25em] text-gray-muted mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          IFBB PRO | 2&times; OLYMPIAN | WORLD BEST POSER 2026
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <Link href="/corso" className="btn-gold px-8 py-3.5 text-lg">
            SCOPRI IL CORSO
          </Link>
          <Link href="/coaching" className="btn-ghost px-8 py-3.5 text-lg">
            COACHING ONLINE
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "1s", animationFillMode: "forwards" }}
      >
        <span className="text-[10px] tracking-[0.3em] text-gray-dim uppercase">
          Scroll
        </span>
        <span className="relative w-[1px] h-10 bg-gray-dim/30 overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-[scrollLine_1.5s_ease-in-out_infinite]" />
        </span>
      </div>

      {/* Scroll line animation */}
      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
