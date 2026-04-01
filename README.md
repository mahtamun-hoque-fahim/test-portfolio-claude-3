# MAHTAMUN Portfolio — CMS

A clean, minimal graphic design portfolio with a built-in CMS. Built with Next.js 14 App Router, Neon (PostgreSQL), Drizzle ORM, Clerk auth, and Cloudinary.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| Auth | Clerk |
| Media | Cloudinary |
| Email | Resend |
| Deployment | Vercel / Cloudflare Pages |

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

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | [neon.tech](https://neon.tech) → New project → Connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [clerk.com](https://clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary → Settings → API Keys |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary → Settings → Upload → Add upload preset (unsigned) |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | Your email address for inquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | Your production URL |

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

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public-facing portfolio
│   │   ├── page.tsx        # Home — hero, featured work, services, CTA
│   │   ├── work/           # Work index + project detail [slug]
│   │   ├── about/          # About page
│   │   └── contact/        # Contact form
│   ├── admin/              # CMS (Clerk protected)
│   │   ├── page.tsx        # Dashboard with stats
│   │   ├── projects/       # Project list, new, edit
│   │   ├── categories/     # Category management
│   │   ├── media/          # Cloudinary media library
│   │   ├── inquiries/      # Contact form inbox
│   │   └── settings/       # Site settings (hero, about, SEO, social)
│   ├── api/                # API routes
│   │   ├── contact/        # Public contact form POST
│   │   └── admin/          # Protected CRUD endpoints
│   ├── sign-in/            # Clerk sign-in page
│   ├── sitemap.ts          # Auto-generated XML sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── layout/             # SiteNav, SiteFooter
│   ├── portfolio/          # WorkGrid, ContactForm
│   └── admin/              # AdminSidebar, ProjectForm, ProjectActions,
│                           # MediaLibraryClient, SettingsClient,
│                           # InquiriesClient, CategoriesClient
├── db/
│   ├── index.ts            # Neon + Drizzle connection
│   ├── schema/index.ts     # projects, categories, inquiries, site_settings
│   └── seed.ts             # Default data seed
└── lib/
    ├── queries/            # Data access layer (projects, categories, settings)
    ├── cloudinary.ts       # Cloudinary helpers
    ├── validations.ts      # Zod schemas
    └── utils.ts            # cn, slugify, formatDate
```

---

## CMS Features

### Projects
- Create / edit / delete projects
- Cloudinary image upload (cover + gallery)
- Tags, services, client, year metadata
- Publish / unpublish toggle
- Featured flag (shows on homepage)
- Sort order control

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

## Deployment

### Vercel (recommended)
1. Import repo in [vercel.com](https://vercel.com)
2. Add all env vars in Vercel dashboard
3. Deploy — it just works

### Cloudflare Pages
> Note: Some server-only packages may require `edge` runtime adjustments.
1. Connect repo in Cloudflare Pages
2. Build command: `npm run build`
3. Output: `.next`
4. Add env vars

---

## Design System

**Fonts:** Cormorant (display/headings) + DM Sans (body) + DM Mono (labels/code)

**Palette:**
| Token | Value | Use |
|---|---|---|
| `ink` | `#111111` | Primary text |
| `ink-soft` | `#333333` | Body text |
| `ink-muted` | `#666666` | Secondary text |
| `paper` | `#FAFAF8` | Background |
| `paper-warm` | `#F5F3EF` | Card backgrounds |
| `paper-border` | `#E8E6E1` | Borders, dividers |
| `accent` | `#C8A96E` | Gold accent, highlights |

---

## Phase Roadmap

- [x] **Phase 1** — Scaffold, DB schema, public portfolio pages, admin CMS shell
- [x] **Phase 2** — About, Contact + Resend email, Media library, Settings editor, Inquiries inbox, Categories, SEO, 404/Error pages
- [ ] **Phase 3** — Animations, transitions, OG image generation, performance audit, Cloudflare deployment config
