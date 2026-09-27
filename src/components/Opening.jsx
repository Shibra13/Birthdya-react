// export default function Opening({ onOpen, closing }) {
//   return (
//     <section
//       className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out"
//       style={{ opacity: closing ? 0 : 1 }}
//     >
//       <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
//         <div className="h-[26rem] w-[26rem] rounded-full bg-starlight/10 blur-[110px]" />
//       </div>

//       <p className="relative font-serif text-lg italic text-starlight-bright/80 sm:text-xl">
//         I made this specially for you
//       </p>

//       <h1 className="relative mt-5 max-w-xl font-serif text-5xl font-medium leading-[1.05] text-glow sm:text-6xl md:text-7xl">
//         My Dr. Partner
//       </h1>

//       <p className="relative mt-6 max-w-sm font-sans text-sm font-light text-ink-muted sm:text-base">
//         It&rsquo;s a little surprise for you, Partner. Take your time, and read every word. ❤️
//       </p>

//       <button
//         onClick={onOpen}
//         className="group relative mt-10 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
//       >
//         Open This
//         <span aria-hidden className="text-rosegold transition-transform duration-300 group-hover:translate-x-0.5">
//           ✨
//         </span>
//       </button>

//       <div aria-hidden className="relative mt-16 h-10 w-px bg-gradient-to-b from-starlight/40 to-transparent" />
//     </section>
//   );
// }


import { useMemo } from "react";

// Weighted toward the blue tones; "rgba(255,255,255,0.15)" (near-white) shows up rarely.
const HEART_COLORS = [
  "rgba(95,201,232,0.35)",
  "rgba(95,201,232,0.35)",
  "rgba(95,201,232,0.35)",
  "rgba(147,197,253,0.25)",
  "rgba(147,197,253,0.25)",
  "rgba(147,197,253,0.25)",
  "rgba(191,224,255,0.20)",
  "rgba(191,224,255,0.20)",
  "rgba(255,255,255,0.15)",
];

const HEART_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'><path d='M16 29 C 6 21, 0 15, 0 8.5 C 0 3, 4 0, 8.5 0 C 12 0, 15 2, 16 5 C 17 2, 20 0, 23.5 0 C 28 0, 32 3, 32 8.5 C 32 15, 26 21, 16 29 Z'/></svg>\")";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function FloatingHearts({ count = 45 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const isLarge = Math.random() < 0.18;
      const size = isLarge ? rand(24, 40) : rand(8, 22);
      const drift = rand(30, 90) * (isLarge ? 1.3 : 1) * (Math.random() < 0.5 ? -1 : 1);

      return {
        id: i,
        size,
        left: rand(0, 100),
        duration: rand(12, 26),
        delay: rand(-26, 0),
        drift,
        rotStart: rand(-15, 15),
        rotMid: rand(-25, 25),
        rotEnd: rand(-15, 15),
        opacity: rand(0.6, 1),
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        blur: Math.random() < 0.35 ? rand(1, 3) : 0,
      };
    });
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-10%",
            width: `${h.size}px`,
            height: `${h.size * (29 / 32)}px`,
            backgroundColor: h.color,
            WebkitMaskImage: HEART_MASK,
            maskImage: HEART_MASK,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            filter: h.blur > 0 ? `blur(${h.blur}px)` : undefined,
            animation: `heart-float-up ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            willChange: "transform, opacity",
            ["--drift"]: `${h.drift}px`,
            ["--rot-start"]: `${h.rotStart}deg`,
            ["--rot-mid"]: `${h.rotMid}deg`,
            ["--rot-end"]: `${h.rotEnd}deg`,
            ["--heart-opacity"]: h.opacity,
          }}
        />
      ))}
      <style>{`
        @keyframes heart-float-up {
          0% {
            transform: translate(0, 0) rotate(var(--rot-start)) scale(1);
            opacity: 0;
          }
          10% {
            opacity: var(--heart-opacity);
          }
          25% {
            transform: translate(calc(var(--drift) * 0.6), -25vh) rotate(calc(var(--rot-start) * 1.4));
          }
          50% {
            transform: translate(calc(var(--drift) * -0.8), -50vh) rotate(var(--rot-mid));
          }
          75% {
            transform: translate(calc(var(--drift) * 0.5), -75vh) rotate(calc(var(--rot-mid) * 1.3));
          }
          90% {
            opacity: var(--heart-opacity);
          }
          100% {
            transform: translate(calc(var(--drift) * -0.3), -110vh) rotate(var(--rot-end));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Opening({ onOpen, closing }) {
  return (
    <>
      <FloatingHearts />

      <section
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out"
        style={{ opacity: closing ? 0 : 1 }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[26rem] w-[26rem] rounded-full bg-starlight/10 blur-[110px]" />
        </div>

        <p className="relative font-serif text-lg italic text-starlight-bright/80 sm:text-xl">
          I made this specially for you
        </p>

        <h1 className="relative mt-5 max-w-xl font-serif text-5xl font-medium leading-[1.05] text-glow sm:text-6xl md:text-7xl">
          My dr  Partner
        </h1>

        <p className="relative mt-6 max-w-sm font-sans text-sm font-light text-ink-muted sm:text-base">
          It&rsquo;s a little surprise for you, Partner. Take your time, and read every word. ❤️
        </p>

        <button
          onClick={onOpen}
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
        >
          Open This
          <span aria-hidden className="text-rosegold transition-transform duration-300 group-hover:translate-x-0.5">
            ✨
          </span>
        </button>

        <div aria-hidden className="relative mt-16 h-10 w-px bg-gradient-to-b from-starlight/40 to-transparent" />
      </section>
    </>
  );
}
