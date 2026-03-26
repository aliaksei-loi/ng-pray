<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guidelines

## Before Writing Code
1. Read relevant Next.js docs in `node_modules/next/dist/docs/` for any Next.js API you're about to use
2. Check existing patterns in the codebase — match the style already in use
3. All user-facing strings must be in Russian

## Component Patterns
- Server Components by default. Add `"use client"` only when needed (hooks, browser APIs, event handlers)
- Use shadcn/ui primitives from `@/components/ui/`
- Apply the liquid-glass design system classes from `globals.css`
- Forms: use React 19 `useActionState` + server actions, or controlled forms for client-side logic

## API Routes
- Always verify auth: `const session = await auth()`
- Validate input with Zod schemas from `@/lib/validators`
- Return proper status codes (401, 400, 404, 500)

## Database
- Import prisma from `@/lib/prisma`
- After changing `schema.prisma`, run: `pnpm exec prisma generate && pnpm exec prisma db push`
- Use transactions for multi-step operations

## Testing Changes
- Run `pnpm build` to verify no type errors or build failures
- Use Playwright MCP to visually verify UI changes in browser
