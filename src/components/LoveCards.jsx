import CONFIG from '../config.js';
import useReveal from '../useReveal.js';

function Card({ title, text }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal rounded-2xl border border-white/10 bg-night-panel/50 p-6 transition duration-300 hover:border-starlight/30 hover:bg-night-panel/80"
    >
      <h3 className="font-serif text-xl font-medium">{title}</h3>
      <p className="mt-2.5 font-sans text-sm font-light leading-relaxed text-ink-muted">{text}</p>
    </div>
  );
}

export default function LoveCards() {
  const headingRef = useReveal();

  return (
    <section id="love" className="relative px-6 py-24 sm:py-32">
      <p className="reveal font-serif text-base italic text-rosegold-soft/80">Chapter Three</p>

      <h2 ref={headingRef} className="flex flex-col mx-auto text-center justify-center reveal mt-3  items-center  max-w-xl font-serif text-3xl font-medium leading-tight sm:text-4xl">
        Why You Mean So Much to Me  🫂
      </h2>

   

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONFIG.loveThings.map((item, i) => (
          <Card key={i} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}
