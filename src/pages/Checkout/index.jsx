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
import { formatCurrency } from "../../utils/FormatCurrency"
import api from "../../services/api/server"
import * as XLSX from "xlsx"

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title)

const Checkout = () => {

    const { primaryColor, neutralColor } = theme
    const { 
        reservations, caixaAberto,
        dataClient, setDataClient,
        aportes,  retiradas, 
        park, reservaAppParko,
        filtrarPorData, setFiltrarPorData,
        resumoVendas, dividasEmDinheiro
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
    const [reservaFechada, setReservaFechada] = useState([])

    const closedReservations = async () => {
        try {
            const reservasFechadas = reservations.filter(
                item =>
                    item.status === "Finalizado" &&
                    item.data_saida === filtrarPorData
            )

            const filterReserv = reservasFechadas.filter(
                item =>
                    item.name.toLowerCase().includes(text.toLowerCase()) ||
                    item.license_plate.toLowerCase().includes(text.toLowerCase()) ||
                    item.id == text
            )

            const response = await api.get(`/payment/${dataClient.id_establishment}`)
            const payments = response.data

            const reservasComPagamentos = filterReserv.map(item => {
                const pagamentosReserva = payments.filter(
                    p => p.id_customer === item.id_costumer &&
                    p.payment_method === "money" &&
                    p.change_paid === 0
                )
                const changeToPay = pagamentosReserva.map(p => p.change_to_pay)
                const somarValores = changeToPay.reduce((prev, current) => (
                    prev + current
                ), 0)
                const procurarCreditosDaReserva = pagamentosReserva.find(pgto => pgto.id_reservation === item.id)

                return {
                    ...item,
                    pagamentos: pagamentosReserva,
                    creditos_do_cliente: somarValores,
                    creditos_da_reserva: procurarCreditosDaReserva?.change_to_pay ?? 0
                }
            })

            return reservasComPagamentos
        } catch (error) {
            console.log("Erro ao carregar créditos do cliente", error)
            return []
        }
    }

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

    function mapVendas(payment_method) {
        const filtrarData = resumoVendas.filter(item => item.data === filtrarPorData)
        const formaDePagamento = filtrarData.filter(item => item.payment_method === payment_method)

        if (payment_method === "total") {
            const totalVendas = filtrarData
                .map(item => item.value)
                .reduce((prev, current) => prev + current, 0)

            return formatCurrency(totalVendas, 'BRL')
        }

        if (formaDePagamento.length > 0) {
            const somarVendas = formaDePagamento
                .map(item => item.value)
                .reduce((prev, current) => prev + current, 0)
                
            return formatCurrency(somarVendas, 'BRL')
        }

        return formatCurrency(0, 'BRL')
    }
    
    function organizarDividas() {
        const filterDebts = dividasEmDinheiro?.filter(
            item => item.status === "Pago" && 
            item.payment_method === "money" && 
            item.date_updated?.split(",")[0] === filtrarPorData
        )

        const plusValues = filterDebts
            .map(item => item.value)
            .reduce((prev, current) => {
                return prev + current
            }, 0)

        return plusValues ? formatCurrency(plusValues, 'BRL') : formatCurrency(0, 'BRL')
    }

    function handleDownload(e) {
        e.preventDefault()

        const dados = {
            responsavel: dataClient.colaborator,
            email: dataClient.email,
            abertura: caixaAberto?.data_abertura && `${caixaAberto?.data_abertura ?? ""}, ${caixaAberto?.hora_abertura ?? ""}`,
            fechamento: caixaAberto?.data_fechamento && `${caixaAberto?.data_fechamento ?? ""}, ${caixaAberto?.hora_fechamento ?? ""}`,
            valor_da_abertura: formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL'),
            valor_do_fechamento: formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')
        }

        const caixa = {
            valor_da_abertura: formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL'),
            vendas_em_dinheiro: mapVendas("money"),
            recebimento_de_dividas_em_dinheiro: organizarDividas(),
            aportes: formatCurrency(valoresAporte, "BRL"),
            retiradas: formatCurrency(valoresRetiradas, "BRL"),
            valor_do_fechamento: formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')
        }

        const resumoDeVendas = {
            dinheiro: mapVendas("money"),
            pix: mapVendas("pix"),
            debito: mapVendas("debit_card"),
            credito: mapVendas("credit_card"),
            a_pagar: mapVendas("debit"),
            total: mapVendas("total")
        }

        const wb = XLSX.utils.book_new()

        const createSheet = (data, text) => {
            const ws = XLSX.utils.json_to_sheet([data])
            XLSX.utils.book_append_sheet(wb, ws, text)
        }

        createSheet(dados, "Dados")
        createSheet(caixa, "Fechamento do caixa")
        createSheet(resumoDeVendas, "Resumo de vendas")

        XLSX.writeFile(wb, `Resumo de vendas ${dataClient.establishment} ${caixaAberto?.data_abertura}.xlsx`)
    }

    async function handleDownloadReservation() {
        const response = await api.get(`/payment/${dataClient.id_establishment}`)
        const payments = response.data

        const pagamentoPorReserva = reservaFechada.map(item => {
            return payments.filter(p => p.id_reservation === item.id)
        })

        const wb = XLSX.utils.book_new()

        const wsReservas = XLSX.utils.json_to_sheet(reservaFechada)
        XLSX.utils.book_append_sheet(wb, wsReservas, "Reservas")

        const pagamentos = pagamentoPorReserva.flat()
        const wsPagamentos = XLSX.utils.json_to_sheet(pagamentos)
        XLSX.utils.book_append_sheet(wb, wsPagamentos, "Pagamentos")

        XLSX.writeFile(
            wb,
            `Reservas e Pagamentos ${dataClient.establishment}, ${reservaFechada[0].data_saida}.xlsx`
        )
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

        const fetchData = async () => {
            const data = await closedReservations()
            setReservaFechada(data)
        }

        fetchData()
    }, [reservations, filtrarPorData, text])

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
                handleDownload={handleDownload}
            />
            <SummaryContent 
                resumo={{
                    valoresTotal,
                    valoresAporte,
                    valoresRetiradas,
                    filtrarPorData
                }}
                organizarDividas={organizarDividas}
                mapVendas={mapVendas}
            />
            <SecondHeader 
                states={{ 
                    text, 
                    setText,
                    setFiltrarPorData
                }} 
                handleDownloadReservation={handleDownloadReservation}
            />
            <ListReserve reservaFechada={reservaFechada} />
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