import {
  MessageCircle,
  Ruler,
  Sparkles,
} from "lucide-react";

const beneficios = [
  {
    titulo: "Tallas oversize",
    descripcion:
      "Disponibles en S, M, L y XL.",
    Icono: Ruler,
  },
  {
    titulo: "Atención directa",
    descripcion:
      "Envía tu pedido por WhatsApp con la imagen y la talla.",
    Icono: MessageCircle,
  },
  {
    titulo: "Diseños exclusivos",
    descripcion:
      "Una colección urbana creada para construir identidad.",
    Icono: Sparkles,
  },
];

export default function Beneficios() {
  return (
    <section className="bg-[#050505] px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-red-600">
            AlfStore
          </p>

          <h2 className="text-3xl font-black uppercase sm:text-5xl">
            Una experiencia diferente
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {beneficios.map(
            ({
              titulo,
              descripcion,
              Icono,
            }) => (
              <article
                key={titulo}
                className="rounded-2xl border border-white/10 bg-black p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-950/30 text-red-500">
                  <Icono size={23} />
                </div>

                <h3 className="mt-6 text-lg font-black uppercase">
                  {titulo}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {descripcion}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}