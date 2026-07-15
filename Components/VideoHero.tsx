"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Play } from "lucide-react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [necesitaToque, setNecesitaToque] =
    useState(false);

  const intentarReproducir = useCallback(async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    /*
      Importante para celulares y tablets:
      el video debe permanecer sin sonido.
    */
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
      setNecesitaToque(false);
    } catch {
      /*
        Cuando el navegador bloquea la reproducción
        automática, aparece un botón para iniciarla.
      */
      setNecesitaToque(true);
    }
  }, []);

  useEffect(() => {
    const reproducirAlInteractuar = () => {
      void intentarReproducir();
    };

    const reproducirAlRegresar = () => {
      if (document.visibilityState === "visible") {
        void intentarReproducir();
      }
    };

    /*
      Primer intento automático.
    */
    const temporizador = window.setTimeout(() => {
      void intentarReproducir();
    }, 150);

    /*
      Segundo intento cuando el cliente toca
      o presiona cualquier parte de la página.
    */
    document.addEventListener(
      "touchstart",
      reproducirAlInteractuar,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "pointerdown",
      reproducirAlInteractuar
    );

    window.addEventListener(
      "pageshow",
      reproducirAlInteractuar
    );

    document.addEventListener(
      "visibilitychange",
      reproducirAlRegresar
    );

    return () => {
      window.clearTimeout(temporizador);

      document.removeEventListener(
        "touchstart",
        reproducirAlInteractuar
      );

      document.removeEventListener(
        "pointerdown",
        reproducirAlInteractuar
      );

      window.removeEventListener(
        "pageshow",
        reproducirAlInteractuar
      );

      document.removeEventListener(
        "visibilitychange",
        reproducirAlRegresar
      );
    };
  }, [intentarReproducir]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => {
          void intentarReproducir();
        }}
        onCanPlay={() => {
          void intentarReproducir();
        }}
        onPause={() => {
          /*
            Evita mostrar el botón mientras el video
            todavía está cargando inicialmente.
          */
          const video = videoRef.current;

          if (
            video &&
            video.readyState >=
              HTMLMediaElement.HAVE_CURRENT_DATA
          ) {
            setNecesitaToque(true);
          }
        }}
        onPlaying={() => {
          setNecesitaToque(false);
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source
          src="/videos/hero-alfstore.mp4"
          type="video/mp4"
        />

        Tu navegador no puede reproducir este video.
      </video>

      {/* BOTÓN DE RESPALDO PARA CELULARES */}
      {necesitaToque && (
        <button
          type="button"
          onClick={() => {
            void intentarReproducir();
          }}
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            gap-3
            rounded-full
            border
            border-white/30
            bg-black/75
            px-6
            py-4
            text-xs
            font-black
            uppercase
            tracking-[0.14em]
            text-white
            backdrop-blur-md
            transition
            active:scale-95
            md:hidden
          "
          aria-label="Reproducir video"
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-red-700
            "
          >
            <Play
              size={19}
              fill="currentColor"
            />
          </span>

          Reproducir
        </button>
      )}
    </div>
  );
}