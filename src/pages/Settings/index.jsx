import { Container } from "./style"
import Establishment from "./components/establishment"
import Colaborators from "./components/colaborators"
import PriceTable from "./components/priceTable"
import OpeningHours from "./components/openingHours"
import Top from "../../components/Top"
import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import ErrorPage from "../Error"
import usePark from "../../hooks/usePark" 
import useColaborators from "../../hooks/useColaborators"
import { unLoggedIn } from "../../mocks/errorPage"

const Settings = () => {

    const { dataClient, park, unauthorized } = useUser()
    
    const { fetchPark } = usePark()
    const { fetchColaborators } = useColaborators()

    const [errorMsg, setErrorMsg] = useState("")
    const [unauthorizedTypeUser, setUnauthorizedTypeUser] = useState(false)

    useEffect(() => {
        if (dataClient.type_colaborator === "Funcionário(a)") {
            setUnauthorizedTypeUser(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }

        if (dataClient.id_establishment) {
            fetchPark()
        }
    }, [dataClient])
    
    useEffect(() => {
        if (park) {
            fetchColaborators()
        }
    }, [park])

    if (unauthorized || unauthorizedTypeUser) {
        return <ErrorPage errorMsg={unauthorized ? unLoggedIn : errorMsg} />
    }

    return (
        <Container>
            <Top children="Meu estabelecimento" gridcolumn={1} gridrow={1} font={19}/>
            <Establishment />
            <Top children="Horário de funcionamento" gridcolumn={"span 2"} gridrow={1} font={19}/>
            <OpeningHours />
            <Top children="Nossos colaboradores" gridcolumn={2} gridrow={3} font={19}/>
            <Colaborators />
            <Top children="Tabela de preço" gridcolumn={3} gridrow={3} font={19}/>
            <PriceTable />
        </Container>
    )
}

export default Settings