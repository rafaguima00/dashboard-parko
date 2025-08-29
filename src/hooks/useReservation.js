import api from "../services/api/server"
import { formatCurrency } from "../utils/FormatCurrency"
import { valueToPay, statusPayment } from "../pages/Reservations/utils/paymentUtils"
import { checkClientDebts } from "../pages/Reservations/utils/checkClientDebts"
import { calculateReservationValue } from "../utils/CalculateReservationValue"
import { useUser } from "../context/globalContext"
import ReadApi from "../services/readData"
import { listReservations, updateReservation } from "../services/crud/reservationsService"
import { createReservation } from "../services/crud/reservationsService"
import { validateReservationClosure } from "../pages/Reservations/utils/validateReservationClosure"
import { unformatCurrency } from "../utils/UnformatCurrency"
import { useState } from "react"

const useReservation = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const { listDividas } = ReadApi()
    const {
        setReservations,
        selectedClient,
        priceTable,
        debts,
        dataClient,
        valorAPagar,
        setValorAPagar,
        valueSelectDebt,
        tabelaFixa,
        changeNeeded
    } = useUser()

    // Informações da reserva selecionada
    const getGridItems = () => ([
        { id: 1, title: "Número reserva", info: selectedClient?.id },
        { id: 2, title: "Placa", info: selectedClient?.license_plate },
        { id: 3, title: "Cliente", info: selectedClient?.name },
        { id: 4, title: "Entrada", info: selectedClient?.hora_entrada },
        { id: 5, title: "Veículo", info: selectedClient?.name_vehicle },
        { id: 6, title: "Saída", info: selectedClient?.hora_saida }
    ])

    // Carregar todas as reservas
    const fetchReservations = async () => {
        try {
            const data = await listReservations(dataClient?.id_establishment)

            setReservations(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(data)) {
                    return data
                }
                return prev
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Criar uma nova reserva
    const addReservation = async (reservation) => {
        try {
            const data = await createReservation(reservation)
            fetchReservations()
            return data
        } catch (error) {
            throw error
        }
    }

    // Atualizar uma reserva (status, horário de entrada, horário de saída, valor a ser pago...)
    const editReservation = async (id, reservation) => {
        try {
            const data = await updateReservation(id, reservation)    
            fetchReservations()
            return data        
        } catch (error) {
            throw error
        }
    }

    // Calcular valor total da reserva selecionada
    const valorTotal = () => {
        const { 
            diferenca, 
            valorDaReservaAtual 
        } = calculateReservationValue(selectedClient, priceTable, tabelaFixa, selectedClient.type_of_charge)
        const { hasDebt } = checkClientDebts(selectedClient, debts)
        const valorAPagarPelaDivida = hasDebt && valorAPagar

        if (selectedClient && diferenca < 0) return formatCurrency(valorDaReservaAtual, 'BRL')

        if (selectedClient) {
            return valorDaReservaAtual + valorAPagarPelaDivida
        }
    }

    // Salvar pagamento no banco de dados (execução após o fecharReserva())
    const registrarPagamento = async (idReservation, trocoCliente, paymentLines) => {
        const { id_costumer, id_vehicle, id_establishment } = selectedClient
        const { hasDebt } = checkClientDebts(selectedClient, debts)

        if (hasDebt) {
            await api.put(`/debts/${id_costumer}`, {
                value: valorAPagar,
                id_establishment: id_establishment,
                payment_method: valueSelectDebt
            })
            .then(() => {
                setValorAPagar("")
                alert("Pagamento de dívida registrado")
            })
            .catch(() => {
                alert("Erro ao quitar dívida")
                return
            })
            .finally(() => {
                listDividas()
                fetchReservations()
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
            status: statusPayment(item.valueSelect),
            value_paid: (unformatCurrency(item.valorPgto) / 100),
            change_to_pay: trocoCliente,
            change_paid: changeNeeded === "no" ? 1 : 0
        }))

        await api.post("/payment-on-db", dadosPagamento)
            .then(() => {
                listReservations()
                alert("Reserva concluída com sucesso!")
            })
            .catch(e => {
                alert("Erro ao salvar pagamento", e)
            })
    }

    const reservationClosure = async (e, id, paymentLines, trocoCliente) => {
        e.preventDefault()
        setLoading(true)

        const clienteAtualizado = {
            ...selectedClient,
            data_saida: selectedClient.data_saida || "",
            hora_saida: selectedClient.hora_saida || ""
        }

        if (selectedClient.parko_app === 0) {
            const { valid, message } = validateReservationClosure({
                selectedClient: clienteAtualizado, 
                paymentLines, 
                valorTotal
            })

            if (!valid) {
                setError(true)
                setMessageError(message)
                setLoading(false)
                return
            }
        }

        const filtrarDivida = paymentLines.filter(item => item.valueSelect === "debit")
        const { 
            id_costumer, name, 
            data_entrada, hora_entrada, 
            data_saida, hora_saida, 
            id_vehicle, id_establishment 
        } = selectedClient

        if (filtrarDivida.length > 0) {
            const calcularDivida = filtrarDivida
                .map(item => unformatCurrency(item.valorPgto)/100)
                .reduce((prev, current) => prev + current, 0)

            await api.post(`/debts`, {
                value: calcularDivida,
                id_costumer: id_costumer,
                id_establishment: dataClient.id_establishment,
                id_reservation: selectedClient.id
            }).catch(e => alert(`erro ao registrar dívida: ${e}`))
        }

        if (window.confirm(`Deseja concluir a reserva de ${name}?`)) {
            try {
                await editReservation(id, {
                    data_entrada,
                    hora_entrada,
                    data_saida,
                    hora_saida,
                    value: valorTotal(),
                    status: 4,
                    id_vehicle,
                    id_establishment
                })
                await registrarPagamento(id, trocoCliente, paymentLines)
            } catch (error) {
                alert("Erro ao concluir reserva", error)
            }
        }

        setError(false)
        setMessageError("")
        setLoading(false)
    }

    return {
        error, 
        loading,
        messageError,
        addReservation, 
        editReservation,
        reservationClosure,
        fetchReservations, 
        getGridItems, 
        registrarPagamento,
        valorTotal
    }
}

export default useReservation