import { BiEdit } from "react-icons/bi"
import { ContentInfo, ButtonEdit, Menu, Warning, Hour, ElementLoading, Loading } from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useUser } from "../../../context/globalContext"
import { formatCurrency } from "../../../utils/FormatCurrency"
import ReadApi from "../../../services/readData"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

const PriceTable = () => {
    
    const { neutralColor, primaryColor, cancelColor } = theme
    const { dataClient, priceTable } = useUser()
    const { getPriceTable } = ReadApi()
    
    const navigate = useNavigate()

    const routeScreen = () => {
        return navigate("/settings/table")
    }

    useEffect(() => {
        getPriceTable(dataClient.id_establishment)
    }, [dataClient])

    const tempoTolerancia = () => {
        if(priceTable?.tempo_tolerancia == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        if(priceTable?.tempo_tolerancia === 0) {
            return <strong>Não há tempo de tolerância</strong>
        }
            
        return <strong>Tempo de tolerância: {priceTable?.tempo_tolerancia ?? 0} minutos</strong> 
    }

    const valorHora = (valueHour) => {
        if(valueHour == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        return formatCurrency(valueHour, 'BRL')
    }

    return (
        <ContentInfo gridcolumn={3} gridrow={4}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color={neutralColor} />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Valor da hora</Warning>
                <Hour textcolor={primaryColor}>{valorHora(priceTable?.valor_hora ?? "")}</Hour>
                <hr/>
                <Warning textcolor={cancelColor}>{tempoTolerancia()}</Warning>
            </Menu>
        </ContentInfo>
    )
}

export default PriceTable