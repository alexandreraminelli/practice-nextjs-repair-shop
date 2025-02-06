import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

/** Props */
type Props = {
  /** Ícone do botão. */
  Icon: LucideIcon
  /** Label do botão. */
  label: string
  /** Href pra rota do botão. (opcional) */
  href?: string
}

/**
 * Botão do menu de navegação.
 */
export function NavButton(
  { Icon, label, href }: Props // props
) {
  return (
    <Button
      // acessibilidade e semântica:
      aria-label={label}
      title={label}
      // style:
      variant="ghost"
      size="icon"
      className="rounded-full"
      asChild
    >
      {href ? (
        // Se houver href, renderize um link
        <Link href={href}>
          {/* Ícone */}
          <Icon />
        </Link>
      ) : (
        // Se não houver href, renderize apenas o ícone
        <Icon />
      )}
    </Button>
  )
}
