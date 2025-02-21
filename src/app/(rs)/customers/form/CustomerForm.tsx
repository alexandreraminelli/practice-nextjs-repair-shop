"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"
import { InputWithLabel } from "@/components/ui/inputs/InputWithLabel"

/** Props do formulário de clientes. */
type Props = {
  customer?: selectCustomerSchemaType
}

/** */
export default function CustomerForm(
  { customer }: Props // props
) {
  /** Valores padrão do formulário. */
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  }

  /** Formulário de clientes. */
  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur", // modo de validação: validar ao perder o foco do input
    resolver: zodResolver(insertCustomerSchema), // resolutor de validação: zod
    defaultValues, // valores padrão
  })

  /** Enviar o formulário. */
  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data) // visualização no terminal
  }

  // Componente
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      {/* Cabeçalho do formulário */}
      <header>
        {/* Título do formulário */}
        <h2 className="text-2xl font-bold">{customer?.id ? "Edit" : "New"} Customer Form</h2>
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
            {/* Inputs do formulário */}
            {/* Primeiro nome */}
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name" // título do campo
              nameInSchema="firstName" // nome do campo no schema
            />
            {/* Sobrenome */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" />

            {/* Endereço 1 */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 1" nameInSchema="address1" />
            {/* Endereço 2 */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 2" nameInSchema="address2" />
            {/* Cidade */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" />
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-4 w-full max-w-xs"></div>

          {/* Dados do formulário */}
          {/* <p>{JSON.stringify(form.getValues())}</p> */}
        </form>
      </Form>
    </div>
  )
}
