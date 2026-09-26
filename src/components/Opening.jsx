export default function Opening({ onOpen, closing }) {
  return (
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
        My Dr. Partner
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
  );
}
