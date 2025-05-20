import { Container } from "./style"
import Rate from "./components/rate"
import Top from "../../components/Top"
import api from "../../services/api/server"
import { useEffect } from "react"
import { useUser } from "../../context/globalContext"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../services/readData"

const Ratings = () => {

    const { ratings, setRatings, dataClient, setDataClient } = useUser()
    const { loadData } = ReadApi()

    const recuperarDados = async () => {
        await api.get(`/ratings/${dataClient.id_establishment}`)
        .then(res => {
            setRatings(res.data)
        })
        .catch(e => {
            setRatings(e.response.data.error.message)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        recuperarDados()
    }, [dataClient])

    return (
        <Container>
            <Top children="Avaliações" font={19} />
            <Rate ratings={ratings} dataClient={dataClient}/>
        </Container>
    )
}

export default Ratings