import { Metadata } from "next"
import Image from "next/image"

/** Metadados da página 404. */
export const metadata: Metadata = {
  title: "Page Not Found",
}

/**
 * Página 404 Not Found principal do app.
 */
export default function NotFound() {
  return (
    <div className="px-2 w-full ">
      <main
        className="mx-auto py-4 gap-4
        flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          src="/images/not-found.png"
          alt="A sad computer"
          priority
          title="Page Not Found"
          // styles:
          className="m-0 rounded-xl"
          width={300}
          height={300}
          sizes="300px"
        />
      </main>
    </div>
  )
}
