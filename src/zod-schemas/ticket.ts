import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { tickets } from "@/db/schema" // tabela de tickets
import { z } from "zod"

/** */
export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.title.min(1, "Title is required"),
  description: (schema) => schema.description.min(1, "Description is required"),
  tech: (schema) => schema.tech.email("Invalid email address"),
})

/** Esquema de validação para seleção de tickets. */
export const selectTicketSchema = createSelectSchema(tickets)

/** Tipo do esquema de inserção de tickets. */
export type insertTicketSchemaType = typeof insertTicketSchema._type

/** Tipo do esquema de seleção de tickets. */
export type selectTicketSchemaType = typeof selectTicketSchema._type
