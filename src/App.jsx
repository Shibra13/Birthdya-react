// import { useRef, useState } from 'react';
// import Particles from './components/Particles.jsx';
// import Opening from './components/Opening.jsx';
// import MusicPlayer from './components/MusicPlayer.jsx';
// import Memories from './components/Memories.jsx';
// import BirthdayMessage from './components/BirthdayMessage.jsx';
// import LoveCards from './components/LoveCards.jsx';
// import FinalSurprise from './components/FinalSurprise.jsx';

// export default function App() {
//   const [opened, setOpened] = useState(false);
//   const [showOpening, setShowOpening] = useState(true);
//   const [closing, setClosing] = useState(false);
//   const audioRef = useRef(null);
//   const experienceRef = useRef(null);
  

//   const handleOpen = () => {
//     setClosing(true);
//     setOpened(true);
//     const audio = audioRef.current;
//     if (audio) audio.play().catch(() => {});
//     setTimeout(() => {
//       setShowOpening(false);
//       experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, 700);
//   };

//   return (
//     <>
//       <Particles />
//       {showOpening && <Opening onOpen={handleOpen} closing={closing} />}
//       <MusicPlayer ref={audioRef} shown={opened} />
//       {opened && (
//         <div id="experience" className="relative z-10" ref={experienceRef}>
//           <Memories />
//           <BirthdayMessage />
//           <LoveCards />
//           {/* <FinalSurprise /> */}
//          <FinalSurprise
//   onFinalReveal={() => setFinalSurprise(true)}
// />
//         </div>
//       )}
//     </>
//   );
// }


import { useRef, useState } from 'react';
import Particles from './components/Particles.jsx';
import Opening from './components/Opening.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Memories from './components/Memories.jsx';
import BirthdayMessage from './components/BirthdayMessage.jsx';
import LoveCards from './components/LoveCards.jsx';
import FinalSurprise from './components/FinalSurprise.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [closing, setClosing] = useState(false);

  // Controls which song is playing
  const [finalSurprise, setFinalSurprise] = useState(false);

  const audioRef = useRef(null);
  const experienceRef = useRef(null);

  const handleOpen = () => {
    setClosing(true);
    setOpened(true);

    const audio = audioRef.current;

    if (audio) {
      audio.play().catch(() => {});
    }

    setTimeout(() => {
      setShowOpening(false);
      experienceRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 700);
  };
 
  const handleBackHome = () => {
    setFinalSurprise(false);

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      audio.src = '/audio/bgm1.mpeg';
      audio.load();

      audio.play().catch(() => {});
    }
  };

  

  return (
    <>
      <Particles />

      {showOpening && (
        <Opening
          onOpen={handleOpen}
          closing={closing}
        />
      )}

      <MusicPlayer
        ref={audioRef}
        shown={opened}
        finalSurprise={finalSurprise}
      />

      {opened && (
        <div
          id="experience"
          className="relative z-10"
          ref={experienceRef}
        >
          <Memories />

          <BirthdayMessage />

          <LoveCards />

          <FinalSurprise
            onFinalReveal={() => setFinalSurprise(true)}
            onBackHome={handleBackHome}
          />
        </div>
      )}
    </>
  );
}