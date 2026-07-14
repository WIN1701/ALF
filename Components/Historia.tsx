import Image from "next/image";

export default function Historia() {
  return (
    <section
      id="historia"
      className="scroll-mt-24 overflow-hidden bg-zinc-950 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2">
            {/* Imagen */}

            <div className="relative min-h-[360px] w-full overflow-hidden bg-zinc-900 sm:min-h-[500px] lg:min-h-[620px]">
              <Image
                src="/fondos/historia.jpg"
                alt="Historia de AlfStore"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
            </div>

            {/* Contenido */}

            <div className="flex min-w-0 items-center p-6 sm:p-10 lg:p-14">
              <div className="w-full min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-red-600 sm:tracking-[0.35em]">
                  Nuestra historia
                </p>

                <h2 className="mt-5 break-words text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Más que una marca,
                  <span className="mt-1 block text-red-600">
                    un estilo de vida.
                  </span>
                </h2>

                <div className="mt-7 space-y-5 break-words text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  <p>
                    AlfStore nace para representar a quienes buscan vestir
                    diferente y expresar su identidad sin miedo.
                  </p>

                  <p>
                    Nuestra inspiración viene de la cultura urbana, el arte
                    callejero y la personalidad de quienes no siguen
                    tendencias.
                  </p>

                  <p>
                    Cada prenda busca transmitir carácter, autenticidad y una
                    forma diferente de ver el estilo urbano.
                  </p>
                </div>

                <blockquote className="mt-8 max-w-full border-l-4 border-red-600 bg-zinc-950 px-5 py-4 text-base font-bold italic leading-7 text-zinc-200 sm:text-lg">
                  “Del caos nace el carácter.”
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}