# Dee's Hair, Beauty & Bridal Salon

The Dee's salon website is a Next.js App Router application for hair, beauty,
bridal services, locations, gallery content, and appointment contact actions.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Framer Motion
- Lucide React
- CSS custom properties for the Dee's design system

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in a browser.

## Available commands

```bash
npx tsc --noEmit
npm run build
npm run start
```

The production build statically generates the homepage and verified location
routes.

## Project structure

- `app/` - App Router pages, layout, and global styles
- `components/` - shared layout, UI, icons, and reveal utilities
- `features/home/` - homepage sections
- `features/transformations/` - inline before/after comparisons
- `features/gallery/` - filters, image grid, and lightbox
- `features/locations/` - branch data, selection, and opening status
- `features/bridal/` - bridal section and beauty journey
- `public/images/` - local salon and editorial image assets

## Interaction and motion

The site preserves the existing Dee's palette, typography, navigation, and
content while using lightweight Framer Motion and CSS effects for:

- Hero scroll exit and carousel transitions
- Scroll-based section and card reveals
- Intent panel crossfades
- Gallery entrance and hover motion
- Bridal and About image reveals
- Mobile navigation open and close transitions
- Inline before/after image comparison with pointer, touch, and keyboard input

Animations respect `prefers-reduced-motion` and are kept lighter on mobile.

## Transformation images

Before/after assets are stored in `public/images/before-after/` and mapped in
`features/transformations/data/transformations.ts`.

The comparison control stays inside each image frame. It supports mouse,
pointer, touch, and ArrowLeft/ArrowRight keyboard interaction.
