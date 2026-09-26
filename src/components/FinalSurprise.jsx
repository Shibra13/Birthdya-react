import { useRef, useState } from 'react';
import CONFIG from '../config.js';
import useReveal from '../useReveal.js';

function launchConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#8ec9f0', '#5fc9e8', '#bfe0ff', '#efc6be', '#ffffff'];

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 200,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 10,
  }));

  let frames = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frames++;

    if (frames < 240) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

export default function FinalSurprise({onFinalReveal,onBackHome}) {
  const quizRef = useReveal();
  const canvasRef = useRef(null);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = CONFIG.questions || [];
  const maxScore = questions.length * 10;

  const handleAnswer = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) correct++;
    });

    const finalScore = correct * 10;
    setScore(finalScore);
    setSubmitted(true);

    if (finalScore === maxScore) {
      setTimeout(() => launchConfetti(canvasRef.current), 100);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const openFinalMessage = () => {
    setRevealed(true);
    launchConfetti(canvasRef.current);

     onFinalReveal?.();
  };

  return (
    <section id="final" className="relative min-h-[100dvh] px-6 py-24 sm:py-32">
      <canvas id="confetti-canvas" ref={canvasRef} />

      {/* ================= QUIZ ================= */}
      {!revealed && (
        <div ref={quizRef} className="reveal mx-auto max-w-2xl">
          {!quizStarted ? (
            <div className="text-center">
              <p className="font-serif text-base italic text-rosegold-soft/80">Chapter Four</p>
              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
                A Little Challenge For You 🫶🏻
              </h2>
              <p className="mx-auto mt-4 max-w-sm font-sans text-sm font-light text-ink-muted">
                Before your final surprise&hellip; let&rsquo;s see how well you know me. 😌❤️
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="mt-9 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
              >
                Start the Challenge ❤️
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="font-serif text-base italic text-rosegold-soft/80">Chapter Four</p>
                <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
                  How Well Do You Know Me? 🫶🏻
                </h2>
                <p className="mx-auto mt-3 max-w-sm font-sans text-sm font-light text-ink-muted">
                  Let&rsquo;s see how well you know your girl. 😌❤️
                </p>
              </div>

              {/* ================= QUESTIONS ================= */}
              {!submitted && (
                <div className="mt-10 space-y-5">
                  {questions.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="rounded-2xl border border-white/10 bg-night-panel/50 p-5 sm:p-6"
                    >
                      <h3 className="font-sans text-[15px] font-medium text-ink">
                        {questionIndex + 1}. {question.question}
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => {
                          const selected = selectedAnswers[questionIndex] === optionIndex;
                          return (
                            <button
                              key={optionIndex}
                              onClick={() => handleAnswer(questionIndex, optionIndex)}
                              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left font-sans text-sm transition ${
                                selected
                                  ? 'border-starlight/60 bg-starlight/10 text-starlight-bright'
                                  : 'border-white/10 bg-white/[0.02] text-ink-muted hover:border-white/25 hover:bg-white/[0.05]'
                              }`}
                            >
                              <span className="text-xs text-ink-faint">{String.fromCharCode(65 + optionIndex)}.</span>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length !== questions.length}
                    className="w-full rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow backdrop-blur-sm transition duration-300 enabled:hover:border-starlight/70 enabled:hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Submit My Answers ❤️
                  </button>
                </div>
              )}

              {/* ================= RESULT ================= */}
              {submitted && (
                <div className="mt-10 text-center">
                  <div className="font-serif text-5xl font-medium text-glow">
                    {score}/{maxScore}
                  </div>

                  {score === maxScore ? (
                    <>
                      <h3 className="mt-5 font-serif text-2xl font-medium">Perfect Score! 🥹❤️</h3>
                      <p className="mx-auto mt-3 max-w-sm font-sans text-sm font-light text-ink-muted">
                        Okayyy&hellip; you really know me! 😂
                        <br />
                        I think you deserve your final surprise. 🫶🏻
                      </p>
                      <button
                        onClick={openFinalMessage}
                        className="mt-8 inline-flex items-center gap-2 rounded-full border border-rosegold/50 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow-rose backdrop-blur-sm transition duration-300 hover:border-rosegold/80 hover:bg-white/[0.06] active:scale-[0.98]"
                      >
                        One Last Message For You&hellip; 🤍✨
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-5 font-serif text-2xl font-medium">Almost There! 😂❤️</h3>
                      <p className="mx-auto mt-3 max-w-sm font-sans text-sm font-light text-ink-muted">
                        You got {score}/{maxScore}.
                        <br />
                        Try again&hellip; I know you can get full marks! 😌
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="mt-8 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
                      >
                        Try Again ❤️
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ================= FINAL MESSAGE ================= */}
      {revealed && (
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">Sajith ❤️ Shibra</h2>

          <p className="mt-8 whitespace-pre-line text-left font-serif text-base font-light leading-loose text-ink-muted sm:text-lg">
            {CONFIG.finalMessage}
          </p>

          <div className="mt-10 font-serif text-xl italic text-rosegold-soft">
            I Love You More Than Words Can Say. ❤️
          </div>

         {/* <button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setRevealed(false);
    setQuizStarted(false);
    setSubmitted(false);
    setSelectedAnswers({});
    setScore(0);

    onBackHome?.();
  }}

            className="mt-10 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
          >
            🏠 Back to Home ❤️
          </button> */}

          <button
  onClick={() => {
    setRevealed(false);
    setQuizStarted(false);
    setSubmitted(false);
    setSelectedAnswers({});
    setScore(0);

    onBackHome?.();
  }}

  className="mt-10 inline-flex items-center gap-2 rounded-full border border-starlight/40 bg-white/[0.03] px-8 py-3.5 font-sans text-sm font-medium text-ink shadow-glow backdrop-blur-sm transition duration-300 hover:border-starlight/70 hover:bg-white/[0.06] active:scale-[0.98]"
          
>
  🏠 Back to Home ❤️
</button>
        </div>
      )}
    </section>
  );
}
