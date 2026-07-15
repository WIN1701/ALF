"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CLAVE_BIENVENIDA = "alfstore-bienvenida-vista";

/*
  false = aparece una vez por cada sesión.
  true = aparece siempre que actualices la página.
*/
const MOSTRAR_SIEMPRE = false;

const letrasMarca = Array.from("AlfStore");

export default function Bienvenida() {
  const [mostrarBienvenida, setMostrarBienvenida] =
    useState(false);

  const cerrarBienvenida = useCallback(() => {
    try {
      sessionStorage.setItem(CLAVE_BIENVENIDA, "si");
    } catch {
      // Evita errores si el navegador bloquea sessionStorage.
    }

    setMostrarBienvenida(false);
  }, []);

  const entrarAlSitio = () => {
    cerrarBienvenida();

    window.setTimeout(() => {
      document.getElementById("inicio")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  /*
    Comprueba si la bienvenida ya fue mostrada.
  */
  useEffect(() => {
    try {
      const bienvenidaVista =
        sessionStorage.getItem(CLAVE_BIENVENIDA);

      if (MOSTRAR_SIEMPRE || bienvenidaVista !== "si") {
        setMostrarBienvenida(true);
      }
    } catch {
      setMostrarBienvenida(true);
    }
  }, []);

  /*
    Bloquea el movimiento de la página mientras
    la bienvenida está abierta.
  */
  useEffect(() => {
    if (!mostrarBienvenida) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        cerrarBienvenida();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;

      window.removeEventListener(
        "keydown",
        cerrarConEscape
      );
    };
  }, [mostrarBienvenida, cerrarBienvenida]);

  /*
    Cierra automáticamente después de 6 segundos.
  */
  useEffect(() => {
    if (!mostrarBienvenida) {
      return;
    }

    const temporizador = window.setTimeout(() => {
      cerrarBienvenida();
    }, 6000);

    return () => {
      window.clearTimeout(temporizador);
    };
  }, [mostrarBienvenida, cerrarBienvenida]);

  return (
    <AnimatePresence>
      {mostrarBienvenida && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Bienvenida a AlfStore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="
            fixed
            inset-0
            z-[50000]
            flex
            min-h-screen
            items-center
            justify-center
            overflow-hidden
            bg-black
            px-5
            text-white
          "
        >
          {/* BRILLO ROJO CENTRAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [0, 0.7, 0.35],
              scale: [0.4, 1.25, 1],
            }}
            transition={{
              duration: 2.3,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[450px]
              w-[450px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-red-700/30
              blur-[120px]
              sm:h-[650px]
              sm:w-[650px]
            "
          />

          {/* CUADRÍCULA DE FONDO */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-25
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.05) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.05) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "42px 42px",
            }}
          />

          {/* SOMBRA SUPERIOR */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-black
              via-transparent
              to-black
            "
          />

          {/* LÍNEA SUPERIOR */}
          <motion.div
            initial={{
              width: "0%",
              opacity: 0,
            }}
            animate={{
              width: "100%",
              opacity: 1,
            }}
            transition={{
              duration: 1.3,
              delay: 0.2,
            }}
            className="
              absolute
              left-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-red-600
              to-transparent
            "
          />

          {/* LÍNEA INFERIOR */}
          <motion.div
            initial={{
              width: "0%",
              opacity: 0,
            }}
            animate={{
              width: "100%",
              opacity: 1,
            }}
            transition={{
              duration: 1.3,
              delay: 0.2,
            }}
            className="
              absolute
              bottom-0
              right-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-red-600
              to-transparent
            "
          />

          {/* TEXTO SUPERIOR */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="
              absolute
              left-0
              top-8
              flex
              w-full
              items-center
              justify-center
              gap-2
              px-5
            "
          >
            <Sparkles
              size={14}
              className="text-red-500"
            />

            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.3em]
                text-zinc-500
                sm:text-xs
              "
            >
              Streetwear • Not for everyone
            </p>

            <Sparkles
              size={14}
              className="text-red-500"
            />
          </motion.div>

          {/* CONTENIDO CENTRAL */}
          <div
            className="
              relative
              z-10
              flex
              w-full
              max-w-5xl
              flex-col
              items-center
              text-center
            "
          >
            <motion.p
              initial={{
                opacity: 0,
                letterSpacing: "0em",
                y: 15,
              }}
              animate={{
                opacity: 1,
                letterSpacing: "0.35em",
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
              }}
              className="
                mb-4
                text-[10px]
                font-black
                uppercase
                text-red-600
                sm:text-xs
              "
            >
              Bienvenido a
            </motion.p>

            {/* NOMBRE ALFSTORE */}
            <div
              className="
                flex
                items-center
                justify-center
                overflow-hidden
                py-4
              "
            >
              {letrasMarca.map((letra, indice) => (
                <motion.span
                  key={`${letra}-${indice}`}
                  initial={{
                    opacity: 0,
                    y: 80,
                    rotateX: 90,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.55 + indice * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    inline-block
                    text-5xl
                    font-black
                    tracking-[-0.08em]
                    sm:text-7xl
                    md:text-8xl
                    lg:text-9xl

                    ${
                      indice >= 3
                        ? "text-red-600"
                        : "text-white"
                    }
                  `}
                >
                  {letra}
                </motion.span>
              ))}
            </div>

            {/* LÍNEA CENTRAL */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: "min(420px, 80vw)",
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 1.35,
              }}
              className="
                my-5
                h-px
                bg-gradient-to-r
                from-transparent
                via-red-600
                to-transparent
              "
            />

            {/* ESLOGAN */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 1.5,
              }}
              className="
                max-w-3xl
                text-xl
                font-black
                uppercase
                leading-tight
                tracking-tight
                text-white
                sm:text-3xl
                md:text-4xl
              "
            >
              Del caos nace{" "}
              <span className="text-red-600">
                el carácter
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 1.75,
              }}
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-zinc-400
                sm:text-base
              "
            >
              No hacemos ropa. Creamos identidad para
              quienes no nacieron para seguir las reglas.
            </motion.p>

            {/* BOTÓN ENTRAR */}
            <motion.button
              type="button"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 2,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={entrarAlSitio}
              className="
                mt-8
                flex
                min-h-12
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-red-500
                bg-red-700
                px-7
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-white
                shadow-[0_0_40px_rgba(220,38,38,0.3)]
                transition
                hover:bg-red-600
                sm:px-9
                sm:text-xs
              "
            >
              Entrar a AlfStore

              <motion.span
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </div>

          {/* BARRA DE CARGA */}
          <div
            className="
              absolute
              bottom-8
              left-1/2
              w-[80%]
              max-w-sm
              -translate-x-1/2
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-600
                sm:text-[9px]
              "
            >
              <span>AlfStore</span>
              <span>Del caos nace el carácter</span>
            </div>

            <div
              className="
                h-[2px]
                w-full
                overflow-hidden
                bg-white/10
              "
            >
              <motion.div
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5.7,
                  ease: "linear",
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-red-950
                  via-red-600
                  to-white
                "
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}