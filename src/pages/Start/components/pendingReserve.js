import { useUser } from "../../../context/globalContext"
import { 
    ListBody,
    ElementList,
    ItemList,
    State, 
    Line
} from "../style"
import api from "../../../services/api/server"
import EmptyMessage from "../../../components/EmptyMessage"
import { theme } from "../../../theme/theme"
import Modal from "../../../components/Modal"
import { useState } from "react"

const PendingReserve = (props) => {

    const { reservations, park, dataClient } = useUser()
    const { primaryColor, neutralColor } = theme
    const { setOpen, open, setOpenRefuse, openRefuse } = props.states

    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)

    const vagasOcupadas = async (id) => {
        await api.put(`/vagas_ocupadas/${id}`, {
            vagas_ocupadas: park.vagas_ocupadas + 1
        })
        .then(() => {
            return "ok"
        })
        .catch(e => {
            return e
        })
    }

    const getReservation = async (id) => {
        const findUser = reservations.find(item => item.id === id)
        setUser(findUser)

        if(user) {
            setOpen(true)
        }
    }

    const confirmarReserva = async (e, user) => {
        const { 
            id, 
            data_entrada, 
            hora_entrada,
            data_saida,
            hora_saida,
            value,
            id_vehicle
        } = user

        e.preventDefault()
        setLoading(true)

        await api.put(`reservations/${id}`, {
            data_entrada: data_entrada,
            hora_entrada: hora_entrada,
            data_saida: data_saida,
            hora_saida: hora_saida,
            value: value,
            status: 2,
            id_vehicle: id_vehicle
        })
        .then(() => {
            vagasOcupadas(dataClient.id_establishment)
            alert("Reserva confirmada com sucesso.")
        })
        .catch(e => {
            alert("Erro ao confirmar reserva", e)
        })

        setLoading(false)
        setOpen(false)
    }

    const showMessageRefuse = (e) => {
        e.preventDefault()
        setOpen(false)
        setOpenRefuse(true)
    }

    const refuseReserve = async (e, user) => {
        const { 
            id, 
            data_entrada, 
            hora_entrada,
            value,
            id_vehicle
        } = user

        e.preventDefault()
        setLoading(true)

        await api.put(`reservations/${id}`, {
            data_entrada: data_entrada,
            hora_entrada: hora_entrada,
            data_saida: "",
            hora_saida: "",
            value: value,
            status: 3,
            id_vehicle: id_vehicle
        })
        .then(() => {
            alert("Reserva recusada.")
        })
        .catch(e => {
            console.log("Erro ao recusar reserva", e)
        })

        setLoading(false)
        setOpenRefuse(false)
    }

    return <>
        <ListBody>
        {
            reservations.filter(item => item.status === "Pendente").length === 0 ? 
            <EmptyMessage>Nenhuma reserva pendente neste estacionamento.</EmptyMessage> :
            reservations.filter(item => item.status === "Pendente").map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" checked={false} onClick={() => getReservation(item.id)} />
                    <ItemList>{item.hora_entrada}</ItemList>
                    <ItemList>{item.name_vehicle}</ItemList>
                    <ItemList>{item.license_plate}</ItemList>
                    <State cor={primaryColor}></State>
                </ElementList> 
            ))
        }
        </ListBody>
        
        <Modal
            isOpen={open}
            setOpen={setOpen}
            title={"Confirmar reserva"}
            funcao={e => confirmarReserva(e, user)}
            aoCancelar={showMessageRefuse}
            isLoading={loading}
        >
            <Line textcolor={neutralColor}>{`Deseja confirmar a reserva de ${user.name}?`}</Line>
        </Modal>

        <Modal
            isOpen={openRefuse}
            setOpen={setOpenRefuse}
            title={"Recusar reserva"}
            funcao={e => refuseReserve(e, user)}
            isLoading={loading}
        >
            <Line textcolor={neutralColor}>{`Deseja recusar a reserva de ${user.name}?`}</Line>
        </Modal>
    </>
}

export default PendingReserve