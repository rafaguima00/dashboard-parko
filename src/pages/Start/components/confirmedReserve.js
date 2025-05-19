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
import { useNavigate } from "react-router-dom"
import Modal from "../../../components/Modal"

const ConfirmedReserve = (props) => {

    const { reservations, park, dataClient } = useUser()
    const { primaryColor, neutralColor } = theme
    const { setLoading, loading, setOpenRefuse, openRefuse } = props.states
    const { listReservations } = props

    const navigate = useNavigate()

    const vagasOcupadas = async (id) => {
        await api.put(`/vagas_ocupadas/${id}`, {
            vagas_ocupadas: park.vagas_ocupadas - 1
        })
        .then(() => {
            console.log("ok")
        })
        .catch(e => {
            console.log(e)
        })
    }

    const handleUpdate = async (id) => {
        const findUser = reservations.find(item => item.id === id)

        if(window.confirm(`Deseja concluir a reserva de ${findUser.name}?`) === true) {
            setLoading(true)

            await api.put(`reservations/${id}`, {
                data_entrada: findUser.data_entrada,
                hora_entrada: findUser.hora_entrada,
                data_saida: findUser.data_saida,
                hora_saida: findUser.hora_saida,
                value: findUser.value,
                status: 4,
                id_vehicle: findUser.id_vehicle
            })
            .then(() => {
                setLoading(false)
                vagasOcupadas(dataClient.id_establishment)
                listReservations()
            })
            .then(() => {
                return navigate("/checkout")
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
        }
    }

    return <>
        <ListBody>
        {
            reservations.filter(item => item.status === "Confirmado").length === 0 ?
            <EmptyMessage>Nenhuma reserva confirmada até o momento.</EmptyMessage> :
            reservations.filter(item => item.status === "Confirmado").map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" checked={true} onClick={() => handleUpdate(item.id)} />
                    <ItemList>{item.hora_entrada}</ItemList>
                    <ItemList>{item.name_vehicle}</ItemList>
                    <ItemList>{item.license_plate}</ItemList>
                    <State cor={primaryColor}></State>
                </ElementList>
            ))
        }
        </ListBody>

        {/* <Modal
            isOpen={openRefuse}
            setOpen={setOpenRefuse}
            title={"Recusar reserva"}
            funcao={e => refuseReserve(e, user)}
            isLoading={loading}
        >
            <Line textcolor={neutralColor}>{`Deseja recusar a reserva de ${user.name}?`}</Line>
        </Modal> */}
    </>
}

export default ConfirmedReserve