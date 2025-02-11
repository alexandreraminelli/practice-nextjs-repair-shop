import { db } from "@/db"
import { customers } from "@/db/schema"
import { eq } from "drizzle-orm"

/** Retorna um cliente do db se seu id corresponder ao id informado. */
export async function getCustomer(
  /** ID do cliente a ser buscado. */
  id: number
) {
  /** Resultado da query que busca clientes no db. */
  const customer = await db
    .select()
    .from(customers) // cliente a ser buscado
    .where(eq(customers.id, id)) // condicional: ID corresponder

  // retornar o cliente encontrado
  return customer[0]
}
