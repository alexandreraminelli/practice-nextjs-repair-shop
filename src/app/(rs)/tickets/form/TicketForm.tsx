"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"
import { insertTicketSchema, type insertTicketSchemaType, type selectTicketSchemaType } from "@/zod-schemas/ticket"

/** Props do formulário. */
type Props = {
  customer: selectCustomerSchemaType
  ticket?: selectTicketSchemaType
}

/** Formulário de tickets. */
export default function TicketForm(
  { customer, ticket }: Props // props
) {
  /** Valores padrão do formulário. */
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  }

  /** Formulário de tickets. */
  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur", // modo de validação: validar ao perder o foco do input
    resolver: zodResolver(insertTicketSchema), // resolutor de validação: zod
    defaultValues, // valores padrão
  })

  /**  */
  async function submitForm(data: insertTicketSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      {/* Cabeçalho do formulário */}
      <header>
        {/* Título do formulário */}
        <h2 className="text-2xl font-bold">
          {/* Há ticket?
           * true: Edit Ticket #123456
           * false: New Ticket Form
           */}
          {ticket?.id ? "Edit" : "New"} Ticket {ticket?.id ? `#${ticket.id}` : "Form"}
        </h2>
      </header>

      {/* Formulário */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          // styles:
          className="flex flex-col sm:flex-row 
          gap-4 sm:gap-8"
        >
          {/* Dados do formulário */}
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  )
}
