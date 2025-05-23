import api from "../services/api/server"
import { formatCurrency } from "../utils/FormatCurrency"
import { unformatCurrency } from "../utils/UnformatCurrency"
import { validateReservationClosure } from "../pages/Reservations/utils/validateReservationClosure"
import { valueToPay, statusPayment } from "../pages/Reservations/utils/paymentUtils"
import { checkClientDebts } from "../pages/Reservations/utils/checkClientDebts"
import { calculateReservationValue } from "../pages/Reservations/utils/calculateReservationValue"
import { useUser } from "../context/globalContext"

const useReservation = ({ 
    paymentLines, 
    setLoading, 
    setError, 
    setMessageError,
    listDividas
}) => {
    const { 
        setReservations, 
        selectedClient, 
        priceTable, 
        debts, 
        dataClient, 
        valorAPagar, 
        valueSelectDebt
    } = useUser()

    const listReservations = async () => {
        await api.get(`/reservations/parking/${dataClient.id_establishment}`)
        .then(res => {
            setReservations(res.data)
        })
        .catch(e => {
            setReservations(e)
        })
    }

    const valorTotal = () => {
        const { diferenca, valorDaReservaAtual } = calculateReservationValue(selectedClient, priceTable)
        const { hasDebt, valuesDebt } = checkClientDebts(selectedClient, debts)
        const { value } = selectedClient || {}

        if(diferenca < 0 && value) return formatCurrency(value, 'BRL')

        if(selectedClient) {
            if(hasDebt) {
                return formatCurrency(valorDaReservaAtual + (valuesDebt ?? 0), 'BRL')
            }
            return formatCurrency(valorDaReservaAtual, 'BRL')
        }
    }

    const registrarPagamento = async (idReservation, trocoCliente) => {
        const { id_costumer, id_vehicle, id_establishment } = selectedClient
        const { hasDebt, valuesDebt } = checkClientDebts(selectedClient, debts)

        if (hasDebt && valuesDebt === valorAPagar) {
            await api.put(`/debts/${id_costumer}`, {
                value: valorAPagar,
                id_establishment: id_establishment,
                payment_method: valueSelectDebt
            }).then(() => {
                listReservations()
                listDividas()
                alert("Reserva concluída com sucesso!")
            }).catch(e => {
                alert("Erro ao quitar dívida")
            })
            return
        }

        const dadosPagamento = paymentLines.map(item => ({
            id_customer: id_costumer,
            id_vehicle: id_vehicle,
            id_establishment: id_establishment,
            value: valueToPay(item.valueSelect, item.valorPgto, trocoCliente),
            payment_method: item.valueSelect,
            id_reservation: idReservation,
            status: statusPayment(item.valueSelect)
        }))

        await api.post("/payment-on-db", dadosPagamento)
            .then(() => {
                listReservations()
                alert("Reserva concluída com sucesso!")
            }).catch(e => {
                alert("Erro ao salvar pagamento", e)
            })
    }

    const fecharReserva = async (id, e, paymentLines, valorTotal, trocoCliente) => {
        e.preventDefault()
        setLoading(true)

        const clienteAtualizado = {
            ...selectedClient,
            data_saida: selectedClient.data_saida || "",
            hora_saida: selectedClient.hora_saida || ""
        }

        const { valid, message } = validateReservationClosure({
            selectedClient: clienteAtualizado, 
            paymentLines, 
            valorTotal, 
            unformatCurrency
        })

        if (!valid) {
            setError(true)
            setMessageError(message)
            setLoading(false)
            return
        }

        const filtrarDivida = paymentLines.filter(item => item.valueSelect === "debit")
        const { id_costumer, name, data_entrada, hora_entrada, data_saida, hora_saida, id_vehicle, id_establishment } = selectedClient

        if(filtrarDivida.length > 0) {
            const calcularDivida = filtrarDivida
                .map(item => unformatCurrency(item.valorPgto)/100)
                .reduce((prev, current) => prev + current, 0)

            await api.post(`/debts`, {
                value: calcularDivida,
                id_costumer: id_costumer,
                id_establishment: dataClient.id_establishment
            }).catch(e => alert(`erro ao registrar dívida: ${e}`))
        }

        if(window.confirm(`Deseja concluir a reserva de ${name}?`)) {
            await api.put(`/reservations/${id}`, { 
                data_entrada,
                hora_entrada,
                data_saida,
                hora_saida,
                value: unformatCurrency(valorTotal())/100,
                status: 4,
                id_vehicle,
                id_establishment
            }).then(() => {
                registrarPagamento(id, trocoCliente)
            }).catch(e => {
                alert("Erro ao concluir reserva", e)
            })
        }

        setError(false)
        setMessageError("")
        setLoading(false)
    }

    return { valorTotal, fecharReserva, listReservations }
}

export default useReservation