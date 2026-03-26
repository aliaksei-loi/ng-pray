@AGENTS.md

# Project: NG Pray (НГ Молитва)

Prayer tracking app with timer, session history, and YouTube music integration.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` syntax) + shadcn/ui (base-nova style)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth v5 (beta) with Credentials provider, JWT sessions
- **Package manager:** pnpm (never npm/yarn)

## Key Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm exec prisma generate    # Regenerate Prisma client
pnpm exec prisma db push     # Push schema changes to DB
pnpm exec prisma migrate dev # Create migration
pnpm exec prisma studio      # Open Prisma Studio GUI
```

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated routes (dashboard, history)
│   ├── (auth)/         # Sign-in, sign-up + server actions
│   ├── api/            # Route handlers (auth, prayer-sessions)
│   ├── globals.css     # Design system (liquid glass theme)
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # shadcn/ui primitives
│   ├── auth/           # Sign-in/up forms
│   ├── layout/         # App shell (header, sidebar, persistent panel)
│   ├── timer/          # Prayer timer components
│   ├── player/         # YouTube player
│   └── sessions/       # Session cards & grouping
├── hooks/              # useTimer (localStorage-persisted)
├── lib/                # prisma client, utils, validators, format, sounds, youtube
├── providers/          # SessionProvider, TimerProvider, SidebarProvider
├── types/              # next-auth.d.ts augmentation
├── auth.ts             # NextAuth config
└── middleware.ts        # Auth middleware for /dashboard, /history
prisma/
└── schema.prisma       # User, Account, Session, PrayerSession models
```

## Conventions

- **Locale:** Russian (`ru-RU`) — all user-facing text is in Russian
- **Design:** Liquid glass / glassmorphism aesthetic ("Vesper Lumina" theme). Custom CSS utilities: `liquid-glass`, `silk-gradient`, `gloss-reflection`
- **Components:** Use shadcn/ui primitives from `@/components/ui/`. Add new ones with `pnpm exec shadcn add <component>`
- **Validation:** Zod v4 for all input validation (auth forms, API payloads)
- **API routes:** Always check auth via `auth()` from `@/auth`. Return appropriate HTTP status codes
- **Path aliases:** `@/*` maps to `./src/*`
- **Prisma:** Use singleton from `@/lib/prisma`. After schema changes, run `prisma generate`

## Environment Variables

```
DATABASE_URL=postgresql://...   # Required — PostgreSQL connection string
```

## Database

PostgreSQL with Prisma. Key models:
- `User` — auth + profile
- `PrayerSession` — startTime, endTime, duration (seconds), optional note
- `Account`, `Session`, `VerificationToken` — NextAuth internals
