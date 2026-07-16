import Image from "next/image";

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
        urban-section
        scroll-mt-24
        overflow-hidden
        border-y
        border-white/10
        bg-[#050505]
        px-4
        py-16
        text-white
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <article
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/15
            bg-black
            shadow-[0_30px_80px_rgba(0,0,0,0.65)]
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* IMAGEN DE HISTORIA */}
            <div
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden
                border-b
                border-white/10
                bg-black
                sm:aspect-[5/6]
                lg:aspect-auto
                lg:min-h-[720px]
                lg:border-b-0
                lg:border-r
              "
            >
              <Image
                src="/fondos/historia.jpg"
                alt="Historia urbana de AlfStore"
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  object-center
                "
              />

              {/* OSCURECIDO SUAVE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-black/20
                "
              />

              {/* TEXTO SOBRE LA IMAGEN */}
              <div
                className="
                  absolute
                  bottom-6
                  left-5
                  right-5
                  z-10
                  sm:bottom-8
                  sm:left-8
                  sm:right-8
                "
              >
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-red-500
                    sm:text-xs
                  "
                >
                  Nuestra esencia
                </p>

                <p
                  className="
                    mt-3
                    max-w-md
                    text-2xl
                    font-black
                    uppercase
                    leading-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Del caos nace el carácter
                </p>
              </div>
            </div>

            {/* INFORMACIÓN */}
            <div
              className="
                flex
                flex-col
                justify-center
                px-6
                py-12
                sm:px-10
                sm:py-16
                lg:px-14
                lg:py-20
              "
            >
              <p
                className="
                  mb-5
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.32em]
                  text-red-500
                "
              >
                Nuestra historia
              </p>

              <h2
                className="
                  max-w-2xl
                  text-4xl
                  font-black
                  uppercase
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Más que una marca,

                <span
                  className="
                    mt-2
                    block
                    text-red-600
                  "
                >
                  un estilo de vida.
                </span>
              </h2>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-sm
                  leading-7
                  text-zinc-400
                  sm:text-base
                "
              >
                AlfStore nace de una visión urbana,
                auténtica y diferente. Cada diseño
                representa carácter, rebeldía y la
                seguridad de vestir sin seguir las
                reglas de los demás.
              </p>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-zinc-400
                  sm:text-base
                "
              >
                No hacemos solamente ropa. Creamos
                identidad para quienes entienden que
                vestir también es una forma de
                expresar quiénes son.
              </p>

              {/* VALORES */}
              <div
                className="
                  mt-10
                  grid
                  gap-3
                  sm:grid-cols-3
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#080808]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-red-950/40
                      text-red-500
                    "
                  >
                    <Flame size={21} />
                  </div>

                  <h3
                    className="
                      mt-4
                      text-sm
                      font-black
                      uppercase
                      text-white
                    "
                  >
                    Carácter
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-500
                    "
                  >
                    Diseños con personalidad.
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#080808]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-red-950/40
                      text-red-500
                    "
                  >
                    <Shield size={21} />
                  </div>

                  <h3
                    className="
                      mt-4
                      text-sm
                      font-black
                      uppercase
                      text-white
                    "
                  >
                    Identidad
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-500
                    "
                  >
                    Viste lo que representas.
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#080808]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-red-950/40
                      text-red-500
                    "
                  >
                    <Crown size={21} />
                  </div>

                  <h3
                    className="
                      mt-4
                      text-sm
                      font-black
                      uppercase
                      text-white
                    "
                  >
                    Exclusividad
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-500
                    "
                  >
                    Not for everyone.
                  </p>
                </div>
              </div>

              <a
                href="#catalogo"
                className="
                  mt-10
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-red-700
                  px-8
                  text-center
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition
                  hover:bg-red-600
                  active:scale-[0.98]
                  sm:w-fit
                "
              >
                Ver colección
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}