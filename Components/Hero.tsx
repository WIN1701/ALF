export default function Hero() {
  return (
    <section
      id="inicio"
      className="
        relative
        flex
        min-h-[560px]
        h-[75vh]
        max-h-[800px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
      "
    >
      {/* VIDEO DE FONDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero.jpg"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source
          src="/videos/hero-alfstore.mp4"
          type="video/mp4"
        />

        Tu navegador no puede reproducir este video.
      </video>

      {/* CAPA OSCURA */}
      <div className="absolute inset-0 bg-black/45" />

      {/* SOMBRA DESDE ARRIBA */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/60
          via-transparent
          to-black
        "
      />

      {/* SOMBRA LATERAL */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/70
          via-black/20
          to-black/40
        "
      />

      {/* CONTENIDO */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-6
          pt-24
          text-center
          sm:px-10
          lg:items-start
          lg:text-left
        "
      >
        <p
          className="
            mb-4
            text-xs
            font-bold
            uppercase
            tracking-[0.35em]
            text-red-600
            sm:text-sm
          "
        >
          AlfStore Streetwear
        </p>

        <h1
          className="
            max-w-4xl
            text-4xl
            font-black
            uppercase
            leading-[0.95]
            tracking-tight
            text-white
            sm:text-6xl
            lg:text-7xl
            xl:text-8xl
          "
        >
          Del caos nace
          <span className="block text-red-600">
            el carácter
          </span>
        </h1>

        <p
          className="
            mt-6
            max-w-xl
            text-sm
            leading-6
            text-zinc-300
            sm:text-base
            lg:text-lg
          "
        >
          No hacemos ropa. Creamos identidad.
          Diseños urbanos para quienes no nacieron
          para seguir las reglas.
        </p>

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            gap-3
            sm:flex-row
            lg:justify-start
          "
        >
          <a
            href="#catalogo"
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-md
              bg-red-700
              px-8
              py-3
              text-sm
              font-black
              uppercase
              tracking-[0.12em]
              text-white
              transition
              duration-300
              hover:bg-red-600
              active:scale-95
            "
          >
            Ver colección
          </a>

          <a
            href="#historia"
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-md
              border
              border-white/30
              bg-black/30
              px-8
              py-3
              text-sm
              font-bold
              uppercase
              tracking-[0.12em]
              text-white
              backdrop-blur-sm
              transition
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-black
              active:scale-95
            "
          >
            Nuestra historia
          </a>
        </div>
      </div>

      {/* INDICADOR INFERIOR */}
      <a
        href="#catalogo"
        aria-label="Ir al catálogo"
        className="
          absolute
          bottom-5
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.25em]
          text-zinc-400
        "
      >
        Explorar

        <span
          className="
            h-8
            w-px
            bg-gradient-to-b
            from-red-600
            to-transparent
          "
        />
      </a>
    </section>
  );
}