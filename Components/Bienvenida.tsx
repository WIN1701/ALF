"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Bienvenida() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      setVisible(false);
    }, 1900);

    return () => {
      window.clearTimeout(temporizador);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[20000]
        flex
        items-center
        justify-center
        bg-black
        px-5
        text-white
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            mb-6
            h-px
            w-24
            bg-gradient-to-r
            from-transparent
            via-red-600
            to-transparent
          "
        />

        <h1
          className="
            animate-pulse
            text-5xl
            font-black
            tracking-[-0.07em]
            sm:text-7xl
          "
        >
          Alf
          <span className="text-red-600">
            Store
          </span>
        </h1>

        <p
          className="
            mt-5
            text-[10px]
            font-black
            uppercase
            tracking-[0.35em]
            text-zinc-500
            sm:text-xs
          "
        >
          Del caos nace el carácter
        </p>

        <div
          className="
            mx-auto
            mt-6
            h-px
            w-24
            bg-gradient-to-r
            from-transparent
            via-red-600
            to-transparent
          "
        />
      </div>
    </div>
  );
}