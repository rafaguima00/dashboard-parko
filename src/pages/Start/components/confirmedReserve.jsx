import { useUser } from "../../../context/globalContext"
import { ListBody, ElementList, ItemList, State } from "../style"
import EmptyMessage from "../../../components/EmptyMessage"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"

const ConfirmedReserve = (props) => {

    const { reservations } = useUser()
    const { primaryColor } = theme

    const navigate = useNavigate()

    const handleUpdate = async (id) => {
        const findUser = reservations.find(item => item.id === id)

        if (window.confirm(`Deseja concluir a reserva de ${findUser.name}?`) === true) {
            return navigate("/reservations", {
                state: {
                    reservationId: findUser
                }
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
    </>
}

export default ConfirmedReserve