import { useEffect } from "react"
import { useUser } from "../../context/globalContext"
import { Container, Welcome, Grid } from "./style"
import ReservationStatus from "./components/reserveStatus"
import InfoReserve from "./components/infoReservation"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import useReservation from "../../hooks/useReservation"
import usePark from "../../hooks/usePark"

const Start = () => {

    const { unauthorized, dataClient, park } = useUser()
    const { colaborator } = dataClient

    const { fetchPark } = usePark()
    const { fetchReservations } = useReservation()

    useEffect(() => {
        if (dataClient?.id_establishment) fetchPark()
    }, [dataClient])

    useEffect(() => {
        if (park) {
            fetchReservations()

            const intervalo = setInterval(fetchReservations, 5000)
            return () => clearInterval(intervalo)
        }
    }, [park])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <Welcome>
                Bem-vindo, <strong>{colaborator}</strong>
            </Welcome>
            <Grid>
                <ReservationStatus />
                <InfoReserve />
            </Grid>
        </Container>
    )
}

export default Start