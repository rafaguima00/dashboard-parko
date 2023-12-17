import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import {
    Container,
    ItemReservation,
    CloseReserve
} from "./style";
import TopContent from "./components/top";
import ListConfirmedReserve from "./components/listConfirmed";
import TimingReserve from "./components/timing";
import SelectedReserve from "./components/selectedReserve";
import { theme } from "../../theme/theme";
import GlobalButton from "../../components/button/button";

const Reservations = () => {

    const { dataClient } = useContext(GlobalContext);
    const { username } = dataClient;

    const { cancelColor, greenColor } = theme;

    return (
        <Container>
            <ItemReservation>
                <TopContent />
                <ListConfirmedReserve />
                <TimingReserve username={username} />
            </ItemReservation>
            <SelectedReserve />
            <CloseReserve>
                <GlobalButton 
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                />
                <GlobalButton 
                    children="Fechar Reserva"
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                />
            </CloseReserve>
        </Container>
    )
}

export default Reservations;