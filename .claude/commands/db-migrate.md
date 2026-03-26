Run a Prisma migration. If a migration name is provided as $ARGUMENTS, use it. Otherwise, ask for one.

Steps:
1. Read `prisma/schema.prisma` to understand current state
2. Run `pnpm exec prisma migrate dev --name <migration_name>`
3. Run `pnpm exec prisma generate` to regenerate the client
4. Report the result
