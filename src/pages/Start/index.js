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
    ]

    const loadData = async () => {
        await api.get(`/establishments/${dataClient.id_establishment}`)
        .then(response => {
            setPark(response.data[0]);
        })
        .catch(e => {
            console.log(e)
        })
    }

    const listColaborators = async () => {
        await api.get(`/colaborators/${dataClient.id_establishment}`)
        .then(response => {
            setColaborators(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const listReservations = async (id) => {
        await api.get(`/reservations/parking/${id}`)
        .then(response => {
            setReservations(response.data)
        })
        .catch(e => {
            console.log(e.response.data.message)
        })
    }

    const cpfDigitado = "08926761592";
    const formatar = cpfDigitado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');

    const telDigitado = "71996634247";
    const formataTel = telDigitado.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');

    const cepDigitado = "41760200";
    const formataCep = cepDigitado.replace(/(\d{5})(\d{3})/g, '$1-$2');


    useEffect(() => {
        loadData();
        listColaborators();
        listReservations(dataClient.id_establishment);
        console.log(formataCep)
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