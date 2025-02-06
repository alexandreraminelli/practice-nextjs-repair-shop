import Header from "@/components/Header"

/**
 * Layout da aplicação.
 */
export default async function RSLayout(
  { children }: RSLayout // props
) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <Header />

      {/* Página */}
      <div className="px-4 py-2">{children}</div>
    </div>
  )
}
/** Props de `RSLayout`. */
interface RSLayout {
  /** Páginas filhas. */
  children: React.ReactNode
}
