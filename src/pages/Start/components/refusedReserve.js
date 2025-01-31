import { useState } from "react"
import { useUser } from "../../../context/globalContext"
import Modal from "../../../components/Modal"
import { 
    ListBody,
    ElementList,
    InputPin,
    ItemList,
    State 
} from "../style"
import Confirmation from "../form/confirmation"
import EmptyMessage from "../../../components/EmptyMessage"
import { theme } from "../../../theme/theme"
import api from "../../../services/api/server"

const RefusedReserve = () => {

    const [open, setOpen] = useState(false)

    const { reservations } = useUser()
    const { primaryColor } = theme

    const [otp, setOtp] = useState("")
    const [idReservation, setIdReservation] = useState(null)

    function openModal(item) {
        setIdReservation(item)
        setOpen(true)
    }

    async function updateStatusReservation(reserv) {
        const { id, data_entrada, hora_entrada, data_saida, hora_saida, value, id_vehicle } = reserv

        await api.put(`/reservations/${id}`, { 
            data_entrada: data_entrada, 
            hora_entrada: hora_entrada, 
            data_saida: data_saida, 
            hora_saida: hora_saida, 
            value: value, 
            status: 4, 
            id_vehicle: id_vehicle 
        })
        .then(() => {
            setOtp("")
            setOpen(false)
            alert("Reserva concluída")
        })
        .catch(e => {
            alert(e.response.data.message)
        })
    }

    async function verifyReservation(e) {
        e.preventDefault()

        await api.post("/verify-code", {
            id_reservation: idReservation.id, 
            code: Number(otp)
        })
        .then(() => {
            updateStatusReservation(idReservation)
        })
        .catch(e => {
            alert(e.response.data.message)
        })
    }

    return (
        <>
            <ListBody>
            {
                reservations.filter(item => item.status === "Recusado").length === 0 ?
                <EmptyMessage>Nenhuma reserva recusada neste estacionamento.</EmptyMessage> :
                reservations.filter(item => item.status === "Recusado").map(item => (
                    <ElementList key={item.id}>
                        <InputPin onClick={() => openModal(item)}>PIN</InputPin>
                        <ItemList>{item.hora_entrada}</ItemList>
                        <ItemList>{item.name_vehicle}</ItemList>
                        <ItemList>{item.license_plate}</ItemList>
                        <State cor={primaryColor}></State>
                    </ElementList>
                ))
            }
            </ListBody>
            <Modal
                title={"Confirmação de Saída"}
                maxWidth={"30rem"}
                isOpen={open}
                setOpen={setOpen}
                funcao={e => verifyReservation(e)}
            >
                <Confirmation otp={otp} setOtp={setOtp} />
            </Modal>
        </>
    )
}

export default RefusedReserve