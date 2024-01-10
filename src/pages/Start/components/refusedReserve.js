import { useState } from "react";
import Modal from "../../../components/Modal";
import { refusedReserve } from "../../../mocks/recusadas";
import { 
    ListBody,
    ElementList,
    InputPin,
    ItemList,
    State 
} from "../style";
import Confirmation from "../form/confirmation";

const RefusedReserve = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <ListBody>
            {
                refusedReserve.map(item => (
                    <ElementList key={item.id}>
                        <InputPin onClick={() => setOpen(true)}>PIN</InputPin>
                        <ItemList>{item.clock}</ItemList>
                        <ItemList>{item.vehicle}</ItemList>
                        <ItemList>{item.lisencePlate}</ItemList>
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