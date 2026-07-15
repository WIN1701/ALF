export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[calc(100svh-88px)] w-full items-center overflow-hidden border-b border-red-950"
    >
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/fondo-unificado.jpg"
        aria-label="Video urbano de AlfStore"
      >
        <source
          src="/video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Oscurecimiento suave: el video sigue visible */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-black/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />

      {/* Luces rojas urbanas */}
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-red-700/25 blur-[110px]" />

      <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-red-600/20 blur-[120px]" />

      <div className="urban-grid absolute inset-0 opacity-20" />

      {/* Logo grande detrás del texto */}
      <img
        src="/logo.png.jpeg"
        alt=""
        aria-hidden="true"
        width={650}
        height={400}
        className="pointer-events-none absolute right-[-120px] top-1/2 hidden max-h-[480px] w-[650px] -translate-y-1/2 object-contain opacity-[0.12] md:block"
      />

      <div className="hero-copy relative z-10 mx-auto w-full max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14">
        <div className="max-w-5xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-500/70 bg-black/60 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,1)]" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white sm:text-xs">
              AlfStore — Streetwear
            </span>
          </div>

          <h1 className="hero-title max-w-5xl text-[clamp(3.3rem,11vw,8.8rem)] font-black uppercase leading-[0.84] tracking-[-0.06em] text-white">
            Del caos nace
            <span className="mt-2 block text-red-600">
              el carácter.
            </span>
          </h1>

          <div className="mt-8 max-w-2xl border-l-4 border-red-600 bg-black/45 px-5 py-4">
            <p className="text-lg font-black uppercase leading-tight tracking-wide text-white sm:text-2xl">
              No hacemos ropa.
            </p>

            <p className="mt-1 text-lg font-black uppercase leading-tight tracking-wide text-red-500 sm:text-2xl">
              Creamos identidad.
            </p>
          </div>

          <p className="mt-7 max-w-xl text-sm font-medium leading-7 text-zinc-200 sm:text-base">
            Diseños oversize nacidos de la
            calle, el carácter y la libertad de
            vestir sin seguir las reglas de los
            demás.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-red-600 px-8 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(220,38,38,0.35)] transition-colors hover:bg-red-500"
            >
              Ver colección
            </a>

            <a
              href="#historia"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/50 bg-black/45 px-8 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-red-500 hover:text-red-500"
            >
              Conoce AlfStore
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </section>
  );
}