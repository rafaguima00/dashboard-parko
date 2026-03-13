import { Form } from "./style"
import { useEffect, useState } from "react"
import { converter } from "../../../utils/ConverterData"
import { useUser } from "../../../context/globalContext"
import FormEditInput from "../components/formEditInput"
import LoadingScreen from "../../../components/Loading"

const EditModal = (props) => {

    const { setStatus, status, dateTime, setDateTime, formState, dispatch } = props.states
    const { selectedClient } = useUser()
    const { data_saida, hora_saida, id, parko_app } = selectedClient || {}

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
    const [loading, setLoading] = useState(true)

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

    function carregarInformacoes() {
        if (selectedClient?.data_entrada.includes('/')) {
            let dataStr

            const partes = selectedClient?.data_entrada.split('/')
            if (partes.length !== 3) return null
    
            const [dia, mes, ano] = partes
            dataStr = `${ano}-${mes}-${dia}`

            dispatch({ type: "change", field: "name", value: selectedClient.name })
            dispatch({ type: "change", field: "tel", value: selectedClient.tel })
            dispatch({ type: "change", field: "name_vehicle", value: selectedClient.name_vehicle })
            dispatch({ type: "change", field: "color", value: selectedClient.color })
            dispatch({ type: "change", field: "license_plate", value: selectedClient.license_plate })
            dispatch({ type: "change", field: "data_entrada", value: dataStr })
            dispatch({ type: "change", field: "hora_entrada", value: selectedClient.hora_entrada })
        }

        setLoading(false)
    }

    useEffect(() => {
        carregarInformacoes()
    }, [])

    useEffect(() => {
        if (selectedClient) {
            atualizarStatus()
        }
    }, [selectedClient])

    useEffect(() => {
        verificarAtividade()
    }, [status])

    return <>
        {loading && <LoadingScreen />}
        <Form>
            <FormEditInput label={"N°"} type="text" value={id} disabled />
            <FormEditInput 
                label={"Nome do Cliente"} 
                type="text" 
                largura={"360px"} 
                value={formState.name} 
                onChange={e => dispatch({ type: "change", field: "name", value: e.target.value })}
                disabled={disabledData} 
            />
            <FormEditInput 
                label={"Contato"} 
                type="text" 
                largura={"219px"} 
                value={formState.tel} 
                onChange={e => dispatch({ type: "change", field: "tel", value: e.target.value })}
                disabled={disabledData} 
            />
            <FormEditInput 
                label={"Modelo"} 
                type="text" 
                largura={"245px"} 
                value={formState.name_vehicle} 
                onChange={e => dispatch({ type: "change", field: "name_vehicle", value: e.target.value })}
                disabled={disabledData} 
            />
            <FormEditInput 
                label={"Cor"} 
                type="text" 
                largura={"245px"} 
                value={formState.color} 
                onChange={e => dispatch({ type: "change", field: "color", value: e.target.value })}
                disabled={disabledData} 
            />
            <FormEditInput 
                label={"Placa"} 
                type="text" 
                largura={"245px"} 
                value={formState.license_plate} 
                onChange={e => dispatch({ type: "change", field: "license_plate", value: e.target.value })}
                disabled={disabledData} 
            />
            <FormEditInput 
                label={"Data de Entrada"} 
                type="date" 
                largura={"245px"} 
                value={formState.data_entrada} 
                disabled={disabled} 
            />
            <FormEditInput 
                label={"Hora de Entrada"} 
                type="time" 
                largura={"245px"} 
                value={formState.hora_entrada} 
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
    </>
}

export default EditModal