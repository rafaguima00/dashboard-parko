import { Outlet } from "react-router-dom"
import NavigationBar from "./components/navigationBar"
import { Container, style, styleSelected, textSelected } from "./style"
import { useState, useEffect } from "react"
import "./style.css"
import { useUser } from "../../context/globalContext"
import useAuth from "../../hooks/useAuth"
import NotificationButton from "./components/notification"
import Request from "./components/request"
import useReservation from "../../hooks/useReservation"

const Menu = () => {

    const { dataClient, requests } = useUser()

    const { generateToken } = useAuth()
    const { verifyRequestEndReservation } = useReservation()

    const [showNotification, setShowNotification] = useState(false)
    const [time, setTime] = useState(5000)

    useEffect(() => {
        generateToken()
    }, [])

    useEffect(() => {
        verifyRequestEndReservation()

        const interval = setInterval(verifyRequestEndReservation, time)

        return () => clearInterval(interval)
    }, [dataClient.id])

    useEffect(() => {
        if (requests.length >= 1) {
            setTime(1500)
            setShowNotification(true)

            return
        }

        setTime(5000)
        setShowNotification(false)
    }, [requests])

    if (dataClient) {
        return (
            <Container>
                <NavigationBar 
                    styles={[style, styleSelected]}
                    textSelected={textSelected}
                />
                <Outlet />
                <Request 
                    setShowNotification={setShowNotification}
                    showNotification={showNotification} 
                    requests={requests} 
                />
                <NotificationButton requests={requests} />
            </Container>
        )
    }
}

export default Menu