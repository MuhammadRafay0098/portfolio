# Muhammad Rafay — Portfolio

A personal developer portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

## Features
- Animated hero with a staggered load-in sequence and a typewriter effect cycling your roles
- Live "terminal" code card in the hero (developer-themed, no stock photo needed)
- Scroll-reveal animations on every section (fade + slide, once per element)
- Hover-glow project cards, animated background blobs, smooth-scroll navigation
- Fully responsive (mobile → desktop), respects `prefers-reduced-motion`
- All your content (skills, projects, experience, socials) lives in one place: `lib/data.ts`

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Then open http://localhost:3000

## 3. Edit your content

Everything you'll want to personalize lives in **`lib/data.ts`**:
- `ROLES` — the roles that cycle in the hero typewriter
- `SOCIAL` — your GitHub / LinkedIn / X / email / phone
- `SKILLS` — grouped skill chips
- `PROJECTS` — title, description, tech tags, live + code links
- `EXPERIENCE` — your timeline entries

No need to touch component files for content changes — just edit this one file.

## 4. Add a photo (optional)

The hero currently uses a code/terminal visual instead of a photo (fits the "developer" theme and needs
no image asset). If you'd like your photo somewhere (e.g. in the About section), drop an image into
`/public` (e.g. `public/photo.jpg`) and add an `<Image src="/photo.jpg" ... />` from `next/image` into
`components/About.tsx`.

## 5. Deploy (free, ~2 minutes) — Vercel

1. Push this project to a new GitHub repository.
2. Go to https://vercel.com, sign in with GitHub.
3. Click **New Project**, import your repo, leave all settings default, click **Deploy**.
4. Vercel will give you a live URL (e.g. `your-portfolio.vercel.app`) — put that link on your resume/LinkedIn.

Alternatively, deploy via CLI:

```bash
npm i -g vercel
vercel
```

## 6. Update your resume favicon / title

Edit the `metadata` object in `app/layout.tsx` to change the page title and description shown in search
results and browser tabs.

## Tech stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (custom color tokens in `tailwind.config.ts`)
- Framer Motion (all animation/motion)
- lucide-react (icons)
