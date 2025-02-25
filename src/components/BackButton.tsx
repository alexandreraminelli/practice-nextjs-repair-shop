"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"

/** Botão de voltar. */
export default function BackButton(
  { title = "Go Back", variant, className, ...props }: Props // props
) {
  /** Obter rota do histórico do browser. */
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()} // voltar pra página anterior
      title={title} // título ao passar o mouse
      // style:
      variant={variant}
      className={className}
      {...props}
    >
      {title}
    </Button>
  )
}
/** Props de `BackButton`. */
type Props = {
  title?: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
} & ButtonHTMLAttributes<HTMLButtonElement>
