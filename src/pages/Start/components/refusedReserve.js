import { useState } from "react";
import { useUser } from "../../../context/globalContext";
import Modal from "../../../components/Modal";
import { 
    ListBody,
    ElementList,
    InputPin,
    ItemList,
    State 
} from "../style";
import Confirmation from "../form/confirmation";
import EmptyMessage from "../../../components/EmptyMessage";

const RefusedReserve = () => {

    const [open, setOpen] = useState(false);

    const { reservations } = useUser();

    return (
        <>
            <ListBody>
            {
                reservations.filter(item => item.status === "Recusado").length === 0 ?
                <EmptyMessage>Nenhuma reserva recusada neste estacionamento.</EmptyMessage> :
                reservations.filter(item => item.status === "Recusado").map(item => (
                    <ElementList key={item.id}>
                        <InputPin onClick={() => setOpen(true)}>PIN</InputPin>
                        <ItemList>{item.hora_entrada}</ItemList>
                        <ItemList>{item.name_vehicle}</ItemList>
                        <ItemList>{item.license_plate}</ItemList>
                        <State></State>
                    </ElementList>
                ))
            }
            </ListBody>
            <Modal
                title={"Confirmação de Saída"}
                maxWidth={"30rem"}
                isOpen={open}
                setOpen={setOpen}
            >
                <Confirmation />
            </Modal>
        </>
    )
}

export default RefusedReserve;