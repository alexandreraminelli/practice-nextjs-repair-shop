import { NavButton } from "@/components/NavButton"
import { FileIcon, HomeIcon, UsersRoundIcon } from "lucide-react" // ícones
import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle"

/**
 * Cabeçalho do site.
 */
export default function Header() {
  return (
    <header
      className="animate-slide
        bg-background border-b
        sticky top-0 z-20
        h-12 p-2"
    >
      <div
        className="flex items-center justify-between
          h-8 w-full"
      >
        {/* Esquerda */}
        <div className="flex items-center gap-2">
          {/* Link: Home */}
          <NavButton href="/home" label="Home" Icon={HomeIcon} />

          {/* Título do site com link pra homepage */}
          <Link href={"/home"} className="flex justify-center items-center gap-2 ml-0" title="Home">
            <h1
              className=" text-xl font-bold
                max-sm:hidden m-0 mt-1"
            >
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        {/* Direita */}
        <div className="flex items-center">
          {/* Link: Tickets */}
          <NavButton href="/tickets" label="Tickets" Icon={FileIcon} />
          {/* Link: Customers */}
          <NavButton href="/customers" label="Customers" Icon={UsersRoundIcon} />

          {/* Botão de tema */}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
