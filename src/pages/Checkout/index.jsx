import { useState, useEffect } from "react"
import { useUser } from "../../context/globalContext"
import { Container } from "./style"
import Buttons from "./components/buttons"
import FirstHeader from "./components/firstHeader"
import SecondHeader from "./components/secondHeader"
import SummaryContent from "./components/summaryContent"
import ListReserve from "./components/list"
import { 
    Chart as ChartJS, 
    ArcElement, 
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title 
} from "chart.js"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import useAportes from "../../hooks/useAportes"
import useRetiradas from "../../hooks/useRetiradas"
import useReservation from "../../hooks/useReservation"
import usePark from "../../hooks/usePark"
import useAberturaDeCaixa from "../../hooks/useAberturaDeCaixa"
import { calcularValorDosAportesERetiradas } from "./utils/calcularValorDeAporteRetirada"
import usePayment from "../../hooks/usePayment"
import GraphicsContent from "./components/graphics"

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title)

const Checkout = () => {

    const { 
        aportes,
        dataClient, 
        filtrarPorData,
        park,
        reservations, 
        retiradas,
        unauthorized
    } = useUser()

    const { fetchAportes } = useAportes()
    const { fetchRetiradas } = useRetiradas()
    const { fetchReservations } = useReservation()
    const { fetchPark } = usePark()
    const { fetchCaixa } = useAberturaDeCaixa()
    const { closedReservationsValues, fetchPayments } = usePayment()

    const [text, setText] = useState("")
    const [reservaFechada, setReservaFechada] = useState([])

    const [valoresAporte, valoresRetiradas] = [aportes, retiradas]
        .map(item => (
            calcularValorDosAportesERetiradas(item, filtrarPorData)
        ))

    useEffect(() => {
        if (dataClient.id_establishment) {
            fetchPark()
            fetchRetiradas()
            fetchAportes()
            fetchCaixa()
        }
    }, [dataClient])

    useEffect(() => {
        if (park) {
            fetchReservations()
            fetchPayments()
        }
    }, [park])

    useEffect(() => {
        const fetchData = async () => {
            const data = await closedReservationsValues(text)
            
            setReservaFechada(data)
        }

        fetchData()
    }, [reservations, filtrarPorData, text])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <FirstHeader resumo={{ valoresAporte, valoresRetiradas }} />
            <SummaryContent resumo={{ valoresAporte, valoresRetiradas }} />
            <SecondHeader 
                states={{ text, setText }} 
                resumo={{ valoresAporte, valoresRetiradas }}
            />
            <ListReserve reservaFechada={reservaFechada} />
            <Buttons />
            <GraphicsContent />
        </Container>
    )
}

export default Checkout