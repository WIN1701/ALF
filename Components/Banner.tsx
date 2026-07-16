import {
  ArrowRight,
  Flame,
} from "lucide-react";

export default function Banner() {
  return (
    <section className="border-y border-red-900/30 bg-red-950/20 px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl rounded-3xl border border-red-800/30 bg-black px-6 py-14 sm:px-12">
        <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
          <div>
            <div className="mb-5 flex items-center justify-center gap-2 lg:justify-start">
              <Flame
                size={18}
                className="text-red-600"
              />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                Not for everyone
              </p>
            </div>

            <h2 className="text-3xl font-black uppercase sm:text-5xl">
              La calle no sigue tendencias.

              <span className="block text-red-600">
                Las crea.
              </span>
            </h2>
          </div>

          <a
            href="#catalogo"
            className="flex min-h-12 items-center gap-3 rounded-full bg-red-700 px-8 text-xs font-black uppercase"
          >
            Explorar colección
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}