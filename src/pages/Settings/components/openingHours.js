import { BiEdit } from "react-icons/bi"
import { 
    ContentInfo, 
    ButtonEdit,
    Menu,
    Warning,
    Hour,
    ElementLoading,
    Loading
} from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import api from "../../../services/api/server"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

const OpeningHours = () => {

    const { neutralColor, primaryColor, cancelColor } = theme

    const navigate = useNavigate()

    const routeScreen = () => {
        return navigate("/settings/funcionamento")
    }

    const { dataClient } = useUser()

    const [horaAbertura, setHoraAbertura] = useState(null)
    const [horaFechamento, setHoraFechamento] = useState(null)

    const recuperarDados = async () => {
        await api.get(`/hora_funcionamento/${dataClient.id_establishment}`)
        .then(res => {
            setHoraAbertura(res.data[0])
            setHoraFechamento(res.data[0])
        })
        .catch(e => {
            console.log(e)
        })
    }

    const MenuInfo = () => {
        if(horaAbertura?.hora_abertura == null || horaFechamento?.hora_fechamento == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        if(horaAbertura?.hora_abertura && horaFechamento?.hora_fechamento) {
            return <>
                <Menu>
                    <Warning textcolor={neutralColor}>Em funcionamento de <strong>Segunda à Sábado</strong></Warning>
                    <Hour textcolor={primaryColor}>
                        {horaAbertura?.hora_abertura ?? "00:00"}h - {horaFechamento?.hora_fechamento ?? "00:00"}h
                    </Hour>
                    <hr/>
                    <Warning textcolor={cancelColor}><strong>Não funcionamos nos feriados</strong></Warning>
                </Menu>
            </>
        }
    }

    useEffect(() => {
        recuperarDados()
    }, [dataClient])

    return (
        <ContentInfo gridcolumn={"span 2"} gridrow={"span 1"}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <MenuInfo />
        </ContentInfo>
    )
}

export default OpeningHours