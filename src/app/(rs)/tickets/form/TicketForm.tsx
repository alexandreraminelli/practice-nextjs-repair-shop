"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CheckboxWithLabel } from "@/components/ui/inputs/CheckboxWithLabel"
import { InputWithLabel } from "@/components/ui/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/ui/inputs/TextAreaWithLabel"
import { type selectCustomerSchemaType } from "@/zod-schemas/customer"
import { insertTicketSchema, type insertTicketSchemaType, type selectTicketSchemaType } from "@/zod-schemas/ticket"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
          className="flex flex-col md:flex-row 
          gap-4 md:gap-8"
        >
          {/* Coluna esquerda */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Título */}
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title" // título do campo
              nameInSchema="title" // nome do campo no schema
            />
            {/* Técnico responsável */}
            <InputWithLabel<insertTicketSchemaType> fieldTitle="Tech" nameInSchema="tech" disabled={true} />

            {/* Checkbox de completado */}
            <CheckboxWithLabel<insertTicketSchemaType> fieldTitle="Completed" nameInSchema="completed" message="Yes" />

            {/* Informações do cliente do ticket */}
            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              {/* Endereço do cliente */}
              <p>{customer.address1}</p>
              {customer.address2 && <p>{customer.address2}</p>}
              <p>
                {customer.city}, {customer.state}
              </p>
              {/* Contato do cliente */}
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Descrição do pedido */}
            <TextAreaWithLabel<insertTicketSchemaType> fieldTitle="Description" nameInSchema="description" className="h-64" />

            <div className="flex gap-2">
              {/* Botão submit */}
              <Button
                type="submit" // tipo de botão: submeter formulário
                // styles:
                className="w-3/4"
                variant="default"
                // accessibility:
                title="Save"
              >
                {/* Texto do botão */}
                Save
              </Button>

              {/* Botão de reset */}
              <Button
                type="button"
                // action: resetar formulário
                onClick={() => form.reset(defaultValues)}
                // styles:
                variant="destructive"
                // accessibility:
                title="Reset"
              >
                {/* Texto do botão */}
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
