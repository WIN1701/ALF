"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import VideoHero from "@/Components/VideoHero";

export default function Hero() {
  const reducirMovimiento = useReducedMotion();

  return (
    <section
      id="inicio"
      className="
        relative
        flex
        h-[100svh]
        min-h-[650px]
        max-h-[950px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
        pt-20
        text-white
      "
    >
      {/* VIDEO COMPATIBLE CON CELULARES Y TABLETS */}
      <VideoHero />

      {/* CAPA OSCURA SOBRE EL VIDEO */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/55
        "
      />

      {/* SOMBRA SUPERIOR E INFERIOR */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/80
          via-black/20
          to-black
        "
      />

      {/* SOMBRA LATERAL */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/20
          to-black/60
        "
      />

      {/* BRILLO ROJO IZQUIERDO */}
      <motion.div
        aria-hidden="true"
        animate={
          reducirMovimiento
            ? undefined
            : {
                opacity: [0.25, 0.5, 0.25],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-700/25
          blur-[140px]
        "
      />

      {/* BRILLO ROJO DERECHO */}
      <motion.div
        aria-hidden="true"
        animate={
          reducirMovimiento
            ? undefined
            : {
                opacity: [0.15, 0.35, 0.15],
                scale: [1.1, 0.95, 1.1],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0
          h-[520px]
          w-[520px]
          rounded-full
          bg-red-900/20
          blur-[150px]
        "
      />

      {/* LÍNEA DECORATIVA SUPERIOR */}
      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: "100%",
          opacity: 1,
        }}
        transition={{
          duration: reducirMovimiento ? 0 : 1.4,
          delay: reducirMovimiento ? 0 : 0.2,
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-20
          h-px
          bg-gradient-to-r
          from-transparent
          via-red-600/70
          to-transparent
        "
      />

      {/* CONTENIDO PRINCIPAL */}
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
          px-5
          text-center
          sm:px-8
          lg:items-start
          lg:px-10
          lg:text-left
        "
      >
        {/* ETIQUETA SUPERIOR */}
        <motion.div
          initial={{
            opacity: 0,
            y: reducirMovimiento ? 0 : 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.7,
            delay: reducirMovimiento ? 0 : 0.2,
          }}
          className="
            mb-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-red-600/40
            bg-black/50
            px-4
            py-2
            backdrop-blur-md
          "
        >
          <Sparkles
            size={14}
            className="text-red-500"
          />

          <span
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.28em]
              text-zinc-300
              sm:text-xs
            "
          >
            AlfStore Streetwear
          </span>
        </motion.div>

        {/* TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{
            opacity: 0,
            y: reducirMovimiento ? 0 : 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.9,
            delay: reducirMovimiento ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-5xl
            text-5xl
            font-black
            uppercase
            leading-[0.88]
            tracking-[-0.06em]
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
          "
        >
          Del caos nace

          <motion.span
            initial={{
              opacity: 0,
              x: reducirMovimiento ? 0 : -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reducirMovimiento ? 0 : 0.8,
              delay: reducirMovimiento ? 0 : 0.75,
            }}
            className="
              mt-1
              block
              text-red-600
              drop-shadow-[0_0_35px_rgba(220,38,38,0.35)]
            "
          >
            el carácter
          </motion.span>
        </motion.h1>

        {/* DESCRIPCIÓN */}
        <motion.p
          initial={{
            opacity: 0,
            y: reducirMovimiento ? 0 : 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.8,
            delay: reducirMovimiento ? 0 : 0.95,
          }}
          className="
            mt-7
            max-w-xl
            text-sm
            leading-6
            text-zinc-300
            sm:text-base
            sm:leading-7
            lg:text-lg
          "
        >
          No hacemos ropa. Creamos identidad.
          Diseños urbanos para quienes no nacieron
          para seguir las reglas.
        </motion.p>

        {/* BOTONES */}
        <motion.div
          initial={{
            opacity: 0,
            y: reducirMovimiento ? 0 : 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.8,
            delay: reducirMovimiento ? 0 : 1.15,
          }}
          className="
            mt-9
            flex
            w-full
            flex-col
            items-center
            gap-3
            sm:w-auto
            sm:flex-row
            lg:items-start
          "
        >
          {/* BOTÓN VER COLECCIÓN */}
          <motion.a
            href="#catalogo"
            whileHover={
              reducirMovimiento
                ? undefined
                : {
                    scale: 1.04,
                  }
            }
            whileTap={
              reducirMovimiento
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            className="
              group
              flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-red-700
              px-8
              py-4
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-white
              shadow-[0_0_35px_rgba(185,28,28,0.3)]
              transition
              hover:bg-red-600
              sm:w-auto
            "
          >
            Ver colección

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </motion.a>

          {/* BOTÓN HISTORIA */}
          <motion.a
            href="#historia"
            whileHover={
              reducirMovimiento
                ? undefined
                : {
                    scale: 1.04,
                  }
            }
            whileTap={
              reducirMovimiento
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/40
              px-8
              py-4
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-white
              backdrop-blur-md
              transition
              hover:border-white
              hover:bg-white
              hover:text-black
              sm:w-auto
            "
          >
            Nuestra historia
          </motion.a>
        </motion.div>

        {/* FRASE INFERIOR */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 1,
            delay: reducirMovimiento ? 0 : 1.4,
          }}
          className="
            mt-10
            flex
            items-center
            gap-3
          "
        >
          <span className="h-px w-10 bg-red-600" />

          <p
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.3em]
              text-zinc-500
              sm:text-[10px]
            "
          >
            Not for everyone
          </p>
        </motion.div>
      </div>

      {/* INDICADOR PARA BAJAR */}
      <motion.a
        href="#catalogo"
        aria-label="Bajar hacia la colección"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: reducirMovimiento ? 0 : 0.8,
          delay: reducirMovimiento ? 0 : 1.7,
        }}
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
          text-center
        "
      >
        <span
          className="
            text-[8px]
            font-black
            uppercase
            tracking-[0.3em]
            text-zinc-500
            sm:text-[9px]
          "
        >
          Explorar
        </span>

        <motion.span
          animate={
            reducirMovimiento
              ? undefined
              : {
                  y: [0, 6, 0],
                }
          }
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex
            h-10
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/40
            text-red-500
            backdrop-blur-sm
          "
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  );
}