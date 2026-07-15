import {
  Crown,
  Flame,
  Shield,
} from "lucide-react";

export default function Historia() {
  return (
    <section
      id="historia"
      className="
        scroll-mt-24
        overflow-hidden
        border-y
        border-white/10
        bg-[#050505]
        px-5
        py-20
        text-white
        sm:px-8
        lg:py-28
      "
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-red-600">
              Nuestra historia
            </p>

            <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
              No hacemos ropa.
              <span className="block text-red-600">
                Creamos identidad.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              AlfStore nace de una visión urbana,
              auténtica y diferente. Cada diseño
              representa carácter, rebeldía y la
              seguridad de vestir sin seguir las
              reglas de los demás.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              El nombre representa nuestras raíces y
              el logotipo refleja un estilo de vida:
              oscuro, fuerte, exclusivo y hecho para
              quienes no nacieron para encajar.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <article className="rounded-2xl border border-white/10 bg-black p-6">
              <Flame
                size={28}
                className="text-red-600"
              />

              <h3 className="mt-5 text-lg font-black uppercase">
                Carácter
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Diseños con personalidad para destacar
                sin pedir permiso.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black p-6">
              <Shield
                size={28}
                className="text-red-600"
              />

              <h3 className="mt-5 text-lg font-black uppercase">
                Identidad
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Streetwear creado para expresar quién
                eres.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black p-6">
              <Crown
                size={28}
                className="text-red-600"
              />

              <h3 className="mt-5 text-lg font-black uppercase">
                Exclusividad
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                No es para todos. Es para quienes
                entienden el concepto.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}