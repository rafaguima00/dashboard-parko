import {
    Timing,
    View,
    Name,
    Clock
} from "../style"
import { theme } from "../../../theme/theme"
import { useEffect, useState } from "react"

const TimingReserve = (props) => {

    const [tempo, setTempo] = useState("00:00:00")

    const { primaryColor } = theme
    const { colaborator, selectedClient } = props.state

    const converter = () => {
        if (!selectedClient) return

        if(selectedClient?.status !== "Confirmado") {
            setTempo("00:00:00")
            return
        }
        
        let dataReservaDoCliente = selectedClient?.data_entrada ?? ""
        let horaReservaDoCliente = selectedClient?.hora_entrada ?? ""
        let converterData = new Date(dataReservaDoCliente+" "+horaReservaDoCliente).getTime()
        
        // Verificar se as informações de data e hora estão presentes
        if (!dataReservaDoCliente || !horaReservaDoCliente) return

        const tempoAtual = new Date().getTime()
        const diferenca = tempoAtual - converterData

        // Verificar se a diferença é válida
        if (isNaN(diferenca) || diferenca < 0) return

        // Verificar se a data e hora da reserva é futura
        if(converterData > tempoAtual) {
            setTempo("00:00:00")
            return
        }

        let horas = Math.floor(diferenca / (1000 * 60 * 60))
        let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
        let segundos = Math.floor((diferenca % (1000 * 60)) / 1000)
        
        let form = (horas < 10 ? "0"+horas : horas) + 
            ":" + 
            (minutos < 10 ? "0"+minutos : minutos) + 
            ":" + 
            (segundos < 10 ? "0"+segundos : segundos)

        setTempo(form)
    }

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
                <Name>{colaborator ? colaborator : "[user_name]"}</Name>
            </View>
        </Timing>
    )
}

export default TimingReserve