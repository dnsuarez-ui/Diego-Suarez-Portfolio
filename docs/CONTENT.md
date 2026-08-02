# Content & Copy

All written content for the portfolio. Architecture and rules live in `CLAUDE.md`.

Copy is final unless Diego says otherwise. Claude corrects grammar only — never rewrites voice.

**Tone:** editorial, direct, no fluff. Short sentences. No marketing language, no buzzwords, no hedging. Every word earns its place. Written for someone who reads fast and judges hard.

---

## Home

### Nav
Left: **Diego Suarez** / Digital Product Design
Right: Work · About · Contact →

### Hero

Tagline:
> I make
> *complex* products
> feel **obvious.**

Metadata grid:

| | | |
|---|---|---|
| Based in Argentina | 15+ years designing for humans | Craft-obsessed |
| Working remotely | From graphic design to product strategy | Curiosity-driven |

Scroll indicator: `Proof ↓`

### Work section

Eyebrow: `CRAFT-OBSESSED / CURIOSITY-DRIVEN`
Title: *Crafted, tested, improved.*
Subtitle: Products used by real people. Crafted through systems thinking, collaboration and iteration.

### Protected work

**Locked state**
Label: `PROTECTED WORK` (lock icon)
Title: Some projects deserve a different conversation.
Body: Recent projects are available to potential clients and hiring teams. Access details are included in my resume, or simply get in touch.
Actions: password input + `Unlock` · `Need access? Contact me`

**Unlocked state**
Label: `ACCESS GRANTED` (lock_open_right icon)
Title: You're in. Browse the work.
Body: Additional projects below. Same standard, different stories.
Action: `Lock Access`

**Lockout message** (after 3 failed attempts)
Too many attempts. Try again in 2 hours.

### About section

Eyebrow: `FROM GRAPHIC DESIGN TO PRODUCT STRATEGY`
Title: *Every step shaped the next.*

Timeline:

| Years | Role | Description |
|---|---|---|
| 2019 — Present | **Making Sense** · Graphic & Web Designer → Product Designer | From marketing, websites and visual communication to enterprise products, design systems and AI experiences. |
| 2009 — 2019 | **Mug, Visual Communication** · Co-founder & Digital Designer | Building brands, websites and long-term client relationships. |
| 2017 — 2019 | **Perfil View** · Project & Brand Experience Coordinator | Turning ideas into real-world experiences. |
| 2008 — 2016 | **FM Metro / FM Rock & Pop** · Producer / Designer | Creating experiences across radio, live events and digital media. |

Body copy:
> **15+ years designing for humans.**
>
> I started in graphic design and web long before product design became mainstream.
>
> That broader background taught me that craft matters, systems matter and clarity is something you build.
>
> Great products aren't just functional, they feel obvious.

Logos: *Also worked with:* Coca-Cola · Red Bull · PEF

### Contact

Eyebrow: `BASED IN ARGENTINA / WORKING REMOTELY`
Body: Open to building products with teams that value craft, curiosity and clarity.
Right: dnsuarez@gmail.com (copy icon → tooltip "Copy email" → "Copied!" for 1000ms) · LinkedIn ↗

No mailto, no form.

---

## Case Study 01 — Serveo

**Status:** Public. Never guarded.
**Route:** `/case-study/serveo`

| | |
|---|---|
| Title | Serveo |
| Meta | Hospitality Technology · Food & Beverage · SaaS · 2025 |
| Roles | PRODUCT STRATEGY · BRANDING · UX/UI DESIGN · DESIGN SYSTEM |
| Tools | Figma · FigJam · Claude · Claude Code |

**Overview**

I joined Serveo to design the MVP of an AI-powered hospitality platform from the ground up, covering product strategy, branding, UX/UI, and the design system.

The challenge wasn't simply to automate menu management, but to make a complex workflow feel obvious. Restaurants could publish digital menus in minutes while customers enjoyed a simpler, more predictable experience.

The MVP was intentionally scoped to validate the core experience while laying the foundation for future ordering, content optimization, and business insights.

All work shown is real project work. No portfolio recreations.

**Image sections** (right column, in order)

1. Hero image — brand gradient, no comment
2. **Branding:** Built a flexible identity designed to grow with the product. The brand was created alongside the platform so design and development could evolve together.
3. **Strategy & MVP:** Mapped the product vision, explored the business model, and prioritized the smallest set of features needed to validate the idea.
4. **Wireframes & Validation:** …
5. **Final Design:** …

> Comment leads all end in a colon. Bold lead uses `Bold`, body is Body-3.

---

## Case Study 02 — Rental Modernization

**Status:** Protected (NDA). Guarded on mount.
**Route:** `/case-study/rental-modernization`
**Client anonymization:** never name the company. Always "one of the world's largest car rental companies" or "a global automotive rental platform."

| | |
|---|---|
| Title | A money-leaking problem |
| Meta | Travel · Car Rental · B2C · 2025 |
| Roles | UX/UI DESIGN · INFORMATION ARCHITECTURE · COMMUNICATION STRATEGY |
| Tools | Figma · Miro |

**Overview**

I joined the **Product and Engineering teams** to redesign a fragmented customer journey for **one of the world's largest car rental companies**. Critical information was difficult to find, leaving customers without answers when they needed them most.

The result was **thousands of avoidable support calls every day**. Simple questions like "Where's my reservation number?" or "Where do I catch the shuttle?" overwhelmed the contact center because information was scattered across multiple touchpoints.

Instead of redesigning a screen, **I redesigned how information flows across the customer journey**. A mobile-first strategy combined simplified emails, SMS reminders, a unified reservation hub, and an AI assistant to deliver the right information at the right time through a **consistent brand experience**.

All work shown is real project work. No portfolio recreations.

*Bold spans use `Bold` (Body-3-Semibold): Product and Engineering teams · one of the world's largest car rental companies · thousands of avoidable support calls every day · I redesigned how information flows across the customer journey · consistent brand experience*

**Image sections** (right column, in order)

| # | Asset | Comment |
|---|---|---|
| 1 | `rental-modernization-cover` | — none — |
| 2 | `rental-modernization-analysis` | **Research & Pain Points:** Identified the most frequent customer questions and mapped them as pain points. Those insights became the foundation for a clearer information architecture across every touchpoint. |
| 3 | `rental-modernization-wireframes` | **Wireframes & Reservation Hub:** Mapped the end-to-end experience through wireframes, bringing emails, SMS, and web into a single Reservation Hub. The new structure also created space for upgrades while organizing reservation, payment, and driver information into clear, collapsible sections. |
| 4 | `rental-modernization-chat-bot` | **AI Assistant:** Replaced the traditional help center with an AI-powered assistant capable of answering questions in natural language, reducing friction before customers needed to contact support. |

**Card thumbnail:** `/public/images/case-study/rental-modernization/rental-modernization-thumb.webp`

**Do not publish:** internal cost figures, call center spend, contact volumes, wait times, or projected reduction percentages. The scale is conveyed as "thousands of avoidable support calls every day" — nothing more specific. Business analysis came from Sales and Product; the case study covers the UX contribution only.

---

## Pending — Language toggle (ENG / ESP)

Scoped and designed. Not built. Translations in progress.

**Behavior**
- Lives in the case study top bar, **right** side (breadcrumb is on the left)
- Rendered as explicit `ENG / ESP` text — active in color, inactive in `light-gray`, thin divider. **Not** a physical switch.
- Affects **only** the case study currently being viewed
- Defaults to English
- Does **not** persist — leaving and returning resets to English
- Does **not** affect the home page
- **No URL change.** This is an ephemeral reading aid; Spanish versions should not be indexed or shareable.
- Pure React state, no reload

**Purpose:** help recruiters who read English less comfortably. English remains the primary language.

**Transition:** fade + micro vertical shift with a soft stagger across text blocks (Framer Motion `AnimatePresence`).

**Data shape:** every case study text field changes from a flat array to `{ en: [...], es: [...] }` — overview, image comments, headlines, title, meta. The shell receives the active language and selects. Build as a `LanguageToggle` sub-component plus a language context scoped inside the case study, so every future case study inherits it and none can ship without it.

**Assets stay in English.** These are real US client projects — text inside images is not translated. Only copy.
