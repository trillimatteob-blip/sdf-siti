import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="card p-8 md:p-12 w-full max-w-md text-center">
        {/* Green checkmark */}
        <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-8">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-heading text-4xl tracking-wider text-white-warm">
          ACQUISTO COMPLETATO!
        </h1>
        <p className="mt-4 text-gray-muted leading-relaxed">
          Il tuo corso e ora disponibile nella tua dashboard. Puoi iniziare a
          guardare le lezioni immediatamente.
        </p>

        <Link href="/dashboard" className="btn-gold w-full mt-8 inline-block">
          VAI ALLA DASHBOARD
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
