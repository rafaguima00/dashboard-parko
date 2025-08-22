import { BiEdit } from "react-icons/bi"
import { ContentInfo, ButtonEdit, Menu, Warning, Hour, ElementLoading, Loading } from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import { formatCurrency } from "../../../utils/FormatCurrency"
import ReadApi from "../../../services/readData"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import api from "../../../services/api/server"

const PriceTable = () => {
    
    const [typeCharge, setTypeCharge] = useState("")

    const { neutralColor, primaryColor, cancelColor } = theme
    const { dataClient, priceTable, tabelaFixa } = useUser()
    const { getPriceTable, getTabelaFixa } = ReadApi()
    
    const navigate = useNavigate()

    const routeScreen = () => {
        return navigate("/settings/table")
    }

    useEffect(() => {
        getPriceTable(dataClient.id_establishment)
        getTabelaFixa(dataClient.id_establishment)
    }, [dataClient])

    useEffect(() => {
        if (priceTable && tabelaFixa) {
            getTypeOfCharge()
        }
    }, [priceTable, tabelaFixa])

    const tempoTolerancia = () => {
        if (priceTable?.tempo_tolerancia == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        if (priceTable?.tempo_tolerancia === 0) {
            return <strong>Não há tempo de tolerância</strong>
        }
            
        return <strong>Tempo de tolerância: {priceTable?.tempo_tolerancia ?? 0} minutos</strong> 
    }

    const getTypeOfCharge = async () => {
        try {
            const response = await api.get(`/establishments/${dataClient.id_establishment}`)
            setTypeCharge(response.data[0].type_of_charge)
        } catch (error) {
            console.log(error)
        }
    }

    const valorHora = () => {
        if (priceTable?.valor_hora == null || tabelaFixa == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        if (typeCharge === "hora_fracao") {
            return formatCurrency(priceTable?.valor_hora, 'BRL')
        }

        if (typeCharge === "tabela_fixa") {
            return formatCurrency(tabelaFixa[0].value, 'BRL')
        }
    }

    return (
        <ContentInfo gridcolumn={3} gridrow={4}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color={neutralColor} />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Valor da hora</Warning>
                <Hour textcolor={primaryColor}>{valorHora()}</Hour>
                <hr/>
                <Warning textcolor={cancelColor}>{tempoTolerancia()}</Warning>
            </Menu>
        </ContentInfo>
    )
}

export default PriceTable