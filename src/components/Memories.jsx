import { useRef, useState } from 'react';
import CONFIG from '../config.js';
import useReveal from '../useReveal.js';

export default function Memories() {
  const headingRef = useReveal();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(1);
  const total = CONFIG.memories.length;

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / (track.scrollWidth / total)) + 1;
    setIndex(Math.min(Math.max(i, 1), total));
  };

  return (
    <section id="memories" className="relative px-6 pb-24 pt-28 sm:pt-32">
      <p className="reveal font-serif text-base italic text-rosegold-soft/80">Chapter One</p>

      <h2 ref={headingRef} className="reveal mt-3 max-w-2xl mx-auto items-center justify-center text-center font-serif text-3xl font-medium leading-tight sm:text-4xl">
        You are the most beautiful gift life has ever given me. ❤️
      </h2>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-1 pr-6"
      >
        {CONFIG.memories.map((memory, i) => (
          <div
            key={i}
            className="group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-night-panel sm:w-[340px]"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={memory.image}
                alt={memory.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-serif text-xl font-medium text-glow">{memory.title}</h3>
              <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-muted">{memory.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 font-sans text-xs text-ink-faint">
        <span className="text-starlight-bright">{String(index).padStart(2, '0')}</span>
        <span className="h-px w-8 bg-white/15" />
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
