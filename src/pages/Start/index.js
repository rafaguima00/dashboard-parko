import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { 
    Container, 
    Welcome, 
    Grid
} from "./style";
import ReservationStatus from "./components/reserveStatus";
import InfoReserve from "./components/infoReservation";
import api from "../../services/api/server";

const Start = () => {

    const { 
        dataClient, 
        setPark,
        setColaborators,
        setReservations
    } = useContext(GlobalContext);
    const { colaborator } = dataClient;

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
    ];

    const loadData = async () => {
        await api.get(`/establishments/${dataClient.id_establishment}`)
        .then(response => {
            setPark(response.data[0]);
        })
        .catch(e => {
            console.log(e)
        })
    };

    const listColaborators = async () => {
        await api.get(`/colaborators/${dataClient.id_establishment}`)
        .then(response => {
            setColaborators(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    };

    const listReservations = async (id) => {
        await api.get(`/reservations/parking/${id}`)
        .then(response => {
            setReservations(response.data)
        })
        .catch(e => {
            console.log(e.response.data.message)
        })
    };


    useEffect(() => {
        loadData();
        listColaborators();
        listReservations(dataClient.id_establishment);
    }, []);

    return (
        <Container>
            <Welcome>
                Bem-vindo, <strong>{colaborator}</strong>
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