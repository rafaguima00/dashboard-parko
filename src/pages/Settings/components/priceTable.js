import { BiEdit } from "react-icons/bi"
import { 
    ContentInfo, 
    ButtonEdit,
    Menu,
    Warning,
    Hour
} from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import api from "../../../services/api/server"
import { useEffect } from "react"
import { useUser } from "../../../context/globalContext"
import { formatCurrency } from "../../../services/formatCurrency"
import ReadApi from "../../../services/readData"

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
    }, [priceTable])

    const tempoTolerancia = () => {
        if(priceTable !== undefined) {
            if(priceTable.tempo_tolerancia === null) {
                return <strong>Não há tempo de tolerância</strong>
            } else {
                return <strong>Tempo de tolerância: {priceTable?.tempo_tolerancia ?? 0} minutos</strong>
            }
        } else {
            return ""
        }
    }

    const tempo = tempoTolerancia()

    const valorHora = (valueHour) => {
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
                <Warning textcolor={cancelColor}>{tempo}</Warning>
            </Menu>
        </ContentInfo>
    )
}

export default PriceTable