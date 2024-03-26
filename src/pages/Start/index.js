import { useEffect, useState } from "react";
import { useUser } from "../../context/globalContext";
import { 
    Container, 
    Welcome, 
    Grid
} from "./style";
import ReservationStatus from "./components/reserveStatus";
import InfoReserve from "./components/infoReservation";
import api from "../../services/api/server";
import { jwtDecode } from "jwt-decode";

const Start = () => {

    const { 
        setDataClient,
        dataClient, 
        setPark,
        setColaborators,
        setReservations
    } = useUser();
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

    const loadData = async (id) => {
        await api.get(`/establishments/${id}`)
        .then(response => {
            setPark(response.data[0]);
        })
        .catch(e => {
            console.log(e)
        })
    };

    const listColaborators = async (id) => {
        await api.get(`/colaborators/${id}`)
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
        const token = localStorage.getItem("token");

        if(token) {
            const decoded = jwtDecode(token);
            setDataClient(decoded.user)
        }
    }, []);

    useEffect(() => {
        loadData(dataClient.id_establishment);
        listColaborators(dataClient.id_establishment);
        listReservations(dataClient.id_establishment);
    }, [dataClient]);

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