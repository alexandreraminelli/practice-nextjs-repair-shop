import { Metadata } from "next"

/** Metadados da página inicial da aplicação. */
export const metadata: Metadata = {
  title: "Home",
}

/**
 * Página inicial da aplicação.
 */
export default function HomeApp() {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  )
}
