import { Outlet, useNavigate } from "react-router-dom"
import NavigationBar from "./components/navigationBar"
import { 
    Container, 
    Notification, 
    style, 
    styleSelected, 
    textSelected, 
    DataName, 
    Span, 
    RequestLength 
} from "./style"
import { IoNotificationsOutline } from "react-icons/io5"
import { theme } from "../../theme/theme"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import "./style.css"
import GlobalButton from "../../components/Button"
import api from "../../services/api/server"
import { useUser } from "../../context/globalContext"
import { jwtDecode } from "jwt-decode"

const Menu = () => {

    const { primaryColor, cancelColor, greenColor } = theme
    const { dataClient, setDataClient, requests, setRequests } = useUser()
    const navigate = useNavigate()

    const [showNotification, setShowNotification] = useState(false)
    const [time, setTime] = useState(5000)

    function handleLogout() {
        alert("Você saiu da sua conta")
        localStorage.removeItem("token")

        return navigate("/")
    }

    async function updateReservation(item, status) {
        await api.put(`/reservations/${item.id_reservation}`, {
            data_entrada: item.data_entrada,
            hora_entrada: item.hora_entrada,
            data_saida: item.data_saida,
            hora_saida: item.hora_saida,
            value: item.value,
            status: status, 
            id_vehicle: item.id_vehicle
        })
        .then(() => {
            updateReq(item)
            setShowNotification(false)
        })
        .catch(e => {
            console.log("erro ao atualizar reserva", e)
        })
    }

    function filterRequest(data) {
        const request = data.filter(item => item.notified === 0)

        setRequests(request)
    }

    async function verifyRequest() {

        await api.get(`/request_end/${dataClient.id_establishment}`)
        .then(res => {
            filterRequest(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    async function updateReq(item) {
        await api.put("/request_end", [
            {
                id: item.id
            }
        ])
        .then(() => {
            console.log("update request atualizado com sucesso")
        })
        .catch(e => {
            console.log("Erro no update request", e)
        })
    }

    function horarioDeSaida(createdAt) {
        const date = new Date(createdAt)
        const time = date.toTimeString().split(" ")[0]
        return time
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
    }, [])

    useEffect(() => {
        verifyRequest()
        const interval = setInterval(verifyRequest, time)

        return () => clearInterval(interval)
    }, [dataClient.id])

    useEffect(() => {
        if(requests.length >= 1) {
            setTime(1500)
            setShowNotification(true)
        } else {
            setTime(5000)
            setShowNotification(false)
        }
    }, [requests])

    if(dataClient) {
    
        return (
            <Container>
                <NavigationBar 
                    styles={[style, styleSelected]}
                    textSelected={textSelected}
                    handleLogout={handleLogout} 
                />
                <Outlet />
                {(showNotification && requests.length > 0) &&
                    requests.map(item => (
                        <motion.div
                            className="notification-card"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DataName><strong>{item.name}</strong> Acabou de Finalizar a reserva</DataName>
                            <DataName><strong>Carro:</strong> {item.name_vehicle} <strong>Placa:</strong> {item.license_plate}</DataName>
                            <DataName><strong>Horário de saída:</strong> {horarioDeSaida(item.created_at)}</DataName>
                            
                            <div className="notification-buttons">
                                <GlobalButton
                                    children={"Discordar"}
                                    background={cancelColor}
                                    largura={"126px"}
                                    altura={"36px"}
                                    aoPressionar={() => updateReservation(item, 3)}
                                />
                                <GlobalButton
                                    children={"Concordar"}
                                    background={greenColor}
                                    largura={"126px"}
                                    altura={"36px"}
                                    aoPressionar={() => updateReservation(item, 4)}
                                />
                            </div>
                        </motion.div>
                    ))
                }
                <Notification onClick={() => {}}>
                    {requests.length > 0 &&
                        <Span>
                            <RequestLength>{requests.length}</RequestLength>
                        </Span>
                    }
                    <IoNotificationsOutline size={18} color={primaryColor} />
                </Notification>
            </Container>
        )
    }
}

export default Menu