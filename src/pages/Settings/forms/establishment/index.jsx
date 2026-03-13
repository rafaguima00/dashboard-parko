import { ContainerForm } from "../style"
import { theme } from "../../../../theme/theme"
import TopForm from "../../components/topForm"
import FormParking from "./formParking"
import { useEffect, useState } from "react"
import { useUser } from "../../../../context/globalContext"
import ErrorPage from "../../../Error"
import usePark from "../../../../hooks/usePark"
import useColaborators from "../../../../hooks/useColaborators"

const FormEstablishment = () => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = theme

    const { dataClient } = useUser()
    const { fetchPark } = usePark()
    const { fetchColaborators } = useColaborators()

    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        fetchPark()
        fetchColaborators()

        if (dataClient.type_colaborator !== "Administrador(a)"){
            setUnauthorized(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])

    if (unauthorized) {
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