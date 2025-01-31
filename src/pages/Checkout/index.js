import { useState, useEffect } from "react"
import { useUser } from "../../context/globalContext"
import { Container, Graphics } from "./style"
import Buttons from "./components/buttons"
import FirstHeader from "./components/firstHeader"
import SecondHeader from "./components/secondHeader"
import SummaryContent from "./components/summaryContent"
import ListReserve from "./components/list"
import { theme } from "../../theme/theme"
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title } from "chart.js"
import { Doughnut, Bar } from 'react-chartjs-2'
import { data, options, plugins } from "./datasets/doughnut"
import { dataBar, optionsBar } from "./datasets/bar"
import Modal from "../../components/Modal"
import Contribution from "./form/contribution"
import Retirada from "./form/retirada"
import api from "../../services/api/server"
import ReadApi from "../../services/readData"
import { converter } from "../../services/converterData"

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title)

const Checkout = () => {

    const { primaryColor, neutralColor } = theme
    const { reservations, dataClient, aportes, retiradas, park } = useUser()
    const { readAportes, readRetiradas, listReservations, loadData } = ReadApi()
    const { converterData } = converter()

    const [open, setOpen] = useState(false)
    const [openRetirada, setOpenRetirada] = useState(false)
    const [novoAporte, setNovoAporte] = useState({
        created_at: "",
        value: "",
        description: ""
    })
    const [novaRetirada, setNovaRetirada] = useState({
        created_at: "",
        value: "",
        description: ""
    })
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [filtrarPorData, setFiltrarPorData] = useState({
        resumo: converterData,
        lista: converterData
    })

    const formatoPadrao = () => {
        const formatar = filtrarPorData.lista.split("-")
        return `${formatar[2]}/${formatar[1]}/${formatar[0]}`
    }

    const reservaFechada = reservations.filter(
        item => item.status === "Finalizado" &&
        item.data_entrada === formatoPadrao()
    )

    const filterReserv = reservaFechada.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase())
    )

    const calcularValorPorEstacionamento = (data, idEstacionamento) => {

        const filtrarItem = (array) => array.filter(
            item => item.id_establishment === idEstacionamento &&
            item.created_at.slice(0, 10) === filtrarPorData.resumo
        )

        const calcularSoma = (array) => array.map(item => item.value)
        .reduce((prev, current) => {
            return prev + current
        }, 0) 

        const valoresTotal = calcularSoma(data)

        const findIdAportes = filtrarItem(aportes)
        const valoresAporte = calcularSoma(findIdAportes)

        const findIdRetiradas = filtrarItem(retiradas)
        const valoresRetiradas = calcularSoma(findIdRetiradas)

        return { valoresTotal, valoresAporte, valoresRetiradas }
    }

    const criarAporte = async (setOpen, e) => {
        e.preventDefault()
        setLoading(true)

        await api.post("/aportes", {
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id,
            created_at: novoAporte.created_at,
            value: novoAporte.value,
            description: novoAporte.description
        })
        .then(() => {
            alert("Aporte realizado com sucesso")
            setOpen(false)
            setLoading(false)
            setNovoAporte({})
        })
        .catch(e => {
            setMessageError(e.response.data.message)
            setLoading(false)
        })
    }

    const criarRetirada = async (setOpenRetirada, e) => {
        e.preventDefault()
        setLoading(true)

        await api.post("/retiradas", {
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id,
            created_at: novaRetirada.created_at,
            value: novaRetirada.value,
            description: novaRetirada.description
        })
        .then(() => {
            alert("Retirada realizada com sucesso")
            setOpenRetirada(false)
            setLoading(false)
            setNovaRetirada({})
        })
        .catch(e => {
            setMessageError(e.response.data.message)
            setLoading(false)
        })
    }

    useEffect(() => {
        readRetiradas()
        readAportes()
    }, [aportes, retiradas])

    useEffect(() => {
        loadData(dataClient.id_establishment)
    }, [dataClient])

    useEffect(() => {
        if(park) {
            listReservations(dataClient.id_establishment)
        }
    }, [park])

    useEffect(() => {
        calcularValorPorEstacionamento(reservations, dataClient.id_establishment)
    }, [reservations])

    const { 
        valoresTotal,
        valoresAporte,
        valoresRetiradas
    } = calcularValorPorEstacionamento(reservations, dataClient.id_establishment)

    return (
        <Container>
            <FirstHeader
                states={{
                    setFiltrarPorData,
                    filtrarPorData
                }}
            />
            <SummaryContent 
                resumo={{
                    valoresTotal,
                    valoresAporte,
                    valoresRetiradas
                }}
            />
            <SecondHeader 
                states={{ 
                    text, 
                    setText,
                    filtrarPorData,
                    setFiltrarPorData
                }} 
            />
            <ListReserve reservaFechada={filterReserv} />
            <Buttons setOpen={setOpen} setOpenRetirada={setOpenRetirada}/>
            <Graphics background={primaryColor}>
                <div style={{ padding: 10 }}>
                    <Bar 
                        data={dataBar}
                        options={optionsBar}
                    />
                </div>
                <div style={{ padding: 10 }}>
                    <Doughnut
                        data={data}
                        options={options}
                        plugins={plugins}
                    />
                </div>
            </Graphics>

            <Modal
                isOpen={open}
                setOpen={setOpen}
                title={"Aporte de Dinheiro"}
                maxWidth={"30rem"}
                funcao={e => criarAporte(setOpen, e)}
                isLoading={loading}
            >
                <Contribution 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    state={{
                        setNovoAporte,
                        novoAporte
                    }}
                    messageError={messageError}
                />
            </Modal>
            <Modal
                isOpen={openRetirada}
                setOpen={setOpenRetirada}
                title={"Retirada de Dinheiro"}
                maxWidth={"30rem"}
                funcao={e => criarRetirada(setOpenRetirada, e)}
                isLoading={loading}
            >
                <Retirada 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    state={{
                        setNovaRetirada,
                        novaRetirada
                    }}
                    messageError={messageError}
                />
            </Modal>
        </Container>
    )
}

export default Checkout