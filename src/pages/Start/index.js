import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import { Container, Welcome, Grid } from "./style"
import ReservationStatus from "./components/reserveStatus"
import InfoReserve from "./components/infoReservation"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../services/readData"
import api from "../../services/api/server"
import { unLoggedIn } from "../../mocks/errorPage"

const Start = () => {

    const { setDataClient, dataClient, setReservations, park } = useUser()
    const { colaborator } = dataClient
    const { loadData } = ReadApi()

    const [selected, setSelected] = useState(1)

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

    async function listReservations() {
        await api.get(`/reservations/parking/${dataClient.id_establishment}`)
        .then(res => {
            setReservations(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            const user = decoded.user
            setDataClient(user)
        } else {
            throw new Error(unLoggedIn)
        }
    }, [])

    useEffect(() => {
        if(dataClient?.id_establishment) {
            loadData(dataClient?.id_establishment)
        }
    }, [dataClient])

    useEffect(() => {
        if(park) {
            listReservations()

            const intervalo = setInterval(listReservations, 5000)
            return () => clearInterval(intervalo)
        }
    }, [park])

    return (
        <Container>
            <Welcome>
                Bem-vindo, <strong>{colaborator}</strong>
            </Welcome>
            <Grid>
                <ReservationStatus 
                    listReservations={listReservations}
                    btReservations={btReservations}
                    selected={selected}
                    setSelected={setSelected}
                />
                <InfoReserve />
            </Grid>
        </Container>
    )
}

export default Start