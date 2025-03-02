import BackButton from "@/components/BackButton"
import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import TicketForm from "./TicketForm"

/** Formulário para cadastro e edição de tickets. */
export default async function TicketFormPage(
  { searchParams }: TicketFormPageProps // string
) {
  try {
    /** Ticket solicitado */
    const { customerId, ticketId } = await searchParams

    // Se cliente for inválido
    if (!customerId && !ticketId) {
      return (
        <>
          {/* Mensagem de erro */}
          <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket form</h2>
          {/* Botão de voltar */}
          <BackButton variant="default" />
        </>
      )
    }

    /* Se houver cliente mas não ticket: exiba create form */
    if (customerId) {
      /** ID do cliente. */
      const customer = await getCustomer(parseInt(customerId))

      /* Se não houver cliente */
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

      /* cliente não está ativo */
      if (!customer.active) {
        return (
          <>
            {/* Mensagem de erro */}
            <h2 className="text-2xl mb-2">Customer ID #{customerId} is not active.</h2>
            {/* Botão de voltar */}
            <BackButton variant="default" />
          </>
        )
      }
      // return ticket form
      console.log(customer)
      return <TicketForm customer={customer} />
    }

    /* Se tiver ticket: exiba edit form */
    if (ticketId) {
      /** ID do ticket. */
      const ticket = await getTicket(parseInt(ticketId))

      // Se não houver ticket
      if (!ticket) {
        return (
          <>
            {/* Mensagem de erro */}
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            {/* Botão de voltar */}
            <BackButton variant="default" />
          </>
        )
      }

      /** Cliente do ticket. */
      const customer = await getCustomer(ticket.customerId)

      // return ticket form
      console.log("ticket: ", ticket)
      console.log("customer: ", customer)
      return <TicketForm customer={customer} ticket={ticket} />
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e // lançar o erro
    }
  }
}
/** Props da página. */
interface TicketFormPageProps {
  /** Parâmetros de pesquisa de um ticket. */
  searchParams: Promise<{ [key: string]: string | undefined }>
}
