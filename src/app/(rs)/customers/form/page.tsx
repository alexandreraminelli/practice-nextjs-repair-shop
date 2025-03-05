import BackButton from "@/components/BackButton"
import { getCustomer } from "@/lib/queries/getCustomer"
import CustomerForm from "./CustomerForm"

/** Metadados da página. */
export async function generateMetadata(
  { searchParams }: CustomerFormPageProps // string
) {
  // desestruturação dos dados da tabela
  const { customerId } = await searchParams

  // Se abrir formulário de cadastro de cliente
  if (!customerId) return { title: "New Customer" }
  // Se abrir formulário de edição de cliente
  return { title: `Edit Customer #${customerId}` }
}

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
            {/* Botão de voltar */}
            <BackButton variant="default" />
          </>
        )
      }
      /* Se cliente for válido */
      console.log(customer)
      return <CustomerForm customer={customer} /> // formulário de edição
    } else {
      /* Não houver houver parâmetros na URL */

      return <CustomerForm /> // formulário de cadastro
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
