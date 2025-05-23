import { useUser } from "../../../../../../context/globalContext"
import { FormArea, GroupButton } from "../style"
import GlobalButton from "../../../../../../components/Button"
import FormList from "./formList"
import MissTicket from "../forms/missTicket"
import TheftCostumer from "../forms/theftCostumer"
import TheftHeritage from "../forms/theftHeritageItems"
import api from "../../../../../../services/api/server"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import { useEffect, useState } from "react"
import { theme } from "../../../../../../theme/theme"

const FormOcurrence = () => {

    const [loading, setLoading] = useState(false)

    const { 
        dataClient, 
        formActive, 
        occurrenceItem, 
        setOccurrenceItem, 
        setFormActive,
        setReservations,
        reservations
    } = useUser()
    const { id_establishment } = dataClient
    const { cancelColor, greenColor, primaryColor } = theme

    async function getReservations() {
        await api.get(`/reservations/parking/${dataClient.id_establishment}`)
        .then(res => {
            setReservations(res.data)
        })
        .catch(e => {
            setReservations(e)
        })
    }

    async function handleSave(idOccurrence, e) {
        e.preventDefault()
        setLoading(true)

        await api.post("/occurrence", {
            local: occurrenceItem.local,
            data: occurrenceItem.data,
            numero_comanda: occurrenceItem.num_comanda,
            nome_cliente: occurrenceItem.nome_cliente,
            veiculo: occurrenceItem.veiculo,
            placa_veiculo: occurrenceItem.placa_veiculo,
            cor_veiculo: occurrenceItem.cor_veiculo,
            num_doc: occurrenceItem.num_doc,
            renavam: occurrenceItem.renavam,
            data_entrada: occurrenceItem.data_entrada, 
            hora_entrada: occurrenceItem.hora_entrada,
            value: occurrenceItem.value,
            desc_item: occurrenceItem.desc_item,
            bem_furtado: occurrenceItem.bem_furtado,
            num_bo: occurrenceItem.num_bo,
            id_occurrence: idOccurrence,
            id_establishment: id_establishment
        })
        .then(() => {
            alert("Sucesso")
            setOccurrenceItem({})
            setLoading(false)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
        })
    }
    
    function onBlur(numComanda) {
        if(numComanda) {
            const selecionarComanda = reservations.filter(item => item.id == numComanda)
        
            if(selecionarComanda.length > 0) {
                const dataEntrada = selecionarComanda[0].data_entrada
                const [day, month, year] = dataEntrada.split("/") 

                setOccurrenceItem({
                    ...occurrenceItem,
                    nome_cliente: selecionarComanda[0].name,
                    veiculo: selecionarComanda[0].name_vehicle,
                    cor_veiculo: selecionarComanda[0].color,
                    placa_veiculo: selecionarComanda[0].license_plate,
                    data_entrada: `${year}-${month}-${day}`,
                    hora_entrada: selecionarComanda[0].hora_entrada,
                })
            }
        }
    }

    useEffect(() => {
        if(dataClient.id_establishment) {
            getReservations()
        }
    }, [dataClient])

    return (
        <FormArea>
            {
                // lista de tipos de formulário para ser aberto ao clicar
                formActive === 0 && 
                <FormList 
                    primaryColor={primaryColor}
                />
            } 
            { 
                // Formulário de perda de ticket
                formActive === 1 && 
                <MissTicket onBlur={onBlur} />
            }
            {
                // Formulário de furto de bens do cliente
                formActive === 2 && 
                <TheftCostumer onBlur={onBlur} />
            } 
            {
                // Formulário de Furto de itens do patrimônio
                formActive === 3 && 
                <TheftHeritage />
            }
            <GroupButton>
                <GlobalButton 
                    children="Cancelar" 
                    background={cancelColor} 
                    largura={"100%"}
                    aoPressionar={() => setFormActive(0)}
                />
                <GlobalButton 
                    children={loading ? <Bounce color="#f4f4f4" /> : "Salvar"} 
                    background={greenColor} 
                    largura={"100%"}
                    aoPressionar={e => handleSave(formActive, e)}
                />
            </GroupButton>
        </FormArea>
    )
}

export default FormOcurrence