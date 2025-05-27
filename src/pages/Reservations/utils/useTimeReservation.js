const calculateTimingReservation = (selectedClient, setTempo) => {
    const converter = () => {

        if (!selectedClient) return

        if(selectedClient?.status !== "Confirmado" && selectedClient?.status !== "Recusado") {
            setTempo("00:00:00")
            return
        }

        let dataReservaDoCliente = selectedClient?.data_entrada ?? ""
        let horaReservaDoCliente = selectedClient?.hora_entrada ?? ""

        let dataConvertida = formatarDataHoraParaDate(dataReservaDoCliente, horaReservaDoCliente)
        if (!dataConvertida) return

        let converterData = dataConvertida
        
        // Verifica se as informações de data e hora estão presentes
        if (!dataReservaDoCliente || !horaReservaDoCliente) return

        const tempoAtual = new Date().getTime()
        const diferenca = tempoAtual - converterData

        // Verifica se a diferença é válida
        if (isNaN(diferenca) || diferenca < 0) {
            setTempo("00:00:00")
            return
        }

        // Verifica se a data e hora da reserva é futura
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

    function formatarDataHoraParaDate(dataStr, horaStr) {
        if (!dataStr || !horaStr) return null
    
        // Detecta se o formato é dd/mm/yyyy
        if (dataStr.includes('/')) {
            const partes = dataStr.split('/')
            if (partes.length !== 3) return null
    
            const [dia, mes, ano] = partes
            dataStr = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
        }
    
        // Monta string no formato ISO válido
        const dataISO = `${dataStr} ${horaStr}:00`
        const dataFinal = new Date(dataISO)
    
        return isNaN(dataFinal.getTime()) ? null : dataFinal
    }

    return { converter }
}

export default calculateTimingReservation