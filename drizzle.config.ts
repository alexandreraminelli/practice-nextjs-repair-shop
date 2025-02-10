import { defineConfig } from "drizzle-kit"

/** Configurações do Drizzle. */
export default defineConfig({
  schema: "./src/db/schema.ts", // esquema do db
  out: "./src/db/migrations", // pasta onde as migrações são geradas
  dialect: "postgresql", // dialeto do db (PostgreSQL)
  dbCredentials: {
    // credenciais presentes no `.env.local`
    url: process.env.DATABASE_URL!,
  },
})
