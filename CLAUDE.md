# Diego Suarez — Portfolio
## Project
Personal portfolio for Diego Suarez, Digital Product Designer with 15+ years of experience.
Target audience: top-tier recruiters, hiring managers, and product leaders at international companies.
Goal: communicate one idea — "I make complex products feel obvious."
This is not a portfolio. It's a statement about a design philosophy.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (fluid, no fixed breakpoints — use clamp() and relative units everywhere)
- Framer Motion (all animation)
- Google Fonts: Instrument Sans (400, 400 italic, 500, 600, 700, 700 italic)
- Deployed on Vercel / GitHub

## Design System

### Colors — strict, no exceptions
```
--bg:       #000000   pure black
--text:     #FAF9F6   off-white, all primary text
--muted:    #808080   secondary text, metadata, labels
--border:   #1A1A1A   all dividers and borders
--surface:  #0D0D0D   elevated surfaces, NDA block
--orange:   #FB6F00   accent — ONE element per viewport maximum
--error:    #FF3B30   password input error state only
```

**Rules:**
- #FB6F00 appears in maximum ONE element per viewport at any scroll position
- No gradients anywhere except ambient light behind hero photo
- No shadows
- No border-radius on any structural element — zero, everywhere

### Typography — Instrument Sans only, everywhere, no exceptions
```
font-family: 'Instrument Sans', sans-serif
```

**Weights:**
- 400 — body, metadata, nav links
- 400 italic — "complex" in tagline
- 600 — "I make", "products", "feel" in tagline / nav wordmark
- 700 — "obvious" in tagline (font-size 110% of tagline base)
- 700 italic — section titles, contact headline

**Scale — all fluid with clamp(), no fixed px:**
- Tagline: clamp(36px, 6vw, 80px) — "obvious" at 110% of this
- Section titles: clamp(32px, 4vw, 56px)
- Contact headline: clamp(48px, 8vw, 96px)
- Body: clamp(15px, 1.2vw, 17px), line-height 1.75
- Nav: 14px, Instrument Sans 400
- Labels: 11px, letter-spacing 0.12em, uppercase
- Metadata: 13px, Instrument Sans 400
- Tags: 11px, Instrument Sans 400

### Spacing — fluid, base 8, clamp() everywhere
```
8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 72 / 80
```
Never use fixed px for padding or margin on layout elements.

### Responsive — fluid layout, no breakpoints
- Use CSS Grid with auto-fit minmax for all two-column layouts
- When single column: tagline first, photo second — always
- Photo in single column: full width, maintain aspect ratio
- All typography scales with clamp()
- No horizontal scroll at any viewport

---

## NAV
- Fixed top
- Left: "Diego Suarez" Instrument Sans 600 14px #FAF9F6 — " / " in #1A1A1A — "Digital Product Design" Instrument Sans 400 14px #808080
- Right: Work / About / Contact → — Instrument Sans 400 13px #FAF9F6
- Background: transparent → #000000 + border-bottom 1px solid #1A1A1A on scroll
- Transition: 0.3s ease
- Appears after hero animation completes

---

## HERO

### Layout
Two column grid, auto-fit:
- Left (55%): tagline → metadata grid → Proof indicator
- Right (45%): portrait photo, bleeds to right edge of viewport

### Tagline
Three lines:
```
I make
complex products
feel obvious.
```
- "I make" — Instrument Sans 600, #FAF9F6
- "complex" — Instrument Sans 400 italic, #FAF9F6 (interactive — see animations)
- "products" — Instrument Sans 600, #FAF9F6
- "feel" — Instrument Sans 600, #FAF9F6
- "obvious" — Instrument Sans 700, #FAF9F6, 110% font-size
- "." — Instrument Sans 700, #FAF9F6 — static, no color animation, no special treatment

### Photo
- File: /public/images/diego-suarez.png
- Right column, bleeds to absolute right edge of viewport — no margin, no padding right
- Left edge: clean cut, no gradient, no fade, no blur
- object-fit: cover
- No border-radius
- No border
- Ambient light behind photo: div positioned behind image, size 120% of photo dimensions, background: radial-gradient(ellipse at center, rgba(251,111,0,0.28) 0%, transparent 70%), pointer-events: none

### Metadata grid
3×2 grid below tagline, Instrument Sans 400, 13px, #808080:
```
Based in Argentina          15+ years designing for humans     Craft-obsessed
Working remotely            From graphic design to product strategy    Curiosity-driven
```

### Proof indicator
- Text "Proof" — Instrument Sans 400, 13px, #808080, static, no animation
- Arrow below: custom SVG or span that animates (see animations section)
- Centered below the left column content

---

## ANIMATIONS — implement exactly as described, nothing more

### 1. Hero entrance — runs once on load
- 0.3s — "I make": opacity 0→1, y 12→0, duration 0.6s easeOut
- 0.7s — "complex products": opacity 0→1, y 12→0, duration 0.6s easeOut
- 1.1s — "feel obvious.": opacity 0→1, y 12→0, duration 0.6s easeOut
- 1.5s — 400ms pause
- 1.9s — photo fades in: opacity 0→1, y 10→0, duration 0.8s easeOut
- 2.3s — metadata grid: opacity 0→1, staggered 80ms each, duration 0.5s
- 2.7s — Proof indicator: opacity 0→1, duration 0.4s
- 3.0s — nav fades in: opacity 0→1, duration 0.4s

### 2. "complex" hover — self-correcting typography
- Trigger: mouseenter on "complex"
- Plays once per hover, cooldown 2000ms
- Over 200–300ms: individual characters change one at a time, 40–60ms between each
- Substitutions: complx / compl3x / comp|ex / comp!ex / c0mplex / comple×
- Always ends restoring: "complex"
- Same italic style throughout
- NO RGB glitch, NO shaking, NO flashing, NO movement

### 3. Photo — magnetic parallax on mousemove
- On mousemove within hero: photo moves OPPOSITE to cursor direction
- Max displacement: 6–8px on X and Y
- Formula: offset = (cursorPosition / heroSize) * -8
- Lerp factor: 0.08
- On mouseleave: returns to center, transition 0.6s ease-out
- Container: overflow hidden, photo inside moves

### 4. Photo — scroll parallax
- As user scrolls down, photo moves at 0.1x scroll speed (slower than page)
- Photo appears to "stay behind" as content scrolls
- Use Framer Motion useScroll + useTransform
- Subtle — factor 0.1 maximum

### 5. Proof arrow animation
- "Proof" text: completely static
- Arrow below: starts as normal ↓ in #FAF9F6
- Loop animation:
  1. Arrow extends downward: scaleY 1→2, duration 0.4s easeInOut
  2. Color transitions: #FAF9F6 → #FB6F00, simultaneous with extension
  3. Pause 0.3s
  4. Returns to original: scaleY 2→1, color #FB6F00 → #FAF9F6, duration 0.4s
  5. Pause 1.5s
  6. Repeat
- Use transform-origin: top center so it extends downward

### 6. Film grain overlay
- Fixed overlay, entire page, pointer-events: none, z-index 999
- SVG filter: feTurbulence baseFrequency 0.65, fractalNoise, 3 octaves
- Opacity: 0.055
- Background: #FAF9F6 filtered

### 7. Custom cursor
- Hide system cursor: * { cursor: none; }
- Component: <CustomCursor /> at root level
- requestAnimationFrame lerp loop, factor 0.12
- Initialize off-screen at (-100, -100)

States:
- DEFAULT: 8px circle, border 1px solid #FAF9F6, transparent fill, mix-blend-mode: difference
- HOVER PHOTO: expands to 20px, fills #FB6F00, no border, transition 0.2s
- HOVER LINKS/BUTTONS: shrinks to 4px, fills #FAF9F6, no border, transition 0.15s
- CLICK: compresses to 6px for 80ms then returns (mousedown/mouseup)

### Motion rules — non-negotiable
- NO parallax other than photo scroll parallax
- NO cursor trails
- NO bounce or spring physics
- NO additional animations beyond what's listed
- Hover transitions: 0.2s ease
- Nav scroll transition: 0.3s ease

---

## WORK SECTION
- Label: "CRAFT-OBSESSED / CURIOSITY-DRIVEN" — eyebrow style
- Title: "Crafted, tested, improved." — Instrument Sans 700 italic
- Subtitle: "Products used by real people. Crafted through systems thinking, collaboration and iteration."
- Each row: number / thumbnail / title + meta + tags / arrow ↗
- Thumbnail: 16:9, background #0D0D0D, border 1px solid #1A1A1A
- Case 01: [Case Study Title] / [Industry Type · Year] / UX Research × 3
- Case 02: [Case Study Title] / [Industry Type · Year] / UX Research × 3
- Hover states: defined later — do not invent

### NDA Wall
- Background #0D0D0D, border 1px solid #1A1A1A, padding 40px
- Lock icon top left
- Label: "PROTECTED WORK"
- Title: "Some projects deserve a different conversation."
- Description: "Recent projects are available to potential clients and hiring teams. Access details are included in my resume, or simply get in touch."
- Right side: password input + "Unlock" button (#FB6F00 background, #000000 text)
- Below: "Need access? Contact me →"
- Input: password chars display as em dash — (monospace font)
- Input focus: border → #FB6F00
- Input error: border → #FF3B30
- Zero border-radius on input and button

---

## ABOUT SECTION
- Label: "FROM GRAPHIC DESIGN TO PRODUCT STRATEGY" — eyebrow
- Title: "Every step shaped the next." — Instrument Sans 700 italic
- Left column: career timeline
- Right column: body copy + "Also worked with:" logos

### Career timeline
- 2019 — Present / Making Sense · Graphic & Web Designer → Product Designer / "From marketing, websites and visual communication to enterprise products, design systems and AI experiences."
- 2009 — 2019 / Mug, Visual Communication · Co-founder & Digital Designer / "Building brands, websites and long-term client relationships."
- 2017 — 2019 / Perfil View · Project & Brand Experience Coordinator / "Turning ideas into real-world experiences."
- 2008 — 2016 / FM Metro / FM Rock & Pop · Producer / Designer / "Creating experiences across radio, live events and digital media."

### Body copy
"15+ years designing for humans.

I started in graphic design and web long before product design became mainstream.

That broader background taught me that craft matters, systems matter and clarity is something you build.

Great products aren't just functional, they feel obvious."

### Logos
"Also worked with:" + Coca-Cola, Red Bull, PEF logos

---

## CONTACT SECTION
- Label: "BASED IN ARGENTINA / WORKING REMOTELY" — eyebrow
- Body: "Open to building products with teams that value craft, curiosity and clarity."
- Right side: email + copy icon / LinkedIn ↗
- Email: dnsuarez@gmail.com — clicking copy icon copies to clipboard, shows "Copied!" tooltip for 1s
- No mailto link, no form, no input
- LinkedIn: opens in new tab

---

## FOOTER
- Minimal, single row
- Top border: 1px solid #1A1A1A
- Left: "Diego Suarez" Instrument Sans 400 12px #808080
- Right: "© 2025" 12px #1A1A1A

---

## QUALITY
- WCAG 2.1 AA — #FAF9F6 on #000000 passes, maintain for all text
- No lorem ipsum anywhere
- Zero border-radius on structural elements
- #FB6F00 max once per viewport
- No horizontal scroll at any viewport
- Components: /components/ui/ and /components/sections/
- Custom cursor: must work on all interactive elements site-wide