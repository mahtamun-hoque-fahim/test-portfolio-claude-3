# MAHTAMUN Portfolio — Design Guide

A reference for the visual language, design tokens, components, and animation system used across the portfolio. Follow this when building new pages or components to keep the aesthetic consistent.

---

## Philosophy

The design is built around a **editorial / print-inspired** aesthetic — warm paper tones, ink-dark type, generous whitespace, and subtle gold accents. It should feel like a high-quality design studio brochure, not a typical dev portfolio.

Key principles:
- **Restraint over decoration** — add elements only if they carry meaning
- **Typography first** — hierarchy is set through weight, size, tracking, and case — not colour
- **Slow, intentional motion** — animations reveal rather than distract
- **Paper, not screens** — warm off-whites, no pure black or pure white

---

## Fonts

Loaded via Google Fonts. Always use the Tailwind utility classes — never raw font-family strings.

| Role | Family | Tailwind class | Use |
|---|---|---|---|
| Display / Headings | Cormorant | `font-display` | Hero text, section titles, project names |
| Body / UI | DM Sans | `font-body` | Paragraphs, buttons, labels, nav |
| Labels / Code | DM Mono | `font-mono` | Tags, metadata, captions, badges |

**Sizing conventions:**

```tsx
// Hero headline
<h1 className="font-display text-5xl md:text-7xl font-light tracking-tight">

// Section title
<h2 className="font-display text-3xl md:text-4xl font-normal">

// Body paragraph
<p className="font-body text-base text-ink-soft leading-relaxed">

// Label / tag
<span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
```

---

## Colour Palette

All colours are defined as Tailwind tokens in `tailwind.config.ts`. Never use raw hex values in components.

### Ink (text / foreground)

| Token | Hex | Use |
|---|---|---|
| `text-ink` | `#111111` | Primary text, headings |
| `text-ink-soft` | `#333333` | Body copy |
| `text-ink-muted` | `#666666` | Secondary text, captions |
| `text-ink-faint` | `#999999` | Placeholder, disabled |

### Paper (background / surface)

| Token | Hex | Use |
|---|---|---|
| `bg-paper` | `#FAFAF8` | Page background |
| `bg-paper-warm` | `#F5F3EF` | Card backgrounds, sidebar |
| `border-paper-border` | `#E8E6E1` | Borders, dividers, rules |

### Accent (gold)

| Token | Hex | Use |
|---|---|---|
| `accent` | `#C8A96E` | Highlights, active states, decorative lines |
| `accent-light` | `#E8D5A8` | Subtle tints |
| `accent-dark` | `#9C7A3C` | Hover states on accent elements |

**Rule:** Accent is used sparingly — one or two touches per page maximum. It marks emphasis, not decoration.

---

## Spacing & Layout

### Container

```tsx
<div className="max-w-7xl mx-auto px-6 md:px-12">
```

### Section rhythm

```tsx
<section className="py-24 md:py-32">   // Full section
<section className="py-16 md:py-24">   // Compact section
```

### Grid

```tsx
// 3-col project grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 2-col content split
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
```

### Custom spacing tokens

| Token | Value |
|---|---|
| `spacing-18` | 4.5rem |
| `spacing-22` | 5.5rem |
| `spacing-88` | 22rem |
| `spacing-128` | 32rem |

---

## Typography Utilities

These custom classes are defined in `globals.css`:

```css
.label        /* font-mono text-xs uppercase tracking-widest text-ink-muted */
.heading-xl   /* font-display text-5xl md:text-7xl font-light tracking-tight */
.heading-lg   /* font-display text-3xl md:text-4xl */
.body-lg      /* font-body text-lg text-ink-soft leading-relaxed */
```

---

## Components

### Buttons

```tsx
// Primary (filled)
<button className="bg-ink hover:bg-ink-soft text-paper font-body text-sm tracking-wide px-6 py-3 transition-colors">
  Label
</button>

// Ghost (outlined)
<button className="border border-ink text-ink hover:bg-ink hover:text-paper font-body text-sm tracking-wide px-6 py-3 transition-colors">
  Label
</button>

// Text link
<a className="font-body text-sm text-ink underline underline-offset-4 hover:text-accent transition-colors">
  Link
</a>
```

### Cards

```tsx
// Project card
<div className="bg-paper border border-paper-border hover:border-ink-faint transition-colors">
  {/* image */}
  <div className="p-6">
    <span className="label">Category</span>
    <h3 className="font-display text-xl mt-1">Project Title</h3>
  </div>
</div>
```

### Dividers

```tsx
// Hairline rule
<hr className="border-paper-border" />

// Accent rule (use sparingly)
<div className="w-12 h-px bg-accent" />
```

### Badges / Tags

```tsx
<span className="font-mono text-xs bg-paper-warm border border-paper-border px-2 py-0.5 text-ink-muted">
  Tag
</span>
```

---

## Animation System

### Scroll-reveal (CSS classes)

Add these classes to any element. `ScrollReveal.tsx` (mounted in root layout) wires up the IntersectionObserver automatically.

```tsx
<div className="reveal">           // Fade up from below
<div className="reveal-left">      // Fade in from left
<div className="reveal-scale">     // Scale up from 95%
```

Add `data-delay` (ms) to stagger:

```tsx
<div className="reveal" data-delay="0">First</div>
<div className="reveal" data-delay="150">Second</div>
<div className="reveal" data-delay="300">Third</div>
```

### Animate wrapper (programmatic)

```tsx
import { Animate } from "@/components/ui/Animate";

<Animate delay={200} y={32}>
  <YourComponent />
</Animate>
```

Props: `delay` (ms), `y` (px offset, default 24), `threshold` (0–1, default 0.1)

### Animated number counter

```tsx
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

<AnimatedNumber value={50} suffix="+" />
<AnimatedNumber value={4.9} prefix="" suffix=" rating" />
```

### Marquee strip

```tsx
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";

<MarqueeStrip items={["Brand Identity", "Logo Design", "UI/UX"]} speed={25} />
```

### Hover utilities

```tsx
<div className="hover-lift">   // Lifts with shadow on hover
<div className="img-zoom">     // Scales image on hover (wrap around img)
```

### Stagger children

```tsx
<ul className="stagger-children">
  <li>Auto-staggered</li>
  <li>Up to 6 items</li>
</ul>
```

---

## Easing Curves

| Token | Value | Use |
|---|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Most enter animations |
| `ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | Page transitions, slides |

```tsx
<div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
```

---

## Loading States

Use the `.skeleton` class for shimmer placeholders:

```tsx
<div className="skeleton h-64 w-full" />          // Image placeholder
<div className="skeleton h-4 w-3/4 mb-2" />       // Text line
<div className="skeleton h-4 w-1/2" />            // Shorter text line
```

Each route has a dedicated `loading.tsx` — follow the same skeleton shape as the actual content.

---

## OG Images

Auto-generated via `next/og` at request time. Defined in:

- `src/app/opengraph-image.tsx` — site-level (light, grid card)
- `src/app/(public)/work/[slug]/opengraph-image.tsx` — per-project (dark card)

When adding new sections, keep OG images consistent: light background, Cormorant display font, accent gold for highlights.

---

## Admin UI

The admin CMS uses the same design tokens but with a slightly different surface:

- Background: `bg-paper-warm`
- Sidebar: `bg-paper` with `border-r border-paper-border`
- Inputs: `border border-paper-border bg-paper-warm focus:border-ink`
- All inputs and buttons use `rounded-none` (no border radius)
- Tables use `divide-y divide-paper-border`

Admin is intentionally minimal — function over form. Keep it consistent with the public site's palette but avoid any decorative animation.

---

## Do's and Don'ts

**Do:**
- Use `font-display` for anything that should feel editorial or premium
- Add `tracking-widest` + `uppercase` to `font-mono` labels
- Use `transition-colors` (not `transition-all`) for colour-only hovers
- Keep motion durations between 400ms–700ms
- Use `ease-out-expo` for reveal animations

**Don't:**
- Use `rounded-lg` or `rounded-full` anywhere — the design uses sharp corners
- Use pure `#000000` or `#ffffff` — always use `ink` / `paper` tokens
- Add shadows heavier than `shadow-sm` on cards
- Use accent gold for body text or large areas
- Add bounce or spring easing — keep motion editorial and calm
