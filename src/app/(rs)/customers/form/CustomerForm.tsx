"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"

/**  */
type Props = {
  customer?: selectCustomerSchemaType
}

/** */
export default function CustomerForm(
  { customer }: Props // props
) {
  /** Valores padrão do formulário. */
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    address1: customer?.address1 || "",
    address2: customer?.address2 || "",
    city: customer?.city || "",
    state: customer?.state || "",
    zip: customer?.zip || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    notes: customer?.notes || "",
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
}
