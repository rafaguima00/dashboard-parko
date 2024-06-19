import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import { Container, ItemReservation, CloseReserve } from "./style"
import TopContent from "./components/top"
import ListConfirmedReserve from "./components/listConfirmed"
import TimingReserve from "./components/timing"
import SelectedReserve from "./components/selectedReserve"
import { theme } from "../../theme/theme"
import GlobalButton from "../../components/Button"
import api from "../../services/api/server"
import ReadApi from "../../services/readData"
import { jwtDecode } from "jwt-decode"

const Reservations = () => {

    const [text, setText] = useState("")

    const { 
        setDataClient,
        dataClient, 
        selectedClient, 
        setSelectedClient, 
        reservations, 
        debts, 
        setDebts
    } = useUser()
    const { colaborator } = dataClient
    const { cancelColor, greenColor } = theme

    const { listReservations, loadData, listColaborators } = ReadApi()

    const recuperarDividas = async () => {
        await api.get("/debts")
        .then(res => {
            setDebts(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const getDebtById = () => {
        if(selectedClient) {
            const findId = debts.find(item => item.id_costumer === selectedClient.id_costumer)
            return findId
        }
    }

    const debtByIdCostumer = getDebtById()
    const reservaPendente = reservations.filter(item => item.status === "Pendente")
    const filterReserv = reservaPendente.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase())
    )

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
        
        if(reservaPendente) {
            const indexOf = reservaPendente.values().next().value
            setSelectedClient(indexOf)
        }

        recuperarDividas()
    }, [])

    useEffect(() => {
        console.log(selectedClient)
    }, [selectedClient])
    
    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)
    }, [dataClient])

    return (
        <Container>
            <ItemReservation>
                <TopContent states={{ text, setText }} />
                <ListConfirmedReserve reservaPendente={filterReserv} />
                <TimingReserve name={colaborator} />
            </ItemReservation>
            <SelectedReserve reservaPendente={reservaPendente} getDebtById={debtByIdCostumer} />
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

export default Reservations