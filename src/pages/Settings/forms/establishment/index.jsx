import { ContainerForm } from "../style"
import { theme } from "../../../../theme/theme"
import TopForm from "../../components/topForm"
import FormParking from "./formParking"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useUser } from "../../../../context/globalContext"
import ReadApi from "../../../../services/readData"
import ErrorPage from "../../../Error"
import { unLoggedIn } from "../../../../mocks/errorPage"

const FormEstablishment = () => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = theme
    const { setDataClient, dataClient } = useUser()
    const { listColaborators, listReservations, loadData } = ReadApi()

    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        } else {
            setUnauthorized(true)
            setErrorMsg(unLoggedIn)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)

        if(dataClient.type_colaborator !== "Administrador(a)"){
            setUnauthorized(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])

    if(unauthorized) {
        return <ErrorPage errorMsg={errorMsg} />
    }

    return (
        <ContainerForm>
            <TopForm children={"Meu Estabelecimento"} />
            <FormParking colors={{ neutralColor, primaryColor, cancelColor, greenColor }} />
        </ContainerForm>
    )
}

export default FormEstablishment