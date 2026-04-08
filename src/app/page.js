export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 py-20">
      <main className="w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">Il mio sito</h1>
        <p className="mt-3 text-zinc-600">
          Questa variabile e pubblica: {process.env.NEXT_PUBLIC_NOME_SITO}
        </p>
        <a
          href="/contatti"
          className="mt-8 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Vai alla pagina contatti
        </a>
      </main>
    </div>
  );
}

