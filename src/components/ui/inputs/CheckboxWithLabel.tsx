"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

/** Props de `CheckboxWithLabel`. */
type Props<S> = {
  /** Título do campo. */
  fieldTitle: string
  /** Nome do campo no schema. */
  nameInSchema: keyof S & string
  /** Mensagem do checkbox. */
  message?: string
}

/**
 * Componente de checkbox com label.
 */
export function CheckboxWithLabel<S>(
  { fieldTitle, nameInSchema, message }: Props<S> // props
) {
  /** Referenciar formulário dentro do componente. */
  const form = useFormContext()

  // Retorno
  return (
    // Campo de formulário
    <FormField
      control={form.control} // controlador do formulário
      name={nameInSchema} // nome do campo no schema
      render={({ field /* referência ao campo */ }) => (
        <FormItem className="w-full flex items-center gap-2">
          {/* Rótulo do formulário */}
          <FormLabel
            htmlFor={nameInSchema}
            // styles:
            className="text-base w/1/3 mt-2"
          >
            {/* Campo de entrada do formulário */}
            {fieldTitle}
          </FormLabel>

          <div className="flex items-center gap-2">
            {/* Campo de entrada do formulário */}
            <FormControl>
              <Checkbox
                id={nameInSchema}
                {...field} // referência ao campo
                checked={field.value} // valor do campo
                onCheckedChange={field.onChange}
              ></Checkbox>
            </FormControl>

            {/* Mensagem */}
            {message}
          </div>

          {/* Mensagem de erro */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
