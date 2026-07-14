import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="5"
        ry="5"
      />

      <path d="M16 11.37a4 4 0 1 1-4.73-4.73 4 4 0 0 1 4.73 4.73Z" />

      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-zinc-800 bg-black"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        {/* Marca */}

        <div>
          <h2 className="text-4xl font-black text-red-600">
            AlfStore
          </h2>

          <p className="mt-5 max-w-sm leading-7 text-zinc-500">
            Streetwear salvadoreño. Prendas para quienes convierten su
            identidad en carácter.
          </p>
        </div>

        {/* Navegación */}

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white">
            Navegación
          </h3>

          <nav className="mt-6 space-y-3 text-sm text-zinc-500">
            <a
              href="#inicio"
              className="block transition hover:text-red-500"
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              className="block transition hover:text-red-500"
            >
              Colección
            </a>

            <a
              href="#historia"
              className="block transition hover:text-red-500"
            >
              Historia
            </a>

            <a
              href="#filosofia"
              className="block transition hover:text-red-500"
            >
              Filosofía
            </a>
          </nav>
        </div>

        {/* Contacto */}

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white">
            Contacto
          </h3>

          <div className="mt-6 flex flex-col gap-4">
            <a
              href="https://wa.me/50360197818"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-400 transition hover:text-green-500"
            >
              <MessageCircle size={20} />

              <span>WhatsApp: 6019 7818</span>
            </a>

            <a
              href="https://www.instagram.com/alfstore.sv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-400 transition hover:text-red-500"
            >
              <InstagramIcon size={20} />

              <span>Instagram: @alfstore.sv</span>
            </a>

            <a
              href="https://www.tiktok.com/@alfstore.sv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-red-500"
            >
              TikTok: @alfstore.sv
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 px-6 py-6 text-center text-xs uppercase tracking-widest text-zinc-600">
        © 2026 AlfStore. Todos los derechos reservados.
      </div>
    </footer>
  );
}