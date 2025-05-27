import { Timing, View, Name, Clock } from "../style"
import { theme } from "../../../theme/theme"
import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import calculateTimingReservation from "../utils/useTimeReservation"

const TimingReserve = () => {

    const [tempo, setTempo] = useState("00:00:00")

    const { primaryColor } = theme
    const { dataClient, selectedClient } = useUser()
    const { converter } = calculateTimingReservation(selectedClient, setTempo)

    useEffect(() => {
        let intervalo

        if(selectedClient) {
            converter()
            intervalo = setInterval(converter, 1000)

            return () => clearInterval(intervalo)
        }
    }, [selectedClient]) 

    return (
        <Timing background={primaryColor}>
            <Clock>
                <p>Tempo de permanência</p>
                <p>{tempo}</p>
            </Clock>
            <View>
                <Name>Caixa responsável:</Name>
                <Name>{dataClient.colaborator ?? ""}</Name>
            </View>
        </Timing>
    )
}

export default TimingReserve