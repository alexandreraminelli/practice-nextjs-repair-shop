"use client"

import { Button } from "@/components/ui/button"
import { CheckboxWithLabel } from "@/components/ui/inputs/CheckboxWithLabel"
import { Form } from "@/components/ui/form"
import { InputWithLabel } from "@/components/ui/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/ui/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/ui/inputs/TextAreaWithLabel"
import { StatesArray } from "@/constants/StatesArray"
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs" // importar o hook de autenticação do Kinde
import { useForm } from "react-hook-form"

/** Props do formulário de clientes. */
type Props = {
  customer?: selectCustomerSchemaType
}

/** */
export default function CustomerForm(
  { customer }: Props // props
) {
  // Hook de autenticação do Kinde
  const { getPermission, isLoading } = useKindeBrowserClient()
  const isManager = !isLoading && getPermission("manager")?.isGranted // permissão de gerente

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
    active: customer?.active ?? true,
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
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `#${customer.id}` : "Form"}
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
          {/* Inputs do formulário divididos em 2 colunas */}

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
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
            {/* Estado */}
            <SelectWithLabel<insertCustomerSchemaType> fieldTitle="State" nameInSchema="state" data={StatesArray} />
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Zip Code */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Zip Code" nameInSchema="zip" />

            {/* E-mail */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" />
            {/* Telefone */}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" />

            {/* Notas e observações */}
            <TextAreaWithLabel<insertCustomerSchemaType> fieldTitle="Notes" nameInSchema="notes" className="h-40" />

            {/* Se cliente está ativo */}
            {isLoading ? ( // se estiver carregando a permissão
              <p>Loading...</p> // exibir msg de carregamento
            ) : (
              isManager /* se for gerente: exibe o checkbox */ && <CheckboxWithLabel<insertCustomerSchemaType> fieldTitle="Active" nameInSchema="active" message="Yes" />
            )}

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

          {/* Dados do formulário */}
          {/* <p>{JSON.stringify(form.getValues())}</p> */}
        </form>
      </Form>
    </div>
  )
}
