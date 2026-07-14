export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-black pt-24"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/fondos/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600">
            Not for everyone
          </p>

          <h1 className="mt-6 text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-8xl">
            Del caos
            <br />
            nace el
            <span className="block text-red-600">
              carácter.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-7 text-zinc-300 sm:text-lg">
            No hacemos ropa. Creamos identidad
            para quienes no siguen las reglas.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="rounded-md bg-red-600 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
            >
              Ver colección
            </a>

            <a
              href="#historia"
              className="rounded-md border border-zinc-500 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:text-red-500"
            >
              Conoce AlfStore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}