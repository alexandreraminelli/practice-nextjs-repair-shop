"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form"

/** Opções de dados exibidos no select.  */
type DataObj = {
  /** Identificador. */
  id: string
  /** Descrição. */
  description: string
}

/** Props de `SelectWithLabel`. */
type Props<S> = {
  /** Título do campo. */
  fieldTitle: string
  /** Nome do campo no schema. */
  nameInSchema: keyof S & string
  /** Opções de dados exibidos no select. */
  data: DataObj[]
  /** Classes personalizadas. (opcional) */
  className?: string
}

/**
 *
 */
export function SelectWithLabel<S>(
  { fieldTitle, nameInSchema, data, className, ...props }: Props<S> // props
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

          {/*  */}
          <Select
            {...field} // referência ao campo
            onValueChange={field.onChange} // evento de mudança de valor
          >
            {/* Controlador do formulário. */}
            <FormControl>
              {/* Trigger: botão de seleção */}
              <SelectTrigger
                id={nameInSchema} // id do select
                className={`w-full max-w-xs ${className}`}
              >
                {/* Valor do select */}
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>

            {/* Conteúdo do select */}
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mensagem de erro */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
