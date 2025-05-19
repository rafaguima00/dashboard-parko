import { Container } from "./style"
import Establishment from "./components/establishment"
import Colaborators from "./components/colaborators"
import PriceTable from "./components/priceTable"
import OpeningHours from "./components/openingHours"
import Top from "../../components/Top"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useUser } from "../../context/globalContext"
import ReadApi from "../../services/readData"
 
const Settings = () => {

    const { setDataClient, dataClient, park } = useUser()
    const { listColaborators, listReservations, loadData } = ReadApi()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        } 
    }, [])

    useEffect(() => {
        if(dataClient.id_establishment) {
            loadData(dataClient.id_establishment)
        }

        if(dataClient.type_colaborator === "Funcionário(a)"){
            throw new Error("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])
    
    useEffect(() => {
        if(park) {
            listColaborators(dataClient.id_establishment)
            listReservations(dataClient.id_establishment)
        }
    }, [park])

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