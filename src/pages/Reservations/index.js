import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import {
    Container,
    ItemReservation,
    BottomButton,
    CloseReserve
} from "./style";
import TopContent from "./components/top";
import ListConfirmedReserve from "./components/listConfirmed";
import TimingReserve from "./components/timing";
import SelectedReserve from "./components/selectedReserve";

const Reservations = () => {

    const { dataClient } = useContext(GlobalContext);
    const { username } = dataClient;

    return (
        <Container>
            <ItemReservation>
                <TopContent />
                <ListConfirmedReserve />
                <TimingReserve username={username} />
            </ItemReservation>
            <SelectedReserve />
            <CloseReserve>
                <BottomButton buttonColor={"#d64d4d"}>Cancelar</BottomButton>
                <BottomButton buttonColor={"#509c76"}>Fechar reserva</BottomButton>
            </CloseReserve>
        </Container>
    )
}

export default Reservations;