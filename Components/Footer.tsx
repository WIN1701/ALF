import {
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <a
            href="#inicio"
            className="text-3xl font-black tracking-[-0.06em]"
          >
            Alf
            <span className="text-red-600">
              Store
            </span>
          </a>

          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Del caos nace el carácter
          </p>
        </div>

        <a
          href="https://wa.me/50360197818"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-green-700/50 bg-green-950/20 px-6 text-xs font-black uppercase tracking-wider text-green-500 transition hover:bg-green-600 hover:text-white"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center">
        <p className="text-xs text-zinc-600">
          © {anio} AlfStore. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}