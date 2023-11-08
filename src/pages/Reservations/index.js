import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import {
    Container,
    Content,
    BottomButton
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
            <Content>
                <TopContent />
                <ListConfirmedReserve />
                <TimingReserve username={username} />
            </Content>
            <SelectedReserve />
            <Content>
                <BottomButton>Cancelar</BottomButton>
                <BottomButton>Fechar reserva</BottomButton>
            </Content>
        </Container>
    )
}

export default Reservations;