import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import GlobalButton from "../../../../../components/Button"
import { DivButton } from "../../style"
import { useUser } from "../../../../../context/globalContext"
import api from "../../../../../services/api/server"
import { useState } from "react"
import { unformatCurrency } from "../../../../../utils/UnformatCurrency"
import { useNavigate } from "react-router-dom"
import { theme } from "../../../../../theme/theme"

const BottomButton = (props) => {
        
    const [loading, setLoading] = useState(false)
    
    const { dataClient, priceTable } = useUser()
    const { 
        formTable, 
        typeCharge, 
        value, 
        linhas, 
        deletedLines, 
        setDeletedLines 
    } = props.states
    const { cancelColor, greenColor } = theme

    const navigate = useNavigate()

    const screenBack = () => {
        setDeletedLines([])
        return navigate("/settings")
    }

    const updateTypeOfCharge = async (e) => {
        e.preventDefault()

        setLoading(true)

        await api.put(`/charge-establishment/${dataClient.id_establishment}`, {
            type_of_charge: typeCharge
        })
        .then(() => {
            onSave()
        })
        .catch(e => {
            alert("Erro ao trocar tipo de cobrança")
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })

    }

    const onSave = async () => {

        if (!priceTable.id_estacionamento) {

            await api.post("/tabela_preco", { 
                id_estacionamento: dataClient.id_establishment, 
                tempo_tolerancia: value === "yes" ? formTable.tempo_tolerancia : 0, 
                valor_hora: unformatCurrency(formTable.valor_hora)/100, 
                valor_fracao_hora: unformatCurrency(formTable.valor_fracao_hora)/100
            })
            .then(() => {
                alert("Valores salvos com sucesso.")
                screenBack()
            })
            .catch(e => {
                alert(e)
            })

        } else {

            await api.put(`/tabela_preco/${dataClient.id_establishment}`, {
                tempo_tolerancia: value === "yes" ? formTable.tempo_tolerancia : 0,
                valor_hora: unformatCurrency(formTable.valor_hora)/100,
                valor_fracao_hora: unformatCurrency(formTable.valor_fracao_hora)/100
            })
            .then(() => {
                alert("Informações atualizadas")
            })
            .catch(e => {
                alert(e)
            }) 

        }
        
        // Verificar se há linhas novas ainda não inseridas no banco de dados
        const newItems = linhas
            .filter(item => item.id == null)
            .map(item => ({
                id_establishment: item.idEstacionamento,
                primeira_hora: item.valueTime,
                segunda_hora: item.valueTimeTwo,
                value: unformatCurrency(item.valueNumber) / 100
            }))

        if (newItems.length > 0) {
            await api.post("/tabela_fixa", newItems)
                .then(() => {})
                .catch(e => console.log(e))
        }

        // Verificar linhas já existentes no banco de dados
        const existingItems = linhas
            .filter(item => item.id != null)
            .map(item => ({
                id: item.id,
                id_establishment: item.idEstacionamento,
                primeira_hora: item.valueTime,
                segunda_hora: item.valueTimeTwo,
                value: unformatCurrency(item.valueNumber) / 100
            }))

        if (existingItems.length > 0) {
            await api.put(`/tabela_fixa/${dataClient.id_establishment}`, existingItems)
                .then(() => {})
                .catch(e => alert(e))
        }

        if (deletedLines.length > 0) {
            await api.delete("/tabela_fixa", {
                data: deletedLines
            })
            .then(() => {})
            .catch(e => {
                console.log(e)
            })
        }
        
        setLoading(false)
    }

    return <>
        <DivButton marg={"3rem"}>
            <GlobalButton 
                children="Cancelar"
                background={cancelColor}
                largura={"12rem"}
                altura={"2.8rem"}
                aoPressionar={screenBack}
            />
            <GlobalButton 
                children={
                    loading ? 
                    <Bounce color="#f4f4f4" /> : 
                    "Salvar"
                }
                background={greenColor}
                largura={"12rem"}
                altura={"2.8rem"}
                aoPressionar={updateTypeOfCharge}
            />
        </DivButton>
    </>
}

export default BottomButton