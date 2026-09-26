// import { forwardRef, useState } from 'react';
// import CONFIG from '../config.js';

// // audioRef is created and controlled from App so Opening's click can start it.
// const MusicPlayer = forwardRef(function MusicPlayer({ shown }, audioRef) {
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     if (audio.paused) {
//       audio.play().catch(() => {});
//       setPlaying(true);
//     } else {
//       audio.pause();
//       setPlaying(false);
//     }
//   };

//   const handleOpen = () => {
//   setClosing(true);
//   setOpened(true);

//   const audio = audioRef.current;

//   if (audio) {
//     audio.currentTime = 80; // 1:20

//     const stopAt = () => {
//       if (audio.currentTime >= 120) { // 2:00
//         audio.pause();
//         audio.currentTime = 80; // மீண்டும் 1:20-க்கு reset
//         audio.removeEventListener('timeupdate', stopAt);
//       }
//     };

//     audio.addEventListener('timeupdate', stopAt);
//     audio.play().catch(() => {});
//   }

//   setTimeout(() => {
//     setShowOpening(false);
//     experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, 700);
// };


//   return (
//     <>
//       {/* Put your song file in /public and name it exactly music.mp3 */}
//       <audio
//         ref={audioRef}
//         src="/public/audio/bgm1.mpeg"
//         loop
//         preload="none"
//         onPlay={() => setPlaying(true)}
//         onPause={() => setPlaying(false)}
//       />

//       <div
//         className={`fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-night-panel/80 px-4 py-2.5 shadow-glow backdrop-blur-md transition-all duration-500 ${
//           shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
//         }`}
//       >
//         <button
//           onClick={toggle}
//           aria-label="Play or pause music"
//           className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-starlight/15 text-starlight-bright transition hover:bg-starlight/25"
//         >
//           {playing ? '⏸' : '▶'}
//         </button>

//         <div className="flex items-center gap-2 pr-1">
//           <span className="font-sans text-xs font-medium text-ink-muted">{CONFIG.songTitle}</span>
//           <div className="flex h-3 items-end gap-[3px]">
//             {[0, 1, 2].map((i) => (
//               <span
//                 key={i}
//                 className={`w-[3px] rounded-full bg-starlight ${playing ? 'animate-drift' : ''}`}
//                 style={{
//                   height: playing ? '100%' : '35%',
//                   animationDelay: `${i * 0.15}s`,
//                   opacity: playing ? 1 : 0.35,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// });

// export default MusicPlayer;

import { forwardRef, useEffect, useState } from 'react';
import CONFIG from '../config.js';

const MusicPlayer = forwardRef(function MusicPlayer(
  { shown, finalSurprise = false },
  audioRef
) {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // Final surprise song start
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !shown) return;

    if (finalSurprise) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '/audio/bgm2.mp4';
      audio.load();

      audio.play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    }
  }, [finalSurprise, shown, audioRef]);

  return (
    <>
      <audio
        ref={audioRef}
        src={finalSurprise ? '/audio/bgm2.mp4' : '/audio/bgm1.mpeg'}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div
        className={`fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-night-panel/80 px-4 py-2.5 shadow-glow backdrop-blur-md transition-all duration-500 ${
          shown
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <button
          onClick={toggle}
          aria-label="Play or pause music"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-starlight/15 text-starlight-bright transition hover:bg-starlight/25"
        >
          {playing ? '⏸' : '▶'}
        </button>

        <div className="flex items-center gap-2 pr-1">
          <span className="font-sans text-xs font-medium text-ink-muted">
            {finalSurprise ? 'Our Final Song ❤️' : CONFIG.songTitle}
          </span>

          <div className="flex h-3 items-end gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-starlight ${
                  playing ? 'animate-drift' : ''
                }`}
                style={{
                  height: playing ? '100%' : '35%',
                  animationDelay: `${i * 0.15}s`,
                  opacity: playing ? 1 : 0.35,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default MusicPlayer;