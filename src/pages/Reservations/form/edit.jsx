import { Form, DivInput, Input, Label } from "./style"
import { theme } from "../../../theme/theme"
import { useEffect, useState } from "react"

const EditModal = (props) => {

    const { neutralColor, primaryColor } = theme
    const { 
        selectedClient, 
        setSelectedClient, 
        setStatus,
        dateTime,
        setDateTime
    } = props.states

    const reservaNaoParko = selectedClient.parko_app === 0
    const reservaPendente = selectedClient.status === "Pendente"
    const reservaConfirmada = selectedClient.status === "Confirmado"
    const reservaRecusada = selectedClient.status === "Recusado"

    const date = new Date().getDate()
    const month = new Date().getMonth()+1
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()

    const converterHora = (hour<10 ? "0"+hour : hour) + ":" + (minute<10 ? "0"+minute : minute)
    const converterData = (year) + "-" + (month<10 ? "0"+month : month) + "-" + (date<10 ? "0"+date : date)
    const finalFormating = `${converterData}T${converterHora}`

    const [disabled, setDisabled] = useState(false)

    const verificarAtividade = () => {
        const { data_saida, hora_saida } = selectedClient

        //data e hora de entrada editável
        if(reservaNaoParko && reservaPendente) {
            setDisabled(false)
        }

        //data e hora de entrada não editável
        if(!reservaNaoParko || reservaConfirmada || reservaRecusada) {
            setDisabled(true)
        }

        if(!reservaNaoParko && hora_saida) {
            const separarData = data_saida.split("/")
            const separarHora = hora_saida.split(":")

            setDateTime(`${separarData[2]}-${separarData[1]}-${separarData[0]}T${separarHora[0]}:${separarHora[1]}`)
        }
    }

    function formatarDataHoraParaDate() {
        let dataStr = selectedClient?.data_entrada

        if (!dataStr) return null
    
        // Detectar se o formato é dd/mm/yyyy
        if (dataStr.includes('/')) {
            const partes = dataStr.split('/')
            if (partes.length !== 3) return null
    
            const [dia, mes, ano] = partes
            dataStr = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`

            setSelectedClient({ ...selectedClient, data_entrada: dataStr })
        }
    }

    useEffect(() => {
        verificarAtividade()
    }, [selectedClient])

    useEffect(() => {
        switch(selectedClient.status) {
            case "Pendente" :
                setStatus(1)
                break;
            case "Confirmado" : 
                setStatus(2)
                break;
            case "Recusado" : 
                setStatus(3)
                break;
            default : setStatus(0)
        }

        formatarDataHoraParaDate()
    }, [])

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>N°</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={selectedClient.id}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Cliente</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    largura={"360px"}
                    placeholder="Nome Completo"
                    value={selectedClient.name}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Contato</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="(xx) xxxxx-xxxx"
                    value={selectedClient.tel}
                    disabled
                    largura={"219px"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Modelo</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Modelo do Veículo"
                    largura={"245px"}
                    value={selectedClient.name_vehicle}
                    onChange={e => setSelectedClient({ ...selectedClient, name_vehicle: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cor</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Cor do Veículo"
                    largura={"245px"}
                    value={selectedClient.color}
                    onChange={e => setSelectedClient({ ...selectedClient, color: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Placa</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Placa do Veículo"
                    largura={"245px"}
                    value={selectedClient.license_plate}
                    onChange={e => setSelectedClient({ ...selectedClient, license_plate: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Entrada</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.data_entrada}
                    onChange={e => setSelectedClient({ ...selectedClient, data_entrada: e.target.value })}
                    disabled={disabled}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Entrada</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.hora_entrada}
                    onChange={e => setSelectedClient({ ...selectedClient, hora_entrada: e.target.value })}
                    disabled={disabled}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Saída</Label>
                <Input
                    type="datetime-local"
                    bordercolor={primaryColor}
                    largura={"245px"}
                    value={dateTime}
                    onChange={e => setDateTime(e.target.value)}
                    min={finalFormating}
                />
            </DivInput>
        </Form>
    )
}

export default EditModal