import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"

/**
 * Carrega as variáveis de ambiente do arquivo `.env.local` e as torna disponíveis em `process.env`.
 */
config({
  path: ".env.local",
})

/**
 * Cria uma instância do banco de dados Neo4j com base na URL informada na variável de ambiente `DATABASE_URL`.
 */
const sql = neon(process.env.DATABASE_URL!)

/**
 * Cria uma instância do Drizzle, que é uma camada de abstração sobre o banco de dados Neo4j. Ela fornece uma API mais fácil de usar do que a API doNeo4j.
 */
export const db = drizzle(sql)
