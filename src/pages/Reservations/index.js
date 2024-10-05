import { useEffect, useState } from "react"
import { useUser } from "../../context/globalContext"
import { Container, ItemReservation, CloseReserve, TopTwo } from "./style"
import TopContent from "./components/top"
import ListConfirmedReserve from "./components/listConfirmed"
import TimingReserve from "./components/timing"
import SelectedReserve from "./components/selectedReserve"
import { theme } from "../../theme/theme"
import GlobalButton from "../../components/Button"
import api from "../../services/api/server"
import ReadApi from "../../services/readData"
import { jwtDecode } from "jwt-decode"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import Top from "../../components/Top"
import { formatCurrency } from "../../services/formatCurrency"
import { unformatCurrency } from "../../services/unformatCurrency"

const Reservations = () => {

    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [valueSelectDebt, setValueSelectDebt] = useState("")
    const [valuesDebt, setValuesDebt] = useState(0)
    const [hasDebt, setHasDebt] = useState(false)
    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [linhas, setLinhas] = useState([{ valorPgto: "", valueSelect: "credit-parko" }])

    const { 
        setDataClient,
        dataClient, 
        selectedClient, 
        setSelectedClient, 
        reservations, 
        debts, 
        park,
        priceTable
    } = useUser()
    const { colaborator } = dataClient
    const { cancelColor, greenColor } = theme

    let dataReservaDoCliente = selectedClient?.data_entrada ?? ""
    let horaReservaDoCliente = selectedClient?.hora_entrada ?? ""
    let converterData = new Date(dataReservaDoCliente+" "+horaReservaDoCliente).getTime()
    
    const tempoAtual = new Date().getTime()
    const diferenca = tempoAtual - converterData // Diferença da data de reserva do cliente da data de hoje em milissegundos
    const totalHoras = ((new Date(diferenca).getUTCDate() - 1) * 24) + (new Date(diferenca).getUTCHours()) // Calcular os dias + horas

    const valorDaReservaAtual = (
        totalHoras >= 1 ?
        ((priceTable?.valor_fracao_hora ?? "") * totalHoras) + (selectedClient?.value ?? "") :
        selectedClient?.value ?? ""
    )

    const { 
        listReservations, 
        loadData, 
        listColaborators, 
        listDividas,
        getPriceTable
    } = ReadApi()

    const reservaAberta = reservations.filter(
        item => item.status === "Pendente" || 
        item.status === "Confirmado" || 
        item.status === "Recusado"
    )

    const filterReserv = reservaAberta.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase())
    )

    const getDebtById = () => {
        if(selectedClient) {
            const findId = debts.filter(
                item => item.id_costumer === selectedClient?.id_costumer &&
                item.status === "Pendente"
            )
            
            if(findId.length === 0) {
                setHasDebt(false)
                return
            }

            setHasDebt(true)
            const mapDebt = findId.map(item => item.value)

            if(mapDebt.length >= 1) {
                const somarValores = mapDebt.reduce((acc, current) => {
                    return acc + current
                })
                setValuesDebt(somarValores)
            }
        }
    }

    const vagasOcupadas = async (id) => {
        await api.put(`/vagas_ocupadas/${id}`, {
            vagas_ocupadas: park.vagas_ocupadas - 1
        })
        .then(() => {
            return "ok"
        })
        .catch(e => {
            return e
        })
    }

    const fecharReserva = async (id, e, index) => {
        e.preventDefault()

        setLoading(true)

        // 1- Verificar se o cliente possui reserva confirmada
        if(selectedClient?.status === "Recusado") {
            alert(
                `Esta reserva foi marcada como recusada. Para conclui-la preencha o PIN na página principal`
            )
            setLoading(false)
            return
        }

        if(selectedClient?.status === "Pendente") {
            alert(
                `Confirme a reserva do cliente ${selectedClient.name} na página principal antes de fechar a reserva`
            )
            setLoading(false)
            return
        }

        // 2- Verificar se possui horário de saída
        if(selectedClient?.hora_saida === "") {
            setError(true)
            setMessageError("É necessário preencher o horário de saída do cliente")
            setLoading(false)
            return
        }
        
        // 3- Verificar se há algum campo de texto vazio
        const valores = linhas.map(item => {
            return unformatCurrency(item.valorPgto)/100
        })

        const condicao = valores.filter(item => item === 0)

        if(condicao.length > 0) {
            setError(true)
            setMessageError("Preencha o campo vazio")
            setLoading(false)
            return
        }


        // 4- Verificar se há forma de pagamento em cartão ou pix. 
        // Se sim, certificar-se de que o valor inserido seja IGUAL ao valor da reserva. 
        // Se houver forma de pagamento em dinheiro fornecer o troco correto

        const optionMoney = linhas.filter(item => item.valueSelect === "money")
        const unformatTotal = unformatCurrency(total)/100
        const somarValores = valores.reduce((prev, current) => {
            return prev + current
        })

        if(somarValores < unformatTotal) {
            setError(true)
            setMessageError(
                "Somente fechar a reserva quando tiver todas as formas de pagamento compreendendo o valor total da reserva"
            )
            setLoading(false)
            return
        }

        if(somarValores > unformatTotal && optionMoney.length === 0) {
            setError(true)
            setMessageError(
                "O valor informado não pode ser maior que o valor total da reserva caso o pagamento não seja feito em dinheiro"
            )
            setLoading(false)
            return
        }

        // 5- Verificar se há forma de pagamento em dívida (A ser pago). Se sim, registrar a dívida
        const filtrarDivida = linhas.filter(item => item.valueSelect === "debit")

        if(filtrarDivida.length > 0) {
            const calcularDivida = filtrarDivida
            .map(item => unformatCurrency(item.valorPgto)/100)
            .reduce((prev, current) => {
                return prev + current
            })

            await api.post(`/debts`, {
                value: calcularDivida,
                id_costumer: selectedClient.id_costumer,
                id_establishment: dataClient.id_establishment
            })
            .then(() => {
                return "ok"
            })
            .catch(e => {
                return `erro ao registrar dívida: ${e}`
            })
        }

        if(window.confirm(`Deseja concluir a reserva de ${selectedClient.name}?`) === true) {
            await api.put(`/reservations/${id}`, { 
                data_entrada: selectedClient.data_entrada,
                hora_entrada: selectedClient.hora_entrada,
                data_saida: selectedClient.data_saida,
                hora_saida: selectedClient.hora_saida,
                value: selectedClient.value,
                status: 4,
                id_vehicle: selectedClient.id_vehicle
            })
            .then(() => {
                alert("Reserva concluída com sucesso!")
                vagasOcupadas(dataClient.id_establishment)
            })
            .catch(e => {
                alert("Erro ao concluir reserva", e)
            })
        }

        setError(false)
        setMessageError("")
        setLoading(false)

        return
    }

    const valorTotal = () => {
        if(diferenca < 0) return formatCurrency(0, 'BRL')

        if(reservaAberta && selectedClient) {
            if(hasDebt) {
                return formatCurrency((valorDaReservaAtual) + (valuesDebt), 'BRL') 
            } 

            return formatCurrency(valorDaReservaAtual, 'BRL') 
        } 
    }

    const total = valorTotal()

    const cancelar = e => {
        e.preventDefault()

        console.log("cancelar")
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
        
        if(reservaAberta) {
            const indexOf = reservaAberta.values().next().value
            setSelectedClient(indexOf)
        }

        listDividas()
        getPriceTable(dataClient.id_establishment)
    }, [])
    
    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)
    }, [dataClient])

    useEffect(() => {
        getDebtById()
        console.log(selectedClient)
    }, [selectedClient])

    return (
        <Container>
            <TopContent states={{ text, setText }} />
            <ItemReservation>
                <ListConfirmedReserve 
                    reservaAberta={reservaAberta}
                    filterReserv={filterReserv} 
                    priceTable={priceTable}
                    totalHoras={totalHoras}
                    valorDaReservaAtual={valorDaReservaAtual}
                />
                <TimingReserve 
                    state={{
                        colaborator,
                        selectedClient
                    }}
                />
            </ItemReservation>
            <TopTwo>
                <Top children="Reserva Selecionada" font={19} />
            </TopTwo>
            <SelectedReserve 
                state={{
                    reservaAberta,
                    valuesDebt,
                    hasDebt,
                    setValueSelectDebt,
                    linhas,
                    setLinhas,
                    error,
                    messageError,
                    total,
                    priceTable,
                    totalHoras,
                    valorDaReservaAtual,
                    diferenca
                }}
            />
            <CloseReserve>
                <GlobalButton
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={cancelar}
                />
                <GlobalButton
                    children={
                        loading ? 
                        <Bounce color="#f4f4f4" /> : 
                        "Fechar Reserva"
                    }
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={e => fecharReserva(selectedClient.id, e)}
                />
            </CloseReserve>
        </Container>
    )
}

export default Reservations