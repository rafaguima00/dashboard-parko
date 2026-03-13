import { Container } from "./style"
import Rate from "./components/rate"
import Top from "../../components/Top"
import { useEffect } from "react"
import { useUser } from "../../context/globalContext"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import usePark from "../../hooks/usePark"
import useRatings from "../../hooks/useRatings"

const Ratings = () => {

    const { dataClient, unauthorized } = useUser()

    const { fetchPark } = usePark()
    const { fetchRatings } = useRatings()

    useEffect(() => {
        if (dataClient.id_establishment) {
            fetchPark()
            fetchRatings()
        }
    }, [dataClient])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <Top children="Avaliações" font={19} />
            <Rate />
        </Container>
    )
}

export default Ratings