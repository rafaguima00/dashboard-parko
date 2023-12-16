import { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { 
    Container, 
    Welcome, 
    Grid
} from "./style";
import ReservationStatus from "./components/reserveStatus";
import InfoReserve from "./components/infoReservation";

const Start = () => {

    const { dataClient } = useContext(GlobalContext);
    const { username } = dataClient;

    const [selected, setSelected] = useState(1);

    const btReservations = [
        {
            id: 1,
            name: "Pendentes"
        },
        {
            id: 2,
            name: "Confirmadas"
        },
        {
            id: 3,
            name: "Recusadas"
        }
    ]

    return (
        <Container>
            <Welcome>
                Bem-vindo, <strong>{username ? username : "[user_name]"}</strong>
            </Welcome>
            <Grid>
                <ReservationStatus 
                    btReservations={btReservations}
                    selected={selected}
                    setSelected={setSelected}
                />
                <InfoReserve />
            </Grid>
        </Container>
    )
}

export default Start;