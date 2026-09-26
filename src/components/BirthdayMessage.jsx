import { useEffect, useRef, useState } from 'react';
import CONFIG from '../config.js';
import useReveal from '../useReveal.js';

export default function BirthdayMessage() {
  const sectionRef = useRef(null);
  const labelRef = useReveal();
  const headingRef = useReveal();
  const typedRef = useReveal();

  const [typed, setTyped] = useState('');
  const startedRef = useRef(false);

  const partnerLine = 'Happy Birthday daaaa, my partner. ❤️🎂';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;

          const text = CONFIG.message;
          let i = 0;

          const interval = setInterval(() => {
            if (i < text.length) {
              setTyped((prev) => prev + text[i]);
              i++;
            } else {
              clearInterval(interval);
            }
          }, 28);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const remainingMessage = typed.startsWith(partnerLine) ? typed.slice(partnerLine.length) : typed;

  return (
    <section id="message" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <p ref={labelRef} className="reveal font-serif text-base italic text-rosegold-soft/80">
          Chapter Two &mdash; Today is a very special day
        </p>

        <h2 ref={headingRef} className="reveal mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
          Happy Birthday, My Precious One 🎂
        </h2>

        <div
          ref={typedRef}
          className="reveal relative mt-10 rounded-2xl border border-white/10 bg-night-panel/60 p-7 shadow-glow backdrop-blur-sm sm:p-10"
        >
          <span aria-hidden className="absolute -left-3 -top-3 text-4xl text-rosegold-soft/70">
            &ldquo;
          </span>

          {typed.length > 0 && (
            <p className="font-serif text-xl font-medium text-starlight-bright sm:text-2xl">{partnerLine}</p>
          )}

          <p className="mt-4 whitespace-pre-line font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-base">
            {remainingMessage}
            {typed.length > 0 && typed.length < CONFIG.message.length && (
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-starlight align-middle" />
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
