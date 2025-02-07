import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "@/components/ui/button"

/** Página de login. */
export default function LoginPage() {
  return (
    <main
      className="h-dvh flex flex-col items-center
        gap-6 p-4
        text-4xl"
    >
      <h1>Repair Shop</h1>
      {/* Botão de login */}
      <Button asChild>
        <LoginLink>Sign In</LoginLink>
      </Button>
    </main>
  )
}
