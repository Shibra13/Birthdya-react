# For Sajith, With Love 🎂❤️

A birthday surprise website — React + Vite + Tailwind CSS.

## Folder structure

```
sajith-birthday/
├── index.html              Vite entry HTML
├── package.json
├── vite.config.js
├── tailwind.config.js      Design tokens (colors, fonts, shadows)
├── postcss.config.js
├── public/
│   ├── images/              Your 4 photos, already copied in
│   │   ├── img1.jpg
│   │   ├── img2.jpeg
│   │   ├── img3.jpg
│   │   └── img4.jpg
│   └── music.mp3            ← add your own song here (optional, see below)
└── src/
    ├── main.jsx              React entry point
    ├── App.jsx                Page shell / flow control
    ├── config.js               ALL editable content lives here (text, photos, quiz)
    ├── useReveal.js            Scroll-reveal hook
    ├── index.css               Tailwind + a few small custom utilities
    └── components/
        ├── Particles.jsx        Starfield background
        ├── Opening.jsx           Hero / "Open This" gate
        ├── MusicPlayer.jsx       Floating play/pause pill
        ├── Memories.jsx          Horizontal photo carousel (Chapter One)
        ├── BirthdayMessage.jsx   Typewriter letter (Chapter Two)
        ├── LoveCards.jsx         Reasons grid + photo strip (Chapter Three)
        └── FinalSurprise.jsx     Quiz + final love-letter reveal (Chapter Four)
```

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Add your song (optional)

Drop an MP3 named exactly `music.mp3` into `public/`. It will autoplay softly once the site is opened.

## Edit the content

Everything text-based — the birthday message, the Tamil final letter, the quiz questions/answers, and which photo goes where — lives in `src/config.js`. You don't need to touch any component file to change wording.

## Deploy

```bash
npm run build
```

This outputs a static `dist/` folder you can drop onto Vercel, Netlify, GitHub Pages, or any static host.

## Design notes

- **Palette**: deep midnight navy (`night`) as the base, a cool starlight blue (`starlight`) as the primary glow, and a warm rose-gold (`rosegold`) as the romantic counterpoint — used for the italic "chapter" labels and the final reveal.
- **Type**: Cormorant Garamond (serif) for anything that should feel like a love letter; Inter (sans) for UI chrome — buttons, captions, quiz options.
- **Structure**: the whole site is framed as four chapters of a story (Memories → Message → Reasons → Challenge), which is why the small numbered labels are used — it's an actual sequence, not decoration.
