import { useEffect } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import useReservation from "../../../../../../../../hooks/useReservation"
import { Block } from "../../style"
import GeralDeFaturamento from "./geralDeFaturamento"
import GiroDeVagas from "./giroDeVagas"
import PerfilClientes from "./perfilClientes"
import TempoMedioPermanencia from "./tempoMedioPerm"
import usePayment from "../../../../../../../../hooks/usePayment"
import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"

const ReportClient = (props) => {

    const { tabelaDeClientes } = props

    const { fetchReservations } = useReservation()
    const { fetchPayments } = usePayment()
    const { reservations, resumoVendas } = useUser()

    const faturamentoDoMes = () => {
        const dataDeHoje = new Date().getDate()
        const mesDeHoje = new Date().getMonth() + 1
        const mesFormatado = mesDeHoje < 10 ? "0" + mesDeHoje : mesDeHoje
        
        const filtrarVendas = resumoVendas.filter(
            item => item.data.split("/")[1] === mesFormatado && item.payment_method !== "debit"
        )
        const mapValue = filtrarVendas.map(item => item.value_paid)
        const somarValores = mapValue.reduce((prev, current) => {
            return prev + current
        }, 0)

        const result = somarValores / dataDeHoje

        return formatCurrency(result, 'BRL')
    }

    const mesAnoMaiorFaturamento = () => {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]

        const faturamentoPorMes = {}

        resumoVendas.forEach(item => {
            const [dia, mes, ano] = item.data.split('/')
            const nomeMes = meses[Number(mes) - 1]
            const chave = `${nomeMes}/${ano}`

            if (!faturamentoPorMes[chave]) {
                faturamentoPorMes[chave] = 0
            }

            faturamentoPorMes[chave] += Number(item.value)
        })

        let maiorFaturamento = 0
        let mesAnoResultado = null
        let mesNumero = null
        let anoNumero = null

        for (const mesAno in faturamentoPorMes) {
            if (faturamentoPorMes[mesAno] > maiorFaturamento) {
                maiorFaturamento = faturamentoPorMes[mesAno]
                mesAnoResultado = mesAno

                const [nomeMes, ano] = mesAno.split('/')
                mesNumero = meses.indexOf(nomeMes) // 0–11
                anoNumero = Number(ano)
            }
        }

        // quantidade de dias do mês (truque clássico do JS)
        const diasNoMes = new Date(anoNumero, mesNumero + 1, 0).getDate()

        const mediaDiaria = maiorFaturamento / diasNoMes

        return {
            mesAnoFaturamento: mesAnoResultado,
            maiorFaturamento: formatCurrency(maiorFaturamento, 'BRL'),
            diasNoMes,
            mediaDiariaFaturamento: formatCurrency(mediaDiaria, 'BRL')
        }
    }

    const ocupacaoMensal = () => {
        const dataDeHoje = new Date().getDate()
        const mesDeHoje = new Date().getMonth() + 1
        const mesFormatado = mesDeHoje < 10 ? "0" + mesDeHoje : mesDeHoje
        
        const filtrarReservas = reservations.filter(item => item.data_entrada.split("/")[1] === mesFormatado)
        const resultado = filtrarReservas.length / dataDeHoje

        return resultado.toFixed(2).replace(".", ",")
    }

    const mesAnoMaiorOcupacao = () => {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]

        const ocupacaoPorMes = reservations.reduce((acc, item) => {
            if (!item.data_entrada) return acc

            const [dia, mes, ano] = item.data_entrada.split('/')
            const chave = `${mes}/${ano}`

            acc[chave] = (acc[chave] || 0) + 1
            return acc
        }, {})

        let maiorMes = null
        let maiorQuantidade = 0

        Object.entries(ocupacaoPorMes).forEach(([mesAno, quantidade]) => {
            if (quantidade > maiorQuantidade) {
                maiorQuantidade = quantidade
                maiorMes = mesAno
            }
        })

        if (!maiorMes) return

        const [mesNumero, ano] = maiorMes.split('/')
        const nomeMes = meses[Number(mesNumero) - 1]

        const totalDiasNoMes = new Date(ano, mesNumero, 0).getDate()

        const mediaPorDia = maiorQuantidade / totalDiasNoMes

        return {
            mes: nomeMes,
            ano,
            totalReservas: maiorQuantidade,
            mediaPessoasPorDia: Number(mediaPorDia.toFixed(2))
        }
    }

    const horasOcupadasNoMes = () => {
        const anoAtual = new Date().getFullYear()
        const mesAtual = String(new Date().getMonth() + 1).padStart(2, "0")
        const diaDeHoje = new Date().getDate()

        const reservasDoMes = reservations.filter(item => {
            const [dia, mes, ano] = item.data_entrada.split("/")
            return ano === anoAtual.toString() && mes === mesAtual
        })

        const totalHoras = reservasDoMes.reduce((soma, item) => {
            const [dE, mE, aE] = item.data_entrada.split("/")
            const [dS, mS, aS] = item.data_saida.split("/")

            const entrada = new Date(`${aE}-${mE}-${dE}T${item.hora_entrada}`)
            const saida = new Date(`${aS}-${mS}-${dS}T${item.hora_saida}`)

            const diffHoras = (saida - entrada) / 1000 / 60 / 60

            return soma + diffHoras
        }, 0)

        const mediaDeHoras = Number(totalHoras.toFixed(2)) / diaDeHoje

        return mediaDeHoras.toFixed(2).replace(".", ",")
    }

    const mesAnoMaiorHorasOcupadas = () => {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]

        const horasPorMes = {}

        reservations.forEach(item => {
            if (
                !item.data_entrada || 
                !item.hora_entrada || 
                !item.data_saida || 
                !item.hora_saida
            ) return

            const [diaEntrada, mesEntrada, anoEntrada] = item.data_entrada.split("/")
            const [diaSaida, mesSaida, anoSaida] = item.data_saida.split("/")

            // cria datas completas
            const entrada = new Date(
                `${anoEntrada}-${mesEntrada}-${diaEntrada}T${item.hora_entrada}`
            ).getTime()
            const saida = new Date(
                `${anoSaida}-${mesSaida}-${diaSaida}T${item.hora_saida}`
            ).getTime()

            // evita dados inconsistentes
            if (saida <= entrada) return

            const horas = (saida - entrada) / (1000 * 60 * 60)

            const dataBase = new Date(`${anoEntrada}-${mesEntrada}-${diaEntrada}`)
            const mes = dataBase.getMonth() + 1
            const ano = dataBase.getFullYear()

            const chave = `${mes}/${ano}`

            horasPorMes[chave] = (horasPorMes[chave] || 0) + horas
        })

        let maiorMes = null
        let maiorHoras = 0

        for (const mesAno in horasPorMes) {
            if (horasPorMes[mesAno] > maiorHoras) {
                maiorHoras = horasPorMes[mesAno]
                maiorMes = mesAno
            }
        }

        if (!maiorMes) return null

        const [mesNumero, ano] = maiorMes.split('/')
        const nomeMes = meses[Number(mesNumero) - 1]

        const diasNoMes = new Date(Number(ano), Number(mesNumero), 0).getDate()

        const mediaHorasPorDia = maiorHoras / diasNoMes

        return {
            mesMaiorOcupacao: nomeMes,
            anoMaiorOcupacao: Number(ano),
            totalHorasOcupadas: Number(maiorHoras.toFixed(2)),
            mediaHorasPorDia: mediaHorasPorDia.toFixed(2).replace(".", ",")
        }
    }

    const {
        mesMaiorOcupacao,
        anoMaiorOcupacao,
        mediaHorasPorDia
    } = mesAnoMaiorHorasOcupadas()

    const { 
        mes, 
        ano, 
        mediaPessoasPorDia
    } = mesAnoMaiorOcupacao()

    const {
        mediaDiariaFaturamento, 
        mesAnoFaturamento
    } = mesAnoMaiorFaturamento()

    const ocupacao = ocupacaoMensal()
    const faturamento = faturamentoDoMes()
    const horasOcupadasMensal = horasOcupadasNoMes()

    useEffect(() => {
        fetchReservations()
        fetchPayments()
        mesAnoMaiorHorasOcupadas()
    }, [])

    return (
        <Block>
            {tabelaDeClientes === "geral_de_faturamento" &&
                <GeralDeFaturamento />
            }

            {tabelaDeClientes === "giro_de_vagas" && 
                <GiroDeVagas 
                    mediaPessoasPorDia={mediaPessoasPorDia} 
                    mes={mes}
                    ano={ano}
                    ocupacao={ocupacao}
                    faturamento={faturamento}
                    mesAnoFaturamento={mesAnoFaturamento}
                    mediaDiariaFaturamento={mediaDiariaFaturamento}
                />
            }

            {tabelaDeClientes === "perfil_dos_clientes" &&
                <PerfilClientes />
            }

            {tabelaDeClientes === "tempo_medio_permanencia" &&
                <TempoMedioPermanencia 
                    faturamento={faturamento} 
                    mesAnoFaturamento={mesAnoFaturamento}
                    mediaDiariaFaturamento={mediaDiariaFaturamento}
                    horasOcupadasMensal={horasOcupadasMensal}
                    mesMaiorOcupacao={mesMaiorOcupacao}
                    anoMaiorOcupacao={anoMaiorOcupacao}
                    mediaHorasPorDia={mediaHorasPorDia}
                />
            }
        </Block>
    )
}

export default ReportClient