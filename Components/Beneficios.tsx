import {
  ShieldCheck,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";

const beneficios = [
  {
    titulo: "Envíos nacionales",
    descripcion:
      "Realizamos entregas en diferentes zonas de El Salvador.",
    icono: Truck,
  },
  {
    titulo: "Calidad premium",
    descripcion:
      "Prendas seleccionadas para ofrecer comodidad, resistencia y buen acabado.",
    icono: ShieldCheck,
  },
  {
    titulo: "Estilo oversize",
    descripcion:
      "Diseños urbanos disponibles en tallas S, M, L y XL.",
    icono: Shirt,
  },
  {
    titulo: "Diseños exclusivos",
    descripcion:
      "Colecciones limitadas creadas para quienes buscan una identidad diferente.",
    icono: Sparkles,
  },
];

export default function Beneficios() {
  return (
    <section
      id="beneficios"
      className="overflow-hidden bg-zinc-950 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Encabezado */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Por qué elegirnos
          </p>

          <h2 className="mt-5 break-words text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Diseñado para quienes
            <span className="block text-red-600">
              marcan su propio estilo
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            AlfStore combina identidad urbana, comodidad y diseños exclusivos
            para crear prendas que representan carácter.
          </p>
        </div>

        {/* Tarjetas */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((beneficio) => {
            const Icono = beneficio.icono;

            return (
              <article
                key={beneficio.titulo}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-black p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-red-600/70 hover:shadow-red-950/30"
              >
                {/* Iluminación decorativa */}

                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition group-hover:bg-red-600/20" />

                <div className="relative z-10">
                  {/* Icono */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-red-600/40 bg-red-600/10 text-red-600 transition group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
                    <Icono size={27} strokeWidth={2} />
                  </div>

                  {/* Texto */}

                  <h3 className="mt-6 break-words text-lg font-black uppercase tracking-wider text-white">
                    {beneficio.titulo}
                  </h3>

                  <p className="mt-4 break-words text-sm leading-7 text-zinc-500">
                    {beneficio.descripcion}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-red-600 transition-all duration-300 group-hover:w-20" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Frase inferior */}

        <div className="mt-14 overflow-hidden rounded-2xl border border-zinc-800 bg-black px-6 py-10 text-center sm:px-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            AlfStore Streetwear
          </p>

          <p className="alfstore-logo mt-5 break-words text-4xl sm:text-5xl">
            Del caos nace el carácter.
          </p>
        </div>
      </div>
    </section>
  );
}