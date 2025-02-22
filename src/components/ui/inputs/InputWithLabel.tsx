"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

/** Props de `InputWithLabel`. */
type Props<S> = {
  /** Título do campo. */
  fieldTitle: string
  /** Nome do campo no schema. */
  nameInSchema: keyof S & string
  /** Classes personalizadas. (opcional) */
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

/**
 * Componente de input com label.
 *
 * @param fieldTitle Título do campo.
 * @param nameInSchema Nome do campo no schema.
 * @param className Classes personalizadas. (opcional)
 * @param props Outros props do input.
 *
 * @returns Componente de input com label.
 */
export function InputWithLabel<S>(
  { fieldTitle, nameInSchema, className, ...props }: Props<S> // props
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
        <FormItem>
          {/* Rótulo do formulário */}
          <FormLabel
            htmlFor={nameInSchema}
            // styles:
            className="text-base"
          >
            {/* Campo de entrada do formulário */}
            {fieldTitle}
          </FormLabel>

          {/* Campo de entrada do formulário */}
          <FormControl>
            <Input
              id={nameInSchema}
              // styles:
              className={`w-full max-w-xs 
              disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75
              ${className}`}
              // outros props:
              {...props}
              // referência ao campo
              {...field}
            ></Input>
          </FormControl>

          {/* Mensagem de erro */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
