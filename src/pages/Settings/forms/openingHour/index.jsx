import TopForm from "../../components/topForm"
import { ContainerForm } from "../style"
import { useEffect, useState } from "react"
import { useParking } from "../../../../context/parkingContext"
import { useUser } from "../../../../context/globalContext"
import { theme } from "../../../../theme/theme"
import FormArea from "./components/FormArea"
import BottomButton from "./components/BottomButton"
import api from "../../../../services/api/server"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../../../services/readData"
import { unLoggedIn } from "../../../../mocks/errorPage"
import ErrorPage from "../../../Error"

const FormOpening = () => {

    const date = new Date().toLocaleDateString()

    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [openHour, setOpenHour] = useState({})
    const [closeHour, setCloseHour] = useState({})
    const [checked, setChecked] = useState({})
    const [table, setTable] = useState([])

    const { dataClient, setDataClient } = useUser()
    const { listColaborators, loadData } = ReadApi()

    const { 
        cancelColor, 
        greenColor, 
        neutralColor, 
        primaryColor 
    } = theme

    const diasSemana = [
        { key: "monday", label: "Segunda-feira" },
        { key: "tuesday", label: "Terça-feira" },
        { key: "wednesday", label: "Quarta-feira" },
        { key: "thursday", label: "Quinta-feira" },
        { key: "friday", label: "Sexta-feira" },
        { key: "saturday", label: "Sábado" },
        { key: "sunday", label: "Domingo" }
    ]

    const recuperarDados = async (idEstablishment) => {
        setLoading(true)

        try {
            const res = await api.get(`/hora_funcionamento/${idEstablishment}`)

            const dados = {}
            res.data.forEach(item => {
                dados[item.dia_semana] = {
                    id: item.id,
                    open: item.hora_abertura,
                    close: item.hora_fechamento,
                    closed: item.closed,
                    id_estacionamento: item.id_estacionamento
                }
            })

            const novaTabela = diasSemana.map(dia => {
                const info = dados[dia.label]

                return {
                    id: info ? info.id : undefined,
                    week: dia.label,
                    open: info ? info.open : "",
                    onChangeOpen: (e) => setOpenHour(prev => ({ ...prev, [dia.key]: e.target.value })),
                    close: info ? info.close : "",
                    onChangeClose: (e) => setCloseHour(prev => ({ ...prev, [dia.key]: e.target.value })),
                    closed: info ? Boolean(info.closed) : false,
                    id_estacionamento: info.id_estacionamento
                }
            })

            setTable(novaTabela)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const atualizarTabela = async () => {

        setLoading(true)

        try {
        
            const salvarDados = table.map(item => ({ 
                id: item.id, 
                hora_abertura: item.open, 
                hora_fechamento: item.close, 
                closed: item.closed ? 1 : 0
            }))

            await api.put(`/hora_funcionamento/${dataClient.id_establishment}`, salvarDados)

            alert("Tabela atualizada com sucesso")
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
            recuperarDados(decoded.user.id_establishment)
        } else {
            setUnauthorized(true)
            setErrorMsg(unLoggedIn)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)

        if (dataClient.type_colaborator === "Funcionário(a)") {
            setUnauthorized(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])

    if (unauthorized) {
        return <ErrorPage errorMsg={errorMsg} />
    }

    return (
        <ContainerForm>
            <TopForm children="Horário de Funcionamento" />
            <FormArea 
                neutralColor={neutralColor} 
                primaryColor={primaryColor} 
                table={table}
                setTable={setTable}
                setChecked={setChecked}
                date={date}
            />
            <BottomButton 
                cancelColor={cancelColor}
                greenColor={greenColor}
                recuperarDados={atualizarTabela}
                loading={loading}
            />
        </ContainerForm>
    )
}

export default FormOpening