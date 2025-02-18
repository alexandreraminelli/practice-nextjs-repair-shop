import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { customers } from "@/db/schema" // tabela de clientes

/** Esquema de validação para inserção de clientes.  */
export const insertCustomerSchema = createInsertSchema(customers, {
  /* validações */
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email("Invalid email address"),
  zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid Zip code."),
  phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number."),
})

/** Esquema de seleção de clientes. */
export const selectCustomerSchema = createSelectSchema(customers)

/** Tipo do esquema de inserção de clientes. */
export type insertCustomerSchemaType = typeof insertCustomerSchema._type

/** Tipo do esquema de seleção de clientes. */
export type selectCustomerSchemaType = typeof selectCustomerSchema._type
