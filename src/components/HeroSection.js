"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background image with zoom animation */}
      <div
        className="absolute inset-0 z-0 animate-hero-zoom"
        style={{
          backgroundImage: "url('/arnold-classic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black-deep/40 via-black-deep/60 to-black-deep" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

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
          className="text-sm sm:text-base tracking-[0.25em] text-gray-muted mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          IFBB PRO | 2&times; OLYMPIAN | WORLD BEST POSER 2026
        </p>

        {/* Achievement badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <span className="bg-gold text-black-deep font-heading text-xs tracking-widest px-4 py-1.5 rounded-full">
            2x OLYMPIAN
          </span>
          <span className="border border-gold/40 text-gold font-heading text-xs tracking-widest px-4 py-1.5 rounded-full">
            TOP 3 ARNOLD CLASSIC OHIO 2026
          </span>
          <span className="bg-gold text-black-deep font-heading text-xs tracking-widest px-4 py-1.5 rounded-full">
            WORLD BEST POSER 2026
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <a
            href="https://wa.me/393516157497?text=Ciao%20Andrea%2C%20vorrei%20iniziare%20il%20mio%20percorso%20di%20coaching"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3.5 text-lg"
          >
            Inizia il percorso
          </a>
          <Link href="/coaching" className="btn-ghost px-8 py-3.5 text-lg">
            Scopri il coaching
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

      {/* Animations */}
      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes heroZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-hero-zoom {
          animation: heroZoom 8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
