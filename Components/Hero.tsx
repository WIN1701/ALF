"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(
    null
  );

  const reducirMovimiento = useReducedMotion();

  const [mostrarBotonVideo, setMostrarBotonVideo] =
    useState(false);

  const [errorVideo, setErrorVideo] =
    useState(false);

  const reproducirVideo = useCallback(async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute(
      "webkit-playsinline",
      "true"
    );

    try {
      await video.play();

      setMostrarBotonVideo(false);
      setErrorVideo(false);
    } catch {
      setMostrarBotonVideo(true);
    }
  }, []);

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      void reproducirVideo();
    }, 300);

    const reanudarVideo = () => {
      const video = videoRef.current;

      if (
        document.visibilityState === "visible" &&
        video?.paused
      ) {
        void reproducirVideo();
      }
    };

    window.addEventListener(
      "pageshow",
      reproducirVideo
    );

    document.addEventListener(
      "visibilitychange",
      reanudarVideo
    );

    return () => {
      window.clearTimeout(temporizador);

      window.removeEventListener(
        "pageshow",
        reproducirVideo
      );

      document.removeEventListener(
        "visibilitychange",
        reanudarVideo
      );
    };
  }, [reproducirVideo]);

  return (
    <section
      id="inicio"
      className="
        relative
        flex
        h-[100svh]
        min-h-[640px]
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
      {/* VIDEO */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {!errorVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            poster="/productos/camisa001.webp"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => {
              void reproducirVideo();
            }}
            onPlaying={() => {
              setMostrarBotonVideo(false);
            }}
            onError={() => {
              setErrorVideo(true);
              setMostrarBotonVideo(false);
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          >
            <source
              src="/videos/hero-alfstore.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {errorVideo && (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/40 to-black" />
        )}

        {mostrarBotonVideo && !errorVideo && (
          <button
            type="button"
            onClick={() => {
              void reproducirVideo();
            }}
            className="
              absolute
              left-1/2
              top-1/2
              z-30
              flex
              -translate-x-1/2
              -translate-y-1/2
              items-center
              gap-3
              rounded-full
              border
              border-white/30
              bg-black/85
              px-5
              py-3
              text-xs
              font-black
              uppercase
              tracking-wider
              text-white
              backdrop-blur-md
            "
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700">
              <Play
                size={18}
                fill="currentColor"
              />
            </span>

            Reproducir
          </button>
        )}
      </div>

      {/* CAPAS OSCURAS */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/55" />

      {/* EFECTOS EN COMPUTADORA */}
      <motion.div
        aria-hidden="true"
        animate={
          reducirMovimiento
            ? undefined
            : {
                opacity: [0.2, 0.45, 0.2],
                scale: [1, 1.1, 1],
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
          hidden
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-700/20
          blur-[140px]
          md:block
        "
      />

      {/* CONTENIDO */}
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
          }}
          className="
            mb-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-red-600/40
            bg-black/55
            px-4
            py-2
            backdrop-blur-md
          "
        >
          <Sparkles
            size={14}
            className="text-red-500"
          />

          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-300 sm:text-xs">
            AlfStore Streetwear
          </span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: reducirMovimiento ? 0 : 45,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.85,
            delay: reducirMovimiento ? 0 : 0.2,
          }}
          className="
            max-w-5xl
            text-4xl
            font-black
            uppercase
            leading-[0.9]
            tracking-[-0.06em]
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
          "
        >
          Del caos nace

          <span className="mt-1 block text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            el carácter
          </span>
        </motion.h1>

        <motion.p
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
            delay: reducirMovimiento ? 0 : 0.5,
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
            delay: reducirMovimiento ? 0 : 0.7,
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
          "
        >
          <a
            href="#catalogo"
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
              tracking-[0.14em]
              text-white
              transition
              hover:bg-red-600
              sm:w-auto
            "
          >
            Ver colección

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="#historia"
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/45
              px-8
              py-4
              text-xs
              font-black
              uppercase
              tracking-[0.14em]
              text-white
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-black
              sm:w-auto
            "
          >
            Nuestra historia
          </a>
        </motion.div>
      </div>

      <a
        href="#catalogo"
        className="
          absolute
          bottom-4
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
        "
      >
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">
          Explorar
        </span>

        <motion.span
          animate={
            reducirMovimiento
              ? undefined
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{
            duration: 1.3,
            repeat: Infinity,
          }}
          className="flex h-10 w-7 items-center justify-center rounded-full border border-white/20 bg-black/50 text-red-500"
        >
          <ArrowDown size={15} />
        </motion.span>
      </a>
    </section>
  );
}