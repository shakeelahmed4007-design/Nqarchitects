# Nqarchitects Website

Responsive website for **Nqarchitects** — architecture and interior design studio based in DHA, Lahore.

Built with **React + Vite + Tailwind CSS**.

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 3
- Lucide React (icons)

## Getting Started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

For a production build:

```bash
npm run build
```

Generated files will be in the `dist/` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Gallery.jsx
│   ├── Planning.jsx   # WhyUs, Pricing, FAQ sections
│   ├── Contact.jsx
│   └── Chat.jsx       # Live chat widget
├── data/
│   └── content.js     # Services, images, site content
├── App.jsx
├── Language.jsx       # EN/ES language switcher
└── styles.css
public/
└── assets/            # Logo and project images
```

## Notes

- Portfolio images are in `public/assets/`.
- Service copy and content data live in `src/data/content.js`.
- The contact form opens WhatsApp with a pre-filled message — no backend required.
- Pricing is custom quoted; the calculator is illustrative only.
- Supports English and Spanish (EN/ES) via the language switcher.
