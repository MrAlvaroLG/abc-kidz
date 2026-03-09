# ABC Kids — Daycare & Early Education

A modern website built with Next.js, designed to communicate warmth, trust, and clarity to families and caregivers.

---

**Status:** Work in progress

**Main stack:** `Next.js (App Router)`, `TypeScript`, `Tailwind CSS`, `Sanity` (CMS)

---

**Local Demo**

Start the development server and test the app locally:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open `http://localhost:3000` in your browser.

**Build for Production**

```bash
npm run build
npm run start
```

If you use `pnpm` or `yarn`, replace the commands accordingly.

---

**Repository Structure**

- `app/` — Routes and pages (App Router). Localization in `app/[locale]`.
- `components/` — UI components organized by section (home, blog, contact, layout, etc.).
- `public/` — Images and public assets.
- `sanity/` — Sanity (CMS) configuration and schemas.
- `lib/` and `src/` — Utilities and shared code.

---

**Useful Scripts (check `package.json` to confirm)**

- `dev` — Runs the app in development mode.
- `build` — Compiles the app for production.
- `start` — Starts the compiled version.
- `lint` — Runs linters (if configured).

---

**Key Features**

- Responsive design with reusable components.
- Internationalization (`en`, `es`) using `next-intl` and routes in `app/[locale]`.
- Integration with `Sanity` for content management (posts, authors, categories).
- Interactions and CSS micro-animations for a more human experience.

---

**Accessibility & Performance**

- Prioritizes readable text, proper contrast, and keyboard navigation.
- Fonts optimized with `next/font` to improve LCP and CLS.
- Recommendation: run a Lighthouse audit and review performance and accessibility suggestions.

---

**Quick Design & Content Guide**

- Colors and tokens: see `docs/paleta-colores.md`.
- Messages and translations: `messages/en.json` and `messages/es.json`.

---

**How to Contribute**

1. Create a fork and a branch with a descriptive name: `feature/my-change`.
2. Keep commits small and with clear messages.
3. Open a pull request describing the changes and motivation.
4. Add notes about manual testing and screenshots if applicable.

If you're going to touch global styles or design tokens, confirm first in an issue to avoid visual conflicts.

---

**Deployment**

Recommended: deploy on Vercel for native Next.js compatibility. Connect the repository and configure the necessary environment variables (e.g., `Sanity` keys).

Common variables to define (examples):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (if you need server-side writes)

---

**Localization Notes**

The project includes support for `en` and `es` in `app/[locale]`. Keep translation keys synchronized in `messages/*.json` and avoid duplicates.

---

**Contact & Author**

If you need help or want to collaborate, reach out to: `alvarolg.developer@gmail.com`.
