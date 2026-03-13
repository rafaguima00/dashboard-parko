import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import { Container, ItemReservation, CloseReserve, TopTwo } from "./style"
import TopContent from "./components/top"
import ListConfirmedReserve from "./components/listConfirmed"
import TimingReserve from "./components/timing"
import SelectedReserve from "./components/selectedReserve"
import { theme } from "../../theme/theme"
import GlobalButton from "../../components/Button"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import Top from "../../components/Top"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import { filterByText, filterOpenReservations } from "./utils/filterReservation"
import useReservation from "../../hooks/useReservation"
import { useLocation } from "react-router-dom"
import usePark from "../../hooks/usePark"
import usePriceTable from "../../hooks/usePriceTable"
import useTabelaFixa from "../../hooks/useTabelaFixa"

const Reservations = () => {

    const [text, setText] = useState("")
    const [paymentLines, setPaymentLines] = useState([{ valorPgto: "", valueSelect: "credit_card" }])
    const [trocoCliente, setTrocoCliente] = useState(0)

    const { greenColor } = theme

    const { 
        dataClient, 
        selectedClient, 
        setSelectedClient, 
        reservations,
        unauthorized
    } = useUser()

    const { 
        loading, 
        fetchDebts, 
        fetchReservations, 
        reservationClosure 
    } = useReservation()

    const { fetchPark } = usePark()
    const { fetchPriceTable } = usePriceTable()
    const { fetchTabelaFixa } = useTabelaFixa()

    const location = useLocation()
    const reservationComplete = location.state?.reservationId

    const reservaAberta = filterOpenReservations(reservations)
    const filterReserv = filterByText(reservaAberta, text)

    const title = loading ? <Bounce color="#f4f4f4" /> : "Fechar Reserva"

    useEffect(() => {
        if (reservations.length > 0) {
            const abertas = filterOpenReservations(reservations)
            const filtradas = filterByText(abertas, text)

            if (!selectedClient) {
                const first = filtradas.values().next().value
                setSelectedClient(reservationComplete || first)
            }
        }
    }, [reservations, text, reservationComplete])
    
    useEffect(() => {
        if (dataClient.id_establishment) {
            fetchPark()

            fetchPriceTable()

            fetchTabelaFixa()

            fetchReservations()

            const intervalo = setInterval(() => {
                fetchReservations()
            }, 3000)

            return () => clearInterval(intervalo)
        }
    }, [dataClient])

    useEffect(() => {
        fetchDebts(selectedClient.id_costumer)
    }, [selectedClient])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <TopContent states={{ text, setText }} />
            <ItemReservation>
                <ListConfirmedReserve filterReserv={filterReserv} reservationComplete={reservationComplete} />
                <TimingReserve />
            </ItemReservation>
            <TopTwo>
                <Top children="Reserva Selecionada" font={19} />
            </TopTwo>
            <SelectedReserve
                reservationData={{
                    setTrocoCliente, trocoCliente
                }}
                paymentData={{
                    paymentLines, setPaymentLines
                }}
            />
            <CloseReserve>
                <GlobalButton
                    children={title}
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={e => {
                        reservationClosure(e, selectedClient?.id, paymentLines, trocoCliente)
                    }}
                />
            </CloseReserve>
        </Container>
    )
}

export default Reservations