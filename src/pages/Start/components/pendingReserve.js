import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";
import { 
    ListBody,
    ElementList,
    ItemList,
    State 
} from "../style";
import api from "../../../services/api/server";
import NoReservation from "./noReserve";

const PendingReserve = () => {

    const { reservations } = useContext(GlobalContext);

    const handleUpdate = async (id) => {
        const findUser = reservations.find(item => item.id === id);

        if(window.confirm(`Deseja confirmar a reserva de ${findUser.name}?`) === true) {
            await api.put(`reservations/${id}`, {
                data_entrada: findUser.data_entrada,
                hora_entrada: findUser.hora_entrada,
                data_saida: findUser.data_saida,
                hora_saida: findUser.hora_saida,
                value: findUser.value,
                status: 2,
                id_vehicle: findUser.id_vehicle
            })
            .then(() => {
                alert("Reserva confirmada com sucesso.")
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <ListBody>
        {
            reservations.filter(item => item.status === "Pendente").length === 0 ? 
            <NoReservation>Nenhuma reserva pendente neste estacionamento.</NoReservation> :
            reservations.filter(item => item.status === "Pendente").map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" checked={false} onClick={() => handleUpdate(item.id)} />
                    <ItemList>{item.hora_entrada}</ItemList>
                    <ItemList>{item.name_vehicle}</ItemList>
                    <ItemList>{item.license_plate}</ItemList>
                    <State></State>
                </ElementList> 
            ))
        }
        </ListBody>
    )
}

export default PendingReserve;