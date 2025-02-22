"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { TextareaHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

/** Props de `InputWithLabel`. */
type Props<S> = {
  /** Título do campo. */
  fieldTitle: string
  /** Nome do campo no schema. */
  nameInSchema: keyof S & string
  /** Classes personalizadas. (opcional) */
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 *
 */
export function TextAreaWithLabel<S>(
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
          {/* Rótulo do campo */}
          <FormLabel
            htmlFor={nameInSchema}
            // styles:
            className="text-base mb-2"
          >
            {/* Campo de entrada do formulário */}
            {fieldTitle}
          </FormLabel>

          {/* Campo de área de texto */}
          <FormControl>
            <Textarea
              id={nameInSchema}
              {...props} //  outros props
              {...field} // referência ao campo
              // styles:
              className={className}
            ></Textarea>
          </FormControl>

          {/* Mensagem de erro */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
