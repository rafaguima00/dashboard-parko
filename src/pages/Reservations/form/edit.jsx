import { Form } from "./style"
import { useEffect, useState } from "react"
import { converter } from "../../../utils/ConverterData"
import { useUser } from "../../../context/globalContext"
import FormEditInput from "../components/formEditInput"

const EditModal = (props) => {

    const { setStatus, status, dateTime, setDateTime, formData, setFormData } = props.states
    const { selectedClient } = useUser()
    const { 
        color, 
        data_saida, 
        hora_saida, id, 
        license_plate, 
        name, name_vehicle, 
        parko_app, tel 
    } = selectedClient || {}

    const reservaNaoParko = parko_app === 0
    const statusReserva = {
        Pendente: "Pendente",
        Confirmado: "Confirmado",
        Recusado: "Recusado"
    }

    const { converterData, converterHora } = converter()
    const finalFormating = `${converterData}T${converterHora}`

    const [disabled, setDisabled] = useState(false)
    const [disabledData, setDisabledData] = useState(false)

    const verificarAtividade = () => {
        //data e hora de entrada editável
        if (reservaNaoParko && status === 1) {
            setDisabled(false)
        }

        if (!reservaNaoParko) {
            setDisabledData(true)
        }

        //data e hora de entrada não editável
        if (!reservaNaoParko || status === 2 || status === 3) {
            setDisabled(true)
        }

        if (!reservaNaoParko && hora_saida) {
            const separarData = data_saida.split("/")
            const separarHora = hora_saida.split(":")

            setDateTime(`${separarData[2]}-${separarData[1]}-${separarData[0]}T${separarHora[0]}:${separarHora[1]}`)
        }
    }

    function atualizarStatus() {
        const statusMap = {
            [statusReserva.Pendente]: 1,
            [statusReserva.Confirmado]: 2,
            [statusReserva.Recusado]: 3
        }

        setStatus(statusMap[selectedClient.status] || 0)
    }

    useEffect(() => {
        if (selectedClient) {
            atualizarStatus()
        }
    }, [selectedClient])

    useEffect(() => {
        verificarAtividade()
    }, [status])

    return (
        <Form>
            <FormEditInput label={"N°"} type="text" value={id} disabled />
            <FormEditInput label={"Nome do Cliente"} type="text" largura={"360px"} value={name} disabled={disabledData} />
            <FormEditInput label={"Contato"} type="text" largura={"219px"} value={tel} disabled={disabledData} />
            <FormEditInput label={"Modelo"} type="text" largura={"245px"} value={name_vehicle} disabled={disabledData} />
            <FormEditInput label={"Cor"} type="text" largura={"245px"} value={color} disabled={disabledData} />
            <FormEditInput label={"Placa"} type="text" largura={"245px"} value={license_plate} disabled={disabledData} />
            <FormEditInput 
                label={"Data de Entrada"} 
                type="date" 
                largura={"245px"} 
                value={formData.data_entrada} 
                onChange={e => setFormData({ ...formData, data_entrada: e.target.value })}
                disabled={disabled} 
            />
            <FormEditInput 
                label={"Hora de Entrada"} 
                type="time" 
                largura={"245px"} 
                value={formData.hora_entrada} 
                onChange={e => setFormData({ ...formData, hora_entrada: e.target.value })}
                disabled={disabled} 
            />
            <FormEditInput 
                label={"Hora de Saída"} 
                type="datetime-local" 
                largura={"245px"} 
                value={dateTime} 
                onChange={e => setDateTime(e.target.value)}
                min={finalFormating} 
                disabled={disabledData}
            />
        </Form>
    )
}

export default EditModal