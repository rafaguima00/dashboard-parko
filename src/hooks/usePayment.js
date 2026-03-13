import { useUser } from "../context/globalContext"
import { readPayments } from "../services/crud/paymentService"

const usePayment = () => {

    const { 
        dataClient, 
        filtrarPorData,
        reservations,
        resumoVendas,
        setResumoVendas 
    } = useUser()

    const fetchPayments = async () => {
        const data = await readPayments(dataClient.id_establishment)

        setResumoVendas(data)
    }

    const closedReservationsValues = async (text) => {
        try {
            const reservasFechadas = reservations.filter(
                item =>
                    item.status === "Finalizado" &&
                    item.data_saida === filtrarPorData
            )

            const filterReserv = reservasFechadas.filter(
                item =>
                    item.name.toLowerCase().includes(text.toLowerCase()) ||
                    item.license_plate.toLowerCase().includes(text.toLowerCase()) ||
                    item.id == text
            )

            if (resumoVendas.length > 0) {
                const reservasComPagamentos = filterReserv.map(item => {
                    const pagamentosDaReserva = resumoVendas.filter(
                        p => p.id_customer === item.id_costumer &&
                        p.payment_method === "money" &&
                        p.change_paid === 0
                    )

                    const changeToPay = pagamentosDaReserva.map(p => p.change_to_pay)

                    const somarValores = changeToPay.reduce((prev, current) => (
                        prev + current
                    ), 0)

                    const procurarCreditosDaReserva = pagamentosDaReserva.find(pgto => pgto.id_reservation === item.id)

                    return {
                        ...item,
                        pagamentos: pagamentosDaReserva,
                        creditos_do_cliente: somarValores,
                        creditos_da_reserva: procurarCreditosDaReserva?.change_to_pay ?? 0
                    }
                })

                console.log(reservasComPagamentos)
                return reservasComPagamentos
            }
        } catch (error) {
            console.log("Erro ao carregar créditos do cliente", error)
            return []
        }
    }

    return { closedReservationsValues, fetchPayments }
}

export default usePayment