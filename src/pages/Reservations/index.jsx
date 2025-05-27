import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import { Container, ItemReservation, CloseReserve, TopTwo } from "./style"
import TopContent from "./components/top"
import ListConfirmedReserve from "./components/listConfirmed"
import TimingReserve from "./components/timing"
import SelectedReserve from "./components/selectedReserve"
import { theme } from "../../theme/theme"
import GlobalButton from "../../components/Button"
import ReadApi from "../../services/readData"
import { jwtDecode } from "jwt-decode"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import Top from "../../components/Top"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import { checkClientDebts } from "./utils/checkClientDebts"
import { filterByText, filterOpenReservations } from "./utils/filterReservation"
import useReservation from "../../hooks/useReservation"

const Reservations = () => {

    const [text, setText] = useState("")
    const [paymentLines, setPaymentLines] = useState([{ valorPgto: "", valueSelect: "credit_card" }])
    const [dateTime, setDateTime] = useState("")
    const [trocoCliente, setTrocoCliente] = useState(0)
    const [unauthorized, setUnauthorized] = useState(false)

    const { greenColor } = theme
    const { 
        setDataClient, dataClient, 
        selectedClient, setSelectedClient, 
        reservations,
        debts
    } = useUser()
    const { hasDebt, valuesDebt } = checkClientDebts(selectedClient, debts)
    const { loadData, listDividas, getPriceTable } = ReadApi()
    const { error, loading, messageError, fetchReservations, reservationClosure } = useReservation()

    const reservaAberta = filterOpenReservations(reservations)
    const filterReserv = filterByText(reservaAberta, text)

    const title = loading ? <Bounce color="#f4f4f4" /> : "Fechar Reserva"

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUnauthorized(true)
            return
        }

        const decoded = jwtDecode(token)
        setDataClient(decoded.user)

        if(decoded.user.id_establishment) {
            fetchReservations(decoded.user.id_establishment)

            const intervalo = setInterval(() => {
                fetchReservations(decoded.user.id_establishment)
            }, 3000)

            return () => clearInterval(intervalo)
        }

        if(reservaAberta) {
            const indexOf = filterReserv.values().next().value
            setSelectedClient(indexOf)
        }
    }, [])
    
    useEffect(() => {
        if(dataClient.id_establishment) {
            loadData(dataClient.id_establishment)
            getPriceTable(dataClient.id_establishment)
        }
    }, [dataClient])

    useEffect(() => {
        listDividas()
    }, [selectedClient])

    if(unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <TopContent states={{ text, setText }} />
            <ItemReservation>
                <ListConfirmedReserve filterReserv={filterReserv} />
                <TimingReserve />
            </ItemReservation>
            <TopTwo>
                <Top children="Reserva Selecionada" font={19} />
            </TopTwo>
            <SelectedReserve 
                reservationData={{
                    valuesDebt, hasDebt,
                    error, messageError,
                    setDateTime, dateTime,
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
                    aoPressionar={e => reservationClosure(e, selectedClient?.id, paymentLines, trocoCliente)}
                />
            </CloseReserve>
        </Container>
    )
}

export default Reservations