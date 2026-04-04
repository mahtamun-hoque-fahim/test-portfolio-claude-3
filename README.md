# MAHTAMUN Portfolio — CMS

A clean, minimal graphic design portfolio with a built-in CMS. Built with Next.js 14 App Router, Neon (PostgreSQL), Drizzle ORM, NextAuth v5, and Cloudinary.

Live: [test-portfolio-claude-3-hduzehq0p.vercel.app](https://test-portfolio-claude-3-hduzehq0p.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| Auth | NextAuth v5 (credentials — no external service) |
| Media | Cloudinary |
| Email | Resend |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/mahtamun-hoque-fahim/test-portfolio-claude-3
cd test-portfolio-claude-3
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon connection string — [neon.tech](https://neon.tech) |
| `AUTH_SECRET` | Random secret — `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of your password (rounds=12) — see `.env.local.example` for instructions |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary → Settings → API Keys |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary → Settings → Upload → Add upload preset (unsigned) |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | Email address to receive inquiry notifications |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g. `https://yourdomain.com`) |

### 3. Set up the database

```bash
# Push schema to Neon
npm run db:push

# Seed default categories and site settings
npx tsx src/db/seed.ts
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Auth

Authentication is handled entirely by **NextAuth v5** with a credentials provider — no external auth service or dashboard required.

- Admin credentials are stored as environment variables (`ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`)
- Passwords are hashed with bcrypt (12 rounds)
- Sessions use JWT strategy
- `/admin/*` routes are protected via middleware
- All admin API routes verify session server-side

To generate a bcrypt hash for your password:
```bash
npm install -g bcryptjs
node -e "const b = require('bcryptjs'); b.hash('your-password', 12).then(console.log)"
```
Or use [bcrypt-generator.com](https://bcrypt-generator.com) with rounds set to 12.

---

## Project Structure

```
src/
├── auth.ts                     # NextAuth config (credentials provider)
├── middleware.ts               # Protects /admin/* routes
├── app/
│   ├── (public)/               # Public-facing portfolio
│   │   ├── page.tsx            # Home — hero, featured work, services, CTA
│   │   ├── work/               # Work index + project detail [slug]
│   │   ├── about/              # About page
│   │   └── contact/            # Contact form
│   ├── admin/                  # CMS (NextAuth protected)
│   │   ├── page.tsx            # Dashboard with stats
│   │   ├── projects/           # Project list, new, edit
│   │   ├── categories/         # Category management
│   │   ├── media/              # Cloudinary media library
│   │   ├── inquiries/          # Contact form inbox
│   │   └── settings/           # Site settings (hero, about, SEO, social)
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth route handler
│   │   ├── contact/            # Public contact form POST
│   │   └── admin/              # Protected CRUD endpoints
│   ├── sign-in/                # Custom credentials login page
│   ├── sitemap.ts              # Auto-generated XML sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── layout/                 # SiteNav, SiteFooter
│   ├── portfolio/              # WorkGrid, ContactForm, Gallery, RelatedProjects
│   └── admin/                  # AdminSidebar, ProjectForm, ProjectActions,
│                               # MediaLibraryClient, SettingsClient,
│                               # InquiriesClient, CategoriesClient,
│                               # SortableProjectList, SignOutButton
├── db/
│   ├── index.ts                # Neon + Drizzle connection
│   ├── schema/index.ts         # projects, categories, inquiries, site_settings
│   └── seed.ts                 # Default data seed
└── lib/
    ├── queries/                # Data access layer (projects, categories, settings)
    ├── cloudinary.ts           # Cloudinary helpers
    ├── validations.ts          # Zod schemas
    └── utils.ts                # cn, slugify, formatDate
```

---

## CMS Features

### Projects
- Create / edit / delete projects
- Cloudinary image upload (cover + gallery)
- Tags, services, client, year metadata
- Publish / unpublish toggle
- Featured flag (shows on homepage)
- Drag-and-drop sort order

### Categories
- Full CRUD inline editor
- Auto-slug generation
- Linked to projects (set null on delete)

### Media Library
- Grid and list view
- Cloudinary upload widget (multi-upload)
- Copy URL to clipboard
- Delete from Cloudinary

### Inquiries Inbox
- Expandable message view
- Mark read / unread (auto-marks on open)
- One-click reply via email
- Delete

### Site Settings (tabbed editor)
- **Hero** — heading, subheading
- **About** — bio, skills list
- **Contact & Social** — email, location, availability, social links
- **SEO** — meta title, description

---

## Database Commands

```bash
npm run db:push       # Push schema changes to Neon (dev)
npm run db:generate   # Generate migration files
npm run db:migrate    # Run migrations
npm run db:studio     # Open Drizzle Studio (DB browser)
npx tsx src/db/seed.ts  # Re-seed default data
```

---

## Deployment (Vercel)

1. Import repo at [vercel.com](https://vercel.com)
2. Add all env vars in the Vercel dashboard (see table above)
3. Deploy

Required Vercel env vars:
- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_APP_URL`

---

## Design System

See **[DESIGN.md](./DESIGN.md)** for the full design guide — colours, typography, spacing, components, and animation system.

Quick reference:

**Fonts:** Cormorant (display) · DM Sans (body) · DM Mono (labels)

| Token | Value | Use |
|---|---|---|
| `ink` | `#111111` | Primary text |
| `ink-soft` | `#333333` | Body text |
| `ink-muted` | `#666666` | Secondary / captions |
| `paper` | `#FAFAF8` | Page background |
| `paper-warm` | `#F5F3EF` | Card / sidebar backgrounds |
| `paper-border` | `#E8E6E1` | Borders, dividers |
| `accent` | `#C8A96E` | Gold highlight |

---

## Animation System

| Component | Description |
|---|---|
| `ScrollReveal` | Wires IntersectionObserver to `.reveal`, `.reveal-left`, `.reveal-scale` CSS classes |
| `Animate` | Programmatic fade-up wrapper with `delay` and `y` props |
| `AnimatedNumber` | Counts up to a value when scrolled into view |
| `MarqueeStrip` | Seamless infinite horizontal scroll strip |
| `CustomCursor` | Dot + lagged ring cursor (pointer-fine devices only) |
| `ScrollProgress` | Gold accent bar tracking read progress |
| `PageTransition` | Fade + slide on route change |
| `BlurImage` | Progressive blur-up image with skeleton shimmer |

---

## Performance

- AVIF + WebP via `next/image`
- 30-day CDN cache on Cloudinary images
- Immutable cache on `/_next/static/*`
- `removeConsole` in production
- `optimizePackageImports` for `lucide-react` and `date-fns`
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

---

## Roadmap

- [x] Phase 1 — Scaffold, DB schema, public portfolio pages, admin CMS shell
- [x] Phase 2 — About, Contact + Resend email, Media library, Settings editor, Inquiries inbox, Categories, SEO, 404/Error pages
- [x] Phase 3 — Animations, scroll-reveal, custom cursor, marquee, animated stats, OG image generation, performance, security headers
- [x] Phase 4 — Image lightbox gallery, related projects, drag-and-drop sort, granular loading skeletons
- [x] Phase 5 — Migrated from Clerk to NextAuth v5 (self-hosted credentials, no external auth service)
- [ ] Prev / next navigation on project pages
- [ ] Pagination on work index
- [ ] Search / filter by category
- [ ] Dark mode
