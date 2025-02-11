import { getCustomer } from "@/lib/queries/getCustomer"

/** Formulário para cadastro e edição de clientes. */
export default async function CustomerFormPage(
  { searchParams }: CustomerFormPageProps // string
) {
  try {
    // desestruturação dos dados da tabela
    const { customerId } = await searchParams

    // Formulário de edição de clientes
    if (customerId /* houver parâmetros na URL */) {
      /** Cliente solicitado */
      const customer = await getCustomer(parseInt(customerId))

      // Se cliente for inválido
      if (!customer) {
        return (
          <>
            {/* Mensagem de erro */}
            <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
          </>
        )
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      // lançar o erro
      throw e
    }
  }
}
/** Props da página. */
interface CustomerFormPageProps {
  /** Parâmetros de pesquisa de um cliente. */
  searchParams: Promise<{ [key: string]: string | undefined }>
}
