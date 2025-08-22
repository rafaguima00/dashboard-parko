import { ContainerForm } from "../style"
import TopForm from "../../components/topForm"
import {  Form, Block } from "./style"
import { useUser } from "../../../../context/globalContext"
import { useEffect, useState } from "react"
import api from "../../../../services/api/server"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../../../services/readData"
import "react-activity/dist/library.css"
import { unLoggedIn } from "../../../../mocks/errorPage"
import ErrorPage from "../../../Error"
import BottomButton from "./components/bottomButton"
import TabelaFixa from "./components/tabelaFixa"
import FracaoHora from "./components/horaFracao"
import RadioArea from "./components/radioArea"
import TempoTolerancia from "./components/tempoTolerancia"

const PriceTableForm = () => {

    const { 
        listColaborators, 
        loadData, 
        getPriceTable,
        getTabelaFixa
    } = ReadApi()
    const { 
        dataClient, 
        priceTable, 
        setDataClient, 
        reservations,
        tabelaFixa
    } = useUser()

    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [value, setValue] = useState("yes")
    const [typeCharge, setTypeCharge] = useState("")
    const [linhas, setLinhas] = useState([
        { 
            id: null, 
            idEstacionamento: dataClient.id_establishment,
            valueNumber: "", 
            valueTime: "", 
            valueTimeTwo: "" 
        }
    ])
    const [formTable, setFormTable] = useState({})
    const [isLoadingTabelaFixa, setIsLoadingTabelaFixa] = useState(true)
    const [deletedLines, setDeletedLines] = useState([])

    // Função para formatar o valor com separadores de milhar
    const formatNumber = (num) => {
        if (!num) return ""
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }

    const typeOfCharge = async (id) => {
        try {
            const response = await api.get(`/establishments/${id}`)
            setTypeCharge(response.data[0].type_of_charge)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
            typeOfCharge(decoded.user.id_establishment)
        } else {
            setErrorMsg(unLoggedIn)
            setUnauthorized(true)
            return
        }

    }, [])

    useEffect(() => {
        if (tabelaFixa.length > 0) {
            const novasLinhas = tabelaFixa.map((item) => ({
                id: item.id, 
                idEstacionamento: item.id_establishment,
                valueNumber: formatNumber(item.value),
                valueTime: item.primeira_hora,
                valueTimeTwo: item.segunda_hora,
            }))
            setLinhas(novasLinhas)
        } else {
            setLinhas([{ id: null, idEstacionamento: null, valueNumber: "", valueTime: "", valueTimeTwo: "" }])
        }

        setIsLoadingTabelaFixa(false)
    }, [tabelaFixa])

    useEffect(() => {
        if (priceTable) {
            setFormTable({
                id: priceTable.id,
                id_estacionamento: dataClient.id_establishment,
                tempo_tolerancia: priceTable.tempo_tolerancia,
                valor_fracao_hora: formatNumber(priceTable.valor_fracao_hora),
                valor_hora: formatNumber(priceTable.valor_hora),
            })
        }
    }, [priceTable])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        getPriceTable(dataClient.id_establishment)
        getTabelaFixa(dataClient.id_establishment)

        if (dataClient.type_colaborator === "Funcionário(a)"){
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
            setUnauthorized(true)
        }
    }, [dataClient, reservations])

    if (unauthorized) {
        return <ErrorPage errorMsg={errorMsg} />
    }

    return (
        <ContainerForm>
            <TopForm setDeletedLines={setDeletedLines} children="Tabela de Preços" />
            <Block>
                <Form>
                    <TempoTolerancia states={{ value, formTable, setFormTable, setValue }} />
                    <RadioArea states={{ typeCharge, setTypeCharge }} />
                    {typeCharge === "hora_fracao" ? 
                        <FracaoHora 
                            states={{ 
                                formTable, setFormTable 
                            }} 
                        /> :
                        <TabelaFixa 
                            states={{ 
                                setLinhas, 
                                linhas, 
                                isLoadingTabelaFixa,
                                setDeletedLines
                            }}
                        />
                    }
                    <BottomButton 
                        states={{
                            formTable,
                            typeCharge,
                            value, 
                            linhas,
                            deletedLines,
                            setDeletedLines
                        }}
                    />
                </Form>
            </Block>
        </ContainerForm>
    )
}

export default PriceTableForm