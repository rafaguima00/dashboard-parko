import { Doughnut } from "react-chartjs-2"
import AvaliacaoDoCliente from "../datasets/dgClientSatisfation"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { FaRightLeft } from "react-icons/fa6"
import { 
    GroupInfo, 
    TitleLine, 
    Subtitle, 
    Info, 
    TextAligned, 
    Loading, 
    ElementLoading 
} from "../style"
import { useUser } from "../../../context/globalContext"
import VagasDisponiveisDataset from "../datasets/doughnut"
import api from "../../../services/api/server"
import { useEffect } from "react"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import useReservation from "../../../hooks/useReservation"
import usePayment from "../../../hooks/usePayment"

const Informacoes = () => {

    const { park, dataClient, setRatings, ratings, reservations, resumoVendas } = useUser()
    const { datachart, options } = VagasDisponiveisDataset({ park })
    const { dadosCliente, opcoesCliente } = AvaliacaoDoCliente()
    const { fetchReservations } = useReservation()
    const { fetchPayments } = usePayment()

    const styleIcon = {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 10
    }
    
    const dataDeHoje = new Date().getDate()
    const mesAtual = new Date().getMonth() + 1
    
    const formatarDia = dataDeHoje < 10 ? "0" + dataDeHoje : dataDeHoje
    const formatarMes = mesAtual < 10 ? "0" + mesAtual : mesAtual
    const anoAtual = new Date().getFullYear()
    
    const dataCompleta = `${formatarDia}/${formatarMes}/${anoAtual}`

    function quantidadeVagas() {
        if (park?.numero_vagas == null || park?.vagas_ocupadas == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        let vagas_disponiveis = (park?.numero_vagas ?? 0) - (park?.vagas_ocupadas ?? 0)
        return `${vagas_disponiveis}/${park?.numero_vagas ?? 0}`
    }

    async function avaliacoes() {
        await api.get(`/ratings/${dataClient.id_establishment}`)
        .then(res => {
            setRatings(res.data)
        })
        .catch(e => {
            setRatings(e)
        })
    }

    function calcularPorcentagem() {
        if (ratings == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        if (ratings.length > 0) {
            const total = ratings.length
            const positiva = ratings.filter(item => item.rate >= 4).length
            const ratePercent = (positiva * 100) / total

            return `${ratePercent.toFixed(2)}%`
        }

        return `Sem avaliações`
    }

    const numeroDePessoasNoDia = () => {
        const reservasHoje = reservations.filter(item => item.data_entrada === dataCompleta)

        return reservasHoje.length
    }

    const faturamentoDiario = () => {
        const vendasHoje = resumoVendas.filter(item => item.data === dataCompleta)
        const mapValue = vendasHoje.map(item => item.value)
        const somarValores = mapValue.reduce((prev, current) => {
            return prev + current
        }, 0)

        return formatCurrency(somarValores, 'BRL')
    }

    useEffect(() => {
        if (dataClient.id_establishment) {
            avaliacoes()
            fetchReservations()
            fetchPayments()
        }
    }, [dataClient.id_establishment])

    return <>
        <GroupInfo>
            <Info>
                <span>
                    <TitleLine>
                        {quantidadeVagas()}
                    </TitleLine>
                    <Subtitle style={{ color: "#f4f4f4" }}>Vagas disponíveis</Subtitle>
                </span>
                <div style={{ width: 64, height: 64 }}>
                    <Doughnut
                        data={datachart}
                        options={options}
                    />
                </div>
            </Info>
            <Info>
                <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                <TextAligned>
                    <TitleLine>{faturamentoDiario()}</TitleLine>
                    <Subtitle>Faturamento diário</Subtitle>
                </TextAligned>
            </Info>
            <Info>
                <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                <TextAligned>
                    <TitleLine>{numeroDePessoasNoDia()}</TitleLine>
                    <Subtitle>Número de pessoas no dia</Subtitle>
                </TextAligned>
            </Info>
            <Info>
                <div>
                    <TitleLine>{calcularPorcentagem()}</TitleLine>
                    <Subtitle>Satisfação do cliente</Subtitle>
                </div>
                <div style={{ width: 64, height: 64 }}>
                    <Doughnut
                        data={dadosCliente}
                        options={opcoesCliente}
                    />
                </div>
            </Info>
        </GroupInfo>
    </>
}

export default Informacoes