import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core" // data types para banco de dados
import { relations } from "drizzle-orm" // relações entre tabelas

/** Tabela de clientes. */
export const customers = pgTable(
  "customers", // nome da tabela
  // colunas (nomes e data types)
  {
    id: serial("id").primaryKey(), // chave primária
    // nome:
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    // contact:
    email: varchar("email").unique().notNull(),
    phone: varchar("phone").unique().notNull(),
    // address:
    address1: varchar("address1").notNull(),
    address2: varchar("address2"),
    city: varchar("city").notNull(),
    state: varchar("state", { length: 2 }).notNull(),
    zip: varchar("zip", { length: 10 }).notNull(),
    // info
    notes: text("notes"), // anotações
    active: boolean("active").notNull().default(true), // clientes antigos não são deletados, mas marcados com `active: false`
    createAt: timestamp("created_at").notNull().defaultNow(), // data e hora de criação do cliente (padrão: agora)
    updateAt: timestamp("updated_at") // data e hora de atualização do cliente
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()), // valor atualizado automaticamente ao editar a tupla
  }
)

/** Tabela de tickets. */
export const tickets = pgTable(
  "tickets", // nome da tabela
  // colunas (nomes e data types)
  {
    id: serial("id").primaryKey(), // chave primária
    // FKs:
    customerId: integer("customer_id")
      .notNull()
      .references(() => customers.id), // refere a coluna `id` da tabela `customers`
    // content:
    title: varchar("title").notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    // técnico que resolve o pedido:
    tech: varchar("tech").notNull().default("unassigned"),
    // historical:
    createAt: timestamp("created_at").notNull().defaultNow(), // data e hora de criação do cliente (padrão: agora)
    updateAt: timestamp("updated_at") // data e hora de atualização do cliente
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()), // valor atualizado automaticamente ao editar a tupla
  }
)

// Relações entre tabelas
/** Relações da tabela `customers`. */
export const customersRelations = relations(
  customers, // tabela
  ({ many }) => ({
    /** Um cliente tem muitos tickets. */
    tickets: many(tickets),
  })
)
/** Relações da tabela `tickets`. */
export const ticketsRelations = relations(tickets, ({ one }) => ({
  /** Um ticket pertence a um cliente. */
  customer: one(customers, {
    fields: [tickets.customerId], // campo `customerId` na tabela `tickets`
    references: [customers.id], // campo `id` na tabela `customers`
  }),
}))
