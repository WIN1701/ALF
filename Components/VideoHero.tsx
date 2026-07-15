"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mostrarBoton, setMostrarBoton] = useState(false);

  const reproducirVideo = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    try {
      await video.play();
      setMostrarBoton(false);
    } catch {
      setMostrarBoton(true);
    }
  };

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      void reproducirVideo();
    }, 300);

    const reanudarVideo = () => {
      const video = videoRef.current;

      if (
        document.visibilityState === "visible" &&
        video &&
        video.paused
      ) {
        void reproducirVideo();
      }
    };

    document.addEventListener(
      "visibilitychange",
      reanudarVideo
    );

    return () => {
      window.clearTimeout(temporizador);

      document.removeEventListener(
        "visibilitychange",
        reanudarVideo
      );
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onLoadedMetadata={() => {
          void reproducirVideo();
        }}
        onCanPlay={() => {
          void reproducirVideo();
        }}
        onPlaying={() => {
          setMostrarBoton(false);
        }}
        onError={() => {
          setMostrarBoton(true);
        }}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/hero-alfstore.mp4"
          type="video/mp4"
        />

        Tu navegador no puede reproducir este video.
      </video>

      {mostrarBoton && (
        <button
          type="button"
          onClick={() => {
            void reproducirVideo();
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
            bg-black/80
            px-5
            py-3
            text-xs
            font-black
            uppercase
            tracking-wider
            text-white
            backdrop-blur-md
            active:scale-95
          "
          aria-label="Reproducir video principal"
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
            <Play size={18} fill="currentColor" />
          </span>

          Reproducir video
        </button>
      )}
    </div>
  );
}