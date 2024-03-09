import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalContext";
import { 
    ListBody,
    ElementList,
    ItemList,
    State 
} from "../style";
import api from "../../../services/api/server";
import NoReservation from "./noReserve";

const ConfirmedReserve = () => {

    const { reservations } = useContext(GlobalContext);

    const handleUpdate = async (id) => {
        const findUser = reservations.find(item => item.id === id);

        if(window.confirm(`Deseja recusar a reserva de ${findUser.name}?`) === true) {
            await api.put(`reservations/${id}`, {
                data_entrada: findUser.data_entrada,
                hora_entrada: findUser.hora_entrada,
                data_saida: findUser.data_saida,
                hora_saida: findUser.hora_saida,
                value: findUser.value,
                status: 3,
                id_vehicle: findUser.id_vehicle
            })
            .then(() => {
                alert("Recusação da reserva atualizada.")
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <ListBody>
        {
            reservations.filter(item => item.status === "Confirmado").length === 0 ?
            <NoReservation>Nenhuma reserva confirmada até o momento.</NoReservation> :
            reservations.filter(item => item.status === "Confirmado").map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" checked={true} onClick={() => handleUpdate(item.id)} />
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

export default ConfirmedReserve;