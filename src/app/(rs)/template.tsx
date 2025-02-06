/**
 * Template da aplicação.
 */
export default async function Template(
  { children }: RSLayout // props
) {
  return (
    <div className="animate-appear">
      {/* Header */}
      {children}
    </div>
  )
}
/** Props de `RSLayout`. */
interface RSLayout {
  /** Páginas filhas. */
  children: React.ReactNode
}
