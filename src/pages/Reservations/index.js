import { useEffect } from "react";
import { useUser } from "../../context/globalContext";
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
import GlobalButton from "../../components/button";
import api from "../../services/api/server";

const Reservations = () => {

    const { 
        dataClient, 
        selectedClient, 
        setSelectedClient, 
        reservations, 
        debts, 
        setDebts
    } = useUser();
    const { colaborator } = dataClient;
    const { cancelColor, greenColor } = theme;

    const recuperarDividas = async () => {
        await api.get("/debts")
        .then(res => {
            setDebts(res.data);
        })
        .catch(e => {
            console.log(e);
        })
    };

    const getDebtById = () => {
        const findId = debts.find(item => item.id_costumer === selectedClient.id_costumer);
        return findId;
    };

    const debtByIdCostumer = getDebtById();
    const reservaPendente = reservations.filter(item => item.status === "Pendente");

    useEffect(() => {
        recuperarDividas();
        const indexOf = reservaPendente.values().next().value;
        setSelectedClient(indexOf);
    }, []);

    return (
        <Container>
            <ItemReservation>
                <TopContent />
                <ListConfirmedReserve reservaPendente={reservaPendente} />
                <TimingReserve name={colaborator} />
            </ItemReservation>
            <SelectedReserve debts={debts} getDebtById={debtByIdCostumer} />
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