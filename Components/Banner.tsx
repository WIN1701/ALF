export default function Banner() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="relative mx-auto min-h-[430px] w-full max-w-7xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Imagen de fondo */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/fondos/banner.jpg')",
          }}
        />

        {/* Oscurecimiento */}

        <div className="absolute inset-0 bg-black/75" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Efecto rojo */}

        <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-700/20 blur-3xl" />

        <div className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-700/20 blur-3xl" />

        {/* Contenido */}

        <div className="relative z-10 flex min-h-[430px] w-full items-center justify-center px-6 py-16 text-center sm:px-10">
          <div className="w-full max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600">
              Filosofía AlfStore
            </p>

            <h2 className="alfstore-logo mt-7 break-words text-6xl leading-[0.85] sm:text-7xl md:text-8xl lg:text-9xl">
              Not for everyone.
            </h2>

            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-red-600" />

            <p className="mx-auto mt-8 max-w-2xl break-words text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              La moda cambia, pero el carácter permanece. AlfStore representa
              autenticidad, rebeldía e identidad urbana.
            </p>

            <a
              href="#catalogo"
              className="mt-10 inline-flex items-center justify-center rounded-lg border border-red-600 bg-red-600 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-red-500"
            >
              Ver colección
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}