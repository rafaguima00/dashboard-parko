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
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

const Reservations = () => {

    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

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
            //alert(e.response.data.message)
        })
    }

    const getDebtById = () => {
        if(selectedClient) {
            const findId = debts.find(item => item.id_costumer === selectedClient.id_costumer)
            return findId
        }
    }

    const debtByIdCostumer = getDebtById()

    const reservaAberta = reservations.filter(
        item => item.status === "Pendente" || 
        item.status === "Confirmado" || 
        item.status === "Recusado"
    )

    const filterReserv = reservaAberta.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase())
    )

    const fecharReserva = async (id, e) => {
        e.preventDefault()
        setLoading(true)

        if(window.confirm(`Deseja concluir a reserva de ${selectedClient.name}?`) === true) {
            await api.put(`/reservations/${id}`, { 
                data_entrada: selectedClient.data_entrada, 
                hora_entrada: selectedClient.hora_entrada, 
                data_saida: selectedClient.data_saida, 
                hora_saida: selectedClient.hora_saida, 
                value: selectedClient.value, 
                status: 4, 
                id_vehicle: selectedClient.id_vehicle
            })
            .then(() => {
                alert("Reserva concluída com sucesso!")
            })
            .catch(e => {
                alert("Erro ao concluir reserva", e)
            })
        }

        setLoading(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
        
        if(reservaAberta) {
            const indexOf = reservaAberta.values().next().value
            setSelectedClient(indexOf)
        }

        recuperarDividas()
    }, [])
    
    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)
    }, [dataClient])

    return (
        <Container>
            <ItemReservation>
                <TopContent states={{ text, setText }} />
                <ListConfirmedReserve reservaAberta={filterReserv} />
                <TimingReserve name={colaborator} />
            </ItemReservation>
            <SelectedReserve 
                reservaAberta={reservaAberta} 
                getDebtById={debtByIdCostumer} 
            />
            <CloseReserve>
                <GlobalButton 
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                />
                <GlobalButton 
                    children={loading ? <Bounce color="#f4f4f4" /> : "Fechar Reserva"}
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={e => fecharReserva(selectedClient.id, e)}
                />
            </CloseReserve>
        </Container>
    )
}

export default Reservations