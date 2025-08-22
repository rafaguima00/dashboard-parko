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
import DataSetDoughnut from "./datasets/doughnut"
import DatasetBar from "./datasets/bar"
import Modal from "../../components/Modal"
import Contribution from "./form/contribution"
import Retirada from "./form/retirada"
import ReadApi from "../../services/readData"
import { jwtDecode } from "jwt-decode"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import useAportes from "../../hooks/useAportes"
import { unformatCurrency } from "../../utils/UnformatCurrency"
import useRetiradas from "../../hooks/useRetiradas"
import { createdAt } from "../../utils/ConverterDataParaFormatoPadrao"
import useReservation from "../../hooks/useReservation"

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title)

const Checkout = () => {

    const { primaryColor, neutralColor } = theme
    const { 
        reservations,
        dataClient, setDataClient,
        aportes,  retiradas, 
        park, reservaAppParko,
        filtrarPorData, setFiltrarPorData,
    } = useUser()
    const { fetchAportes, addAportes } = useAportes()
    const { fetchRetiradas, addRetiradas } = useRetiradas()
    const { fetchReservations } = useReservation()
    const { loadData } = ReadApi()

    const [unauthorized, setUnauthorized] = useState(false)
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

    const reservaFechada = reservations.filter(
        item => item.status === "Finalizado" && 
        item.data_saida === filtrarPorData
    )
    const filterReserv = reservaFechada.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase()) || 
        item.id == text
    )

    const { dataBar, optionsBar } = DatasetBar()
    const { data, options, plugins } = DataSetDoughnut()


    const calcularValorPorEstacionamento = (data, idEstacionamento) => {

        const filtrarItem = (array) => array.filter(
            item => item.id_establishment === idEstacionamento &&
            item.created_at.slice(0, 10) === filtrarPorData
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
        
        try {
            await addAportes({
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: createdAt(novoAporte.created_at),
                value: unformatCurrency(novoAporte.value) / 100,
                description: novoAporte.description
            })
            alert("Aporte realizado com sucesso")
            setOpen(false)
            setNovoAporte({})
        } catch (error) {
            setMessageError(error)
        } finally {
            setLoading(false)
        }
    }

    const criarRetirada = async (setOpenRetirada, e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            await addRetiradas({
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: createdAt(novaRetirada.created_at),
                value: unformatCurrency(novaRetirada.value) / 100,
                description: novaRetirada.description
            })
            alert("Retirada realizada com sucesso")
            setOpenRetirada(false)
            setNovaRetirada({})
        } catch (error) {
            setMessageError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        } else {
            setUnauthorized(true)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        fetchRetiradas()
        fetchAportes()
    }, [dataClient])

    useEffect(() => {
        if (park) {
            fetchReservations()
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

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <FirstHeader
                states={{
                    setFiltrarPorData
                }}
            />
            <SummaryContent 
                resumo={{
                    valoresTotal,
                    valoresAporte,
                    valoresRetiradas,
                    filtrarPorData
                }}
            />
            <SecondHeader 
                states={{ 
                    text, 
                    setText,
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
                    {reservaAppParko && 
                        <Doughnut
                            data={data}
                            options={options}
                            plugins={plugins}
                        />
                    }
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