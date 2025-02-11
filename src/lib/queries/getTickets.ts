import { db } from "@/db"
import { tickets } from "@/db/schema"
import { eq } from "drizzle-orm"

/** Retorna um ticket do db se seu id corresponder ao id informado. */
export async function getTickets(
  /** ID do ticket a ser buscado. */
  id: number
) {
  /** Resultado da query que busca tickets no db. */
  const ticket = await db
    .select()
    .from(tickets) // ticket a ser buscado
    .where(eq(tickets.id, id)) // condicional: ID corresponder

  // retornar o cliente encontrado
  return ticket[0]
}
