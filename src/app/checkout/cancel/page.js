import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="card p-8 md:p-12 w-full max-w-md text-center">
        {/* X icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mb-8">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="font-heading text-4xl tracking-wider text-white-warm">
          ACQUISTO ANNULLATO
        </h1>
        <p className="mt-4 text-gray-muted leading-relaxed">
          Non e stato addebitato nulla. Puoi riprovare in qualsiasi momento.
        </p>

        <Link href="/corso" className="btn-ghost w-full mt-8 inline-block">
          TORNA AL CORSO
        </Link>

        <Link
          href="/"
          className="mt-4 inline-block text-gray-muted text-sm hover:text-gold transition-colors"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
