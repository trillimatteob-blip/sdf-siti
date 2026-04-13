import Link from "next/link";

const SERVICES = [
  { label: "Coaching", href: "/coaching" },
  { label: "Video Posing", href: "/corso" },
  { label: "Consulenze", href: "/contatti" },
];

const LINKS = [
  { label: "Chi Sono", href: "/chi-sono" },
  { label: "Contatti", href: "/contatti" },
  { label: "FAQ", href: "/faq" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie" },
  { label: "Termini", href: "/termini" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0c0c0e] border-t border-gold/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Andrea Mammoli" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-gray-muted mb-6">IFBB Pro | 2x Olympian</p>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/andrea_mammoli/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 text-gray-muted hover:text-gold transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="text-sm">@andrea_mammoli</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@AndreaMammoliClassicPro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex items-center gap-2 text-gray-muted hover:text-red-500 transition-colors mt-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-sm">YouTube</span>
            </a>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white-warm mb-4">
              SERVIZI
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-muted hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white-warm mb-4">
              LINK
            </h4>
            <ul className="space-y-3">
              {LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-muted hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white-warm mb-4">
              CONTATTAMI
            </h4>
            <a
              href="https://wa.me/393516157497?text=Ciao%20Andrea%2C%20vorrei%20iniziare%20il%20mio%20percorso%20di%20coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#25d366] hover:text-[#5eeb8e] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Scrivimi su WhatsApp
            </a>
          </div>
        </div>

        {/* Sponsors */}
        <div className="mt-14 pt-10 border-t border-gold/10">
          <h4 className="font-heading text-lg tracking-wider text-white-warm text-center mb-8">
            PARTNER &amp; SPONSOR
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Tsunami Nutrition */}
            <a
              href="https://www.tsunaminutrition.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex flex-col items-center gap-4 hover:border-gold/30 transition-colors group"
            >
              <img
                src="/tsunami-logo.jpg"
                alt="Tsunami Nutrition"
                className="h-12 w-auto object-contain brightness-90 group-hover:brightness-100 transition"
              />
              <div className="text-center">
                <p className="text-sm text-white-warm font-medium">Tsunami Nutrition</p>
                <p className="text-xs text-gold mt-1">
                  Codice sconto: <span className="font-heading tracking-wider">ANDREA15</span>
                </p>
              </div>
            </a>

            {/* Insane Stone */}
            <a
              href="https://insanestone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex flex-col items-center gap-4 hover:border-gold/30 transition-colors group"
            >
              <img
                src="/insanestone-logo.png"
                alt="Insane Stone"
                className="h-12 w-auto object-contain brightness-90 group-hover:brightness-100 transition"
              />
              <div className="text-center">
                <p className="text-sm text-white-warm font-medium">Insane Stone</p>
                <p className="text-xs text-gold mt-1">
                  Codice sconto: <span className="font-heading tracking-wider">ANDREA10</span>
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* YouTube */}
        <div className="mt-10 text-center">
          <a
            href="https://www.youtube.com/@AndreaMammoliClassicPro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gray-muted hover:text-red-500 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-sm font-medium">Seguimi su YouTube</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white-warm/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-dim">
            &copy; {new Date().getFullYear()} Andrea Mammoli. Tutti i diritti riservati.
            &nbsp;&middot;&nbsp; P.IVA: XXXXXXXXXX
          </p>
          <div className="flex gap-6">
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-gray-dim hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
