import { useEffect, useState } from "react"
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

const RefusedReserve = () => {

    const [open, setOpen] = useState(false)

    const { reservations } = useUser()
    const { primaryColor } = theme

    const [otp, setOtp] = useState("");
    const [numeroSorteado, setNumeroSorteado] = useState(null);

    function sortearNumero() {
        const numero = Math.floor(Math.random() * 10000);

        if (numero >= 0 && numero < 10){
            return "000" + numero
        }

        if (numero >= 10 && numero < 100){
            return "00" + numero
        }

        if (numero >= 100 && numero < 1000){
            return "0" + numero
        }

        return numero
    }

    useEffect(() => {
        const numero = sortearNumero();
        setNumeroSorteado(numero);
    }, []);

    const confirmCode = e => {
        e.preventDefault();
        
        if (numeroSorteado === parseInt(otp)) {
            console.log(true);
        } else {
            console.log(false);
        }
    };

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
                funcao={confirmCode}
            >
                <Confirmation otp={otp} setOtp={setOtp} />
            </Modal>
        </>
    )
}

export default RefusedReserve