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
    const [dados, setDados] = useState([])
    const [loading, setLoading] = useState(false)

    const { 
        openHour, 
        closeHour, 
        setOpenHour, 
        setCloseHour, 
        setChecked, 
        checked 
    } = useParking()
    const { dataClient, setDataClient } = useUser()
    const { listColaborators, loadData } = ReadApi()

    const { 
        cancelColor, 
        greenColor, 
        neutralColor, 
        primaryColor 
    } = theme

    const table = [
        {
            id: 0,
            week: "Segunda-feira",
            open: openHour.monday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, monday: e.target.value }),
            close: closeHour.monday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, monday: e.target.value }),
            checked: checked.monday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 1,
            week: "Terça-feira",
            open: openHour.tuesday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, tuesday: e.target.value }),
            close: closeHour.tuesday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, tuesday: e.target.value }),
            checked: checked.tuesday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 2,
            week: "Quarta-feira",
            open: openHour.wednesday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, wednesday: e.target.value }),
            close: closeHour.wednesday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, wednesday: e.target.value }),
            checked: checked.wednesday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 3,
            week: "Quinta-feira",
            open: openHour.thursday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, thursday: e.target.value }),
            close: closeHour.thursday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, thursday: e.target.value }),
            checked: checked.thursday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 4,
            week: "Sexta-feira",
            open: openHour.friday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, friday: e.target.value }),
            close: closeHour.friday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, friday: e.target.value }),
            checked: checked.friday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 5,
            week: "Sábado",
            open: openHour.saturday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, saturday: e.target.value }),
            close: closeHour.saturday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, saturday: e.target.value }),
            checked: checked.saturday,
            id_estacionamento: dataClient.id_establishment
        },
        {
            id: 6,
            week: "Domingo",
            open: openHour.sunday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, sunday: e.target.value }),
            close: closeHour.sunday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, sunday: e.target.value }),
            checked: checked.sunday,
            id_estacionamento: dataClient.id_establishment
        }
    ]

    const recuperarDados = async (e) => {
        e.preventDefault()
        setLoading(true)

        await api.get(`/hora_funcionamento/${dataClient.id_establishment}`)
        .then(res => {
            setDados(res.data)
            verificarDados(table)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
        })
    }

    const verificarDados = async (data) => {
        const filtrarItens = data.filter(item => item.checked === false)
        const dados = filtrarItens.map(item => ({
            "dia_semana": item.week,
            "hora_abertura": item.open,
            "hora_fechamento": item.close,
            "id_estacionamento": item.id_estacionamento
        }))

        const dadosAtualizados = filtrarItens.map(item => ({
            "dia_semana": item.week,
            "hora_abertura": item.open,
            "hora_fechamento": item.close
        }))

        if(dados.length === 0) {
            await api.post("/hora_funcionamento", dados)
            .then(() => {
                alert("Dados enviados com sucesso.")
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            await api.put(`/hora_funcionamento/${dataClient.id_establishment}`, dadosAtualizados)
            .then(() => {
                alert("Dados atualizados com sucesso")
            })
            .catch(e => {
                console.log(e)
            })
        }

        setLoading(false)
    }

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

        if(dataClient.type_colaborator === "Funcionário(a)"){
            setUnauthorized(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])

    if(unauthorized) {
        return <ErrorPage errorMsg={errorMsg} />
    }

    return (
        <ContainerForm>
            <TopForm children="Horário de Funcionamento" />
            <FormArea 
                neutralColor={neutralColor} 
                primaryColor={primaryColor} 
                table={table}
                setChecked={setChecked}
                date={date}
            />
            <BottomButton 
                cancelColor={cancelColor}
                greenColor={greenColor}
                recuperarDados={recuperarDados}
                loading={loading}
            />
        </ContainerForm>
    )
}

export default FormOpening