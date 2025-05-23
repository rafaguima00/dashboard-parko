import api from "../../../services/api/server"
import { calculateReservationValue } from "./calculateReservationValue"

export const updateReservation = ({ 
    selectedClient, 
    setSelectedClient, 
    setLoading, 
    priceTable,
    setDateTime,
    setOpenEdit
}) => {

    const { valorDaReservaAtual } = calculateReservationValue(selectedClient, priceTable)

    const handleUpdate = async (id, e, listReservations, status, dateTime) => {
        e.preventDefault()
        setLoading(true)

        const converter = dateTime.split("T")

        await api.put(`reservations/${id}`, {
            data_entrada: selectedClient.data_entrada,
            hora_entrada: selectedClient.hora_entrada,
            data_saida: converter[0],
            hora_saida: converter[1],
            value: valorDaReservaAtual,
            status: status,
            id_vehicle: selectedClient.id_vehicle
        })
        .then(() => {
            alert("Reserva atualizada com sucesso.")
            setSelectedClient(prev => ({
                ...prev,
                data_saida: converter[0],
                hora_saida: converter[1]
            }))
            listReservations()
            setDateTime("")
            setOpenEdit(false)
        })
        .catch(e => {
            alert(e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return { handleUpdate }
}