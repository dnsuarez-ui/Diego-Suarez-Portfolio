# Diego Suarez — Portfolio

Personal portfolio for Diego Suarez, Digital Product Designer (15+ years).
Audience: top-tier recruiters, hiring managers and product leaders at international companies.
One idea, communicated relentlessly: **"I make complex products feel obvious."**

Copy, per-page content and case study text live in `docs/CONTENT.md`.
This file is architecture and rules only.

---

## 1. How we work — read this first

- **Every prompt starts with:** `Do not stop or restart the dev server at any point.`
- **Diego makes all design decisions.** Claude executes. Never invent visual design, copy, spacing or interaction behavior that wasn't specified.
- **No code without prior approval.** Discuss and agree before implementing.
- **Diagnose before implementing.** When something is broken, investigate and report the root cause first. Do not guess-fix.
- **Design tokens by NAME, never hex values.** Write `accent-orange`, not `#FB6F00`.
- **Never hand-copy shared logic.** If two places need the same behavior, extract it into one shared module that both consume. Copy-paste is how this project broke before.
- **Scope discipline.** Every task states explicitly what must NOT be touched. Respect it. If a fix genuinely requires touching something out of scope, report why and wait.
- **No magic-number timeouts.** Never `setTimeout(300)` to wait for layout. Observe the actual DOM/animation state.
- **No abbreviations in prompts or handoffs.** Never `[rest unchanged...]`.
- **TypeScript:** explicit types, no `any`.

**Consistency is the highest-order principle** — visual, architectural and in code.
A Senior Developer reviewing this codebase must find it impeccable.

---

## 2. Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS — fluid: `clamp()` and relative units, **no fixed breakpoints**
- Framer Motion — all animation
- Instrument Sans (400, 500, 600, 700 — normal style only, no italic) via Google Fonts
- Vercel + GitHub

**Analytics:** `@vercel/analytics` and `@vercel/speed-insights` mount in `app/layout.tsx` after `{children}`, on every route including password-protected case studies. No `track()` calls (custom events are Vercel Pro-only). No consent banner — Vercel Web Analytics is cookieless. Both must be enabled manually in the Vercel dashboard after deploy; they record in production only, never on localhost.

**Environment:** `PROTECTED_PASSWORD` must be set in Vercel → Settings → Environment Variables. `.env.local` is gitignored and never pushed.

---

## 3. Architecture invariants — non-negotiable

These exist because each one was a real bug that cost real time. Do not undo them.

### 3.1 `CaseStudyPageShell` — one shell, all case studies

`components/layouts/CaseStudyPageShell.tsx` owns:
- Outer `motion.div`, `entered` / `isExiting` transition wiring
- `handleCopyEmail`, `handleBackClick`
- Header / breadcrumb
- Full sidebar: title, meta, roles, overview, tools, contact row
- Lightbox state and `<Lightbox/>`
- Scroll-to-top on mount (see 3.2)

Right-column content arrives as a render-prop: `children: (openLightbox) => ReactNode`.

**Case study pages are DATA-ONLY** — a `roles` array, an `overviewParagraphs` array, and image-section JSX. They must contain zero transition constants, zero helper/icon definitions, zero state wiring, zero sidebar markup.

`rental-modernization` is the reference pattern. **Never hand-copy the shell into a new case study.**

Shared UI in `components/ui/`: `Bold`, `CaseImage`, `Comment`, `FadeUp`. Icons (including the copy-email glyph) always go through the shared `Icon` component (`components/ui/Icon.tsx`) — never a one-off bespoke SVG component.

Right-column scroll reveals in every case study use `FadeUp` (`components/ui/FadeUp.tsx`) — never a hand-rolled `motion.div`. Each comment/image is its own `<FadeUp>`; within one visual section (a comment + its image(s)), stagger children by `delay={0.08 * index}`, resetting to 0 at the start of each new section. This is standardized across Serveo, `rental-modernization` and `rental-modernization-2` — apply it identically to every future case study.

**Spacing rhythm inside the right column is two-tier, always:** a comment and the image(s) it directly precedes are wrapped in their own `<div className="flex flex-col gap-4">` (16px, tight pairing); the outer column stacking those groups uses `gap-8` (32px, section separation). Never flatten a section into a single `gap-8` list — a comment must always read as visually attached to its own image, not evenly spaced from everything around it.

Case study **metadata that appears in two places — title, industry, year, roles, thumbnail — lives in exactly one place: `lib/caseStudies.ts`**. Both `Work.tsx` (home cards) and each case study's own `page.tsx` import from it via `getCaseStudy(slug)`; neither retypes these fields locally. This existed as two independently hand-typed copies before and drifted out of sync twice — do not reintroduce a second copy for a new case study's card or page.

Transition constants `EXIT_TRANSITION` / `ENTER_TRANSITION` / `EXIT_DURATION_MS` live in `components/providers/PageTransition.tsx`.

### 3.2 Scroll — one strategy, each destination owns its position### 3.2 Scroll — one strategy, each destination owns its position

`{ scroll: false }` on **every** `router.push`, both directions. Next's built-in scroll restoration is permanently disabled so it can never race the custom logic. Then each destination claims its own position:

- **Forward (home → case study):** `useCaseStudyNavigation()` in `components/providers/PageTransition.tsx` saves `window.scrollY` to `sessionStorage["homeScrollPosition"]`, then navigates. Consumed identically by `Work.tsx` (Serveo row) and `CaseStudyCard.tsx` (protected cards). No component may save that key or call navigate directly.
- **Arriving at a case study:** `CaseStudyPageShell` resets scroll to top on mount, using `behavior: 'instant'`. **`'instant'` is mandatory** — `'auto'` defers to the global `scroll-behavior: smooth` in `globals.css` and turns the reset into a ~750ms visible animation that also eats the entrance animation. The reset must run on the commit where real content mounts, not on an earlier empty commit (protected pages render `null` first while the access guard resolves).
- **Back (breadcrumb → home):** also `{ scroll: false }`. No `router.back()`, no plain `<Link>`.
- **Arriving home:** `app/page.tsx` restores `homeScrollPosition` using a `requestAnimationFrame` frame-count debounce — it polls `document.documentElement.scrollHeight` and only scrolls once the height has been identical for 3 consecutive frames. This survives the protected-work unlock re-render and the 300ms card height animation. **Never replace this with a millisecond delay.**

**Do not "fix" scroll by removing `{ scroll: false }`.** That reintroduces the race that sent users to the hero.

**Always verify scroll behavior at both a desktop width and a narrow/mobile width.** Above the `md` breakpoint the scroll container is `main` (`overflow-y-scroll`), so a broken `window.scrollTo` is invisible; below it the window scrolls and the bug appears.

### 3.3 Shared `Lightbox`

`components/ui/Lightbox.tsx` — one component, all case studies, no variants.

- Opens **fit-to-width** with the **top of the image anchored to the top of the container**. Never vertically centered — tall images extend below the fold and are reached by panning. Nothing is ever cropped out of reach.
- Zoom: min = fit-to-width (100%), max = 3× (300%). Mouse wheel and bottom slider stay in sync. **No double-click behavior.**
- Pan: drag, clamped so the image can't leave view.
- Cursor: reuse the existing custom cursor — orange clickable circle over the image, same circle scaled to ~8px while dragging. **Never** native `grab`/`grabbing`.
- The Figma-style comment stays **fixed at the top** — never moves, scales or scrolls with the image.
- Closes via Esc, backdrop click, and X button — all three.
- The comment shown in the lightbox is **data passed through `CaseImage`'s optional `comment` prop** (`{ lead?, text }`, typed as `LightboxComment` in `Lightbox.tsx`), sourced from the same page-local constant used to render the visible on-page `<Comment>`. Never re-type the comment text a second time keyed by image path — that was a real bug (case studies silently missing their lightbox comment because a separate lookup table went stale).

### 3.4 Password protection

- Password lives in the **server** env var `PROTECTED_PASSWORD`. Never `NEXT_PUBLIC_`, never hardcoded in the frontend, never visible in the bundle.
- Frontend POSTs to `/api/auth/validate-password`, receives a token on success.
- `sessionStorage["protectedWorkAccess"]` stores `{ token, timestamp }`. TTL: 2 hours of inactivity **or** tab/window close, whichever comes first.
- 3 failed attempts → 2-hour lockout: input disabled, persistent message.
- Failed attempt animation: input shake + border to the `error` token.
- Access is read **only** through `hasValidAccess()` in `lib/protectedWorkAccess.ts`. No component may read the key directly.

Security intent: deters casual browsing and shared URLs. Not cryptographic — images remain copyable after auth, no watermarking.

### 3.5 Protected case study access guard

Protected case study pages have public URLs, so the route itself must guard — hiding the card on home is not protection.

- On mount, check `hasValidAccess()`. Invalid → redirect to `/` **before** any protected content renders (no flash).
- Protected vs public is a flag consumed by the shell, so future protected case studies inherit the guard automatically.
- **Serveo is PUBLIC** and must never be guarded. `rental-modernization` is protected.
- Client-side guard only. A server `middleware.ts` (cookie-based) can be layered on later without conflict — nothing would need redoing.

---

## 4. Design system

Always reference tokens by name.

### Colors

| Token | Value | Use |
|---|---|---|
| `pure-black` | `#000000` | Home background |
| `off-white` | `#FAF9F6` | Primary text on home |
| `light-gray` | `#808080` | Secondary text, metadata, labels |
| `accent-orange` | `#FB6F00` | Accent — **max ONE element per viewport** |
| `surface` | `#0D0D0D` | Elevated surfaces |
| `border-dark` | `#1A1A1A` | Borders on home |
| `border-light` | `#DADADA` | Borders on case study pages |
| `error` | `#FF3B30` | Input error state only |
| `cs-bg` | `#FAF9F6` | Case study page background |

Case study pages invert the palette: `cs-bg` background with black primary text.

**Rules:** no gradients except the hero ambient light. No shadows. No border-radius on structural elements — zero, everywhere.

### Typography — Instrument Sans only

Weights: 400 (body, metadata, nav) · 500 (row numbers, "Proof" label) · 600 (inline emphasis via `Bold`, comment leads, card sub-headings, email/LinkedIn links) · 700 ("I make products feel" — H2-Bold — and "complex"; "obvious" at 110% — H1-Bold; wordmark; section titles). No italic is currently used anywhere on the site — only the `normal` style is loaded from `next/font`.

All sizes fluid via `clamp()` — never fixed px for type or layout spacing.

### Spacing

Base-8 scale: 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 72 / 80 — expressed fluidly.

### Assets

- Icons: SVG in `/public/icons/`, using `currentColor`.
- Material Symbols Sharp for lock states only: `lock` / `lock_open_right`.
- Images: WebP in `/public/images/`. Case study assets in `/public/images/case-study/[project-name]/`, with `-hd` variants for the lightbox.

### Custom cursor — one system, whole site

System cursor hidden. `requestAnimationFrame` lerp, factor **0.18**.

- Default: 8px circle, outline, transparent fill
- Hover clickable: 12px, filled `accent-orange`
- Hover non-clickable: 12px, outline, transparent fill
- Lightbox drag: clickable circle scaled to ~8px

On case study pages the outline color adapts to the light background.

---

## 5. Motion

- **Hero entrance** (once on load): tagline lines at 0.3s / 0.7s / 1.1s, pause, photo 1.9s, metadata 2.3s (80ms stagger), Proof indicator 2.7s, nav 3.0s.
- **"complex" hover:** self-correcting typography. Characters substitute one at a time (40–60ms apart) and always resolve back to `complex`. Cooldown 2000ms. No glitch, shake, flash or movement.
- **Photo magnetic parallax:** factor **0.25 desktop / 0.06 mobile**. Moves opposite the cursor, returns to center on leave.
- **Proof arrow:** extends downward and shifts to `accent-orange`, then returns. Looping. `transform-origin: top center`.
- **Film grain:** fixed full-page overlay, `pointer-events: none`, opacity **0.055**.
- **Page transition (home ↔ case study):** 1.2s total — 0.5s fade out, 0.3s hold on black, 0.4s fade in with the background transitioning black → off-white simultaneously.
- **Scroll reveals (case study right column):** opacity 0→1, y 8→0, 0.5s easeOut, `useInView` once, 80ms stagger within a section — implemented via the shared `FadeUp` component (see 3.1), never a one-off `motion.div`. The left column never animates on scroll.
- **Protected work unlock:** locked content fades out → container expands → unlocked content fades in → cards stagger in. Lock reverses the sequence.

**Motion rules:** no cursor trails, no bounce or spring physics, no parallax beyond what's listed, no animation not specified here.

---

## 6. Page structure

### Home (`app/page.tsx`)
Hero → Work → About → Contact → Footer.

Work section order: Serveo row → `ProtectedWork` → protected case study cards (conditional) → About.

`ProtectedWork` lives **in the home page**, not on a route. A `/protected-work` route was created once by mistake and deleted — do not recreate it.

It owns **only** the lock/unlock UI. Protected case study cards are **not** nested inside it; they render as siblings in the home page, conditionally, based on the sessionStorage grant. Those cards have no background and no border.

The "Lock Access" button is **primary** (`accent-orange` fill, same as Unlock) — it's the only action available in that state.

### Case study (`app/case-study/[name]/page.tsx`)
12-column grid. Sticky left column (4/12): title, meta, roles, overview, tools, contact anchored at the bottom. Scrollable right column (8/12): images with Figma-style comments, opened in the shared lightbox.

Current case studies:
- **Serveo** — public
- **rental-modernization** — protected, and the reference pattern for everything new
- **rental-modernization-2** — protected, second chapter of the same car-rental project ("Making every step easier")

---

## 7. Known pitfalls — do not reintroduce

- **`behavior: 'auto'` in `scrollTo` is NOT instant.** It defers to the element's CSS `scroll-behavior`. Since `globals.css` sets `html { scroll-behavior: smooth }`, `'auto'` turns any corrective scroll into a ~750ms animation. **Every programmatic scroll reset must use `behavior: 'instant'`.**
- **Verify every navigation change at BOTH a desktop width and a narrow/mobile width before calling it done.** Above the `md` breakpoint the scroll container is `main` (`overflow-y-scroll`), so a broken `window.scrollTo` is invisible. Below it, the window itself scrolls and the bug appears.
- **Hero glow gradient math.** `radial-gradient(ellipse …)` defaults to `farthest-corner`, which puts the box edge at ≈70.7% of the gradient scale. A `transparent 70%` stop lands 0.7 points short — desktop rounds the residual alpha to zero, iOS Safari doesn't, producing a hard orange line. The glow now uses an outer clipped wrapper at the original footprint plus an inner element at 140% with the transparent stop at 50% (same physical radius, ~20 points of buffer). Never restore the near-miss values, and never rely on an engine clipping `filter: blur` correctly.
- **Millisecond delays to wait for layout.** Always observe actual state.
- **Removing `{ scroll: false }`** to fix a scroll bug.
- **Copying the case study shell** into a new page instead of consuming it.
- **Reading `protectedWorkAccess` directly** instead of via `hasValidAccess()`.
- **Hardcoded hex values** anywhere in prompts or code.

---

## 8. Quality bar

- WCAG 2.1 AA contrast maintained throughout
- No lorem ipsum anywhere
- No horizontal scroll at any viewport
- `accent-orange` never appears twice in one viewport
- Zero border-radius on structural elements
- Components live in `components/ui/`, `components/sections/`, `components/layouts/`, `components/providers/`

---

## 9. Roadmap

**Next:** language toggle (ENG/ESP) per case study — see `docs/CONTENT.md` for scope and data shape. Translations in progress.

**Deferred:** server-side `middleware.ts` for URL-level protection · "More work" cross-linking between case studies · Figma comment bubbles following the cursor over images · SEO and meta tags · mobile audit · performance audit · 4–6 additional protected case studies.