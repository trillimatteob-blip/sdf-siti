import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#050507' }}>
      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="font-semibold tracking-tight text-[#c8a951]">
          Andrea Mammoli
        </Link>
        <Link
          href="/"
          className="text-sm text-[#f2ede480] hover:text-[#f2ede4]"
        >
          ← Torna al sito
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-16 pt-4">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
