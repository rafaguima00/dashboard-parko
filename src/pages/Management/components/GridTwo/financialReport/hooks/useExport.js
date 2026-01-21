import * as XLSX from "xlsx"
import { useUser } from "../../../../../../context/globalContext"
import { useFluxoDeCaixa } from "../../../../../../hooks/useFluxoDeCaixa"
import { useEffect, useState } from "react"
import { formatCurrency } from "../../../../../../utils/FormatCurrency"
import api from "../../../../../../services/api/server"

const useExport = () => {

    const { dataClient } = useUser()
    const { 
        totalFinal, 
        despesasPorMes,
        aportes,
        retiradas,
        recebimentos
    } = useFluxoDeCaixa(dataClient.id_establishment)

    const [pagamentos, setPagamentos] = useState([])
    const [fluxoDeCaixa, setValorFluxoDeCaixa] = useState([])
    const [loading, setLoading] = useState(true)

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    const loadPayments = async () => {
        try {
            const response = await api.get(`/payment/${dataClient?.id_establishment}`)
            setPagamentos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const somarPorMes = (dados, metodoPagamento, month) => {
        if (!dados) return

        const totais = {}

        dados.forEach(item => {
            if (item.payment_method !== metodoPagamento) return

            const [dia, mes, ano] = item.data.split("/").map(Number)

            const mesExtenso = `${nomesMeses[mes - 1]}/${ano}`

            if (!totais[mesExtenso]) {
                totais[mesExtenso] = 0
            }

            totais[mesExtenso] += Number(item.value)
        })

        const total = Object.entries(totais).map(([mes, total]) => ({
            mes,
            total
        }))
       
        const mapArray = total.filter(item => item.mes.split("/")[0].toLowerCase() === month.toLowerCase())
        return mapArray[0]?.total ? formatCurrency(mapArray[0]?.total, "BRL") : formatCurrency(0, "BRL")
    }

    const aberturaCaixa = async () => {
        const result = await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)

        filtrarUltimos5Meses(result.data)
    }

    const filtrarUltimos5Meses = (array) => {
        const hoje = new Date()

        // Primeiro dia do mês atual menos 4 meses
        const dataCorte = new Date(
            hoje.getFullYear(),
            hoje.getMonth() - 4,
            1
        )

        const dadosFiltrados = array.filter(item => {
            if (!item.data_fechamento) return false

            const [dia, mes, ano] = item.data_fechamento.split("/").map(Number)
            const dataFechamento = new Date(ano, mes - 1, dia)

            return dataFechamento >= dataCorte
        })

        setValorFluxoDeCaixa(dadosFiltrados) 
    }

    const gerarUltimos5Meses = () => {
        const hoje = new Date()
        const meses = []

        for (let i = 4; i >= 0; i--) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)

            meses.push({
                key: `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`,
                label: `${nomesMeses[data.getMonth()]}/${data.getFullYear()}`
            })
        }

        return meses
    }

    const mapearFluxoDeCaixaPorMes = () => {
        const map = {}

        fluxoDeCaixa.forEach(item => {
            if (!item.data_fechamento) return

            const [dd, mm, yyyy] = item.data_fechamento.split("/")
            const key = `${yyyy}-${mm}`

            map[key] = Number(item.valor_fechamento) || 0
        })

        return map
    }

    const gerarFluxoMensalExport = () => {
        const meses = gerarUltimos5Meses()
        const mapaFluxo = mapearFluxoDeCaixaPorMes()

        return meses.map(mes => ({
            mes: mes.label,
            total: mapaFluxo[mes.key] ?? 0
        }))
    }

    const exportRelatorioDeFluxoDeCaixa = () => {

        const mesesBase = gerarUltimos5Meses().map(item => item.label)

        const entradaFaturamento = totalFinal.reverse().map(item => item.total)
        const saidaFaturamento = despesasPorMes.reverse().map(item => item.total)

        const fluxoMensal = gerarFluxoMensalExport()
        const valorFluxoDeCaixa = fluxoMensal.map(item => item.total)

        const linhasExcel = mesesBase.map((mes, index) => ({
            Mês: mes,
            Entrada: formatCurrency(entradaFaturamento[index] || 0, 'BRL'),
            Saída: formatCurrency(saidaFaturamento[index] || 0, 'BRL'),
            "Fluxo de Caixa": formatCurrency(valorFluxoDeCaixa[index] || 0, 'BRL')
        }))

        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(linhasExcel)

        XLSX.utils.book_append_sheet(wb, ws, `Faturamento e caixa`)

        XLSX.writeFile(wb, `Faturamento e caixa ${dataClient.establishment} ${new Date().toLocaleDateString("pt-br")}.xlsx`)
            
    }

    const exportRelatorioDeAportesESangrias = () => {
        const mapa = {}

        // Inicializa com aportes
        aportes.forEach(item => {
            mapa[item.mes] = {
                mes: item.mes,
                aporte: Number(item.total) || 0,
                retirada: 0,
                saldo: 0
            }
        })

        // Soma retiradas
        retiradas.forEach(item => {
            if (!mapa[item.mes]) {
                mapa[item.mes] = {
                    mes: item.mes,
                    aporte: 0,
                    retirada: Number(item.total) || 0,
                    saldo: 0
                }
            } else {
                mapa[item.mes].retirada = Number(item.total) || 0
            }
        })

        // Calcula saldo
        const resultado =  Object.values(mapa).reverse().map(item => ({
            Mês: item.mes,
            Aporte: formatCurrency(item.aporte, 'BRL'),
            Retirada: formatCurrency(item.retirada, 'BRL'),
            Saldo: formatCurrency(item.aporte - item.retirada, 'BRL')
        }))

        const ws = XLSX.utils.json_to_sheet(resultado)
        const wb = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(wb, ws, "Aportes e Sangrias")

        XLSX.writeFile(
            wb,
            `Aportes e Sangrias ${dataClient.establishment} ${new Date().toLocaleDateString("pt-br")}.xlsx`
        )

    }

    const exportRelatorioDeRecebimentos = () => {

        const PAYMENT_MAP = {
            credit_card: "credito",
            debit_card: "debito",
            pix: "pix",
            money: "dinheiro",
            debit: "creditoParko"
        }

        const mapearPagamentosPorMes = (pagamentos) => {
            const map = {}

            pagamentos.forEach(item => {
                if (item.status !== "approved") return

                const [dia, mes, ano] = item.data.split("/")
                const key = `${ano}-${mes}`

                if (!map[key]) {
                    map[key] = {
                        credito: 0,
                        debito: 0,
                        pix: 0,
                        dinheiro: 0,
                        creditoParko: 0,
                        total: 0
                    }
                }

                const campo = PAYMENT_MAP[item.payment_method]
                const valor = Number(item.value) || 0

                if (campo) {
                    map[key][campo] += valor
                    map[key].total += valor
                }
            })

            return map
        }

        const gerarTabelaPagamentosUltimos5Meses = (pagamentos) => {
            const mesesBase = gerarUltimos5Meses()
            const mapaPagamentos = mapearPagamentosPorMes(pagamentos)

            return mesesBase.map(mes => {
                const dados = mapaPagamentos[mes.key] || {}
                
                return {
                    Mês: mes.label,
                    Crédito: formatCurrency(dados.credito || 0, 'BRL'),
                    Débito: formatCurrency(dados.debito || 0, 'BRL'),
                    Pix: formatCurrency(dados.pix || 0, 'BRL'),
                    Dinheiro: formatCurrency(dados.dinheiro || 0, 'BRL'),
                    "Crédito Parko": formatCurrency(dados.creditoParko || 0, 'BRL'),
                    Total: formatCurrency(dados.total || 0, 'BRL')
                }
            })
        }

        const tabelaPagamentos = gerarTabelaPagamentosUltimos5Meses(pagamentos)

        const ws = XLSX.utils.json_to_sheet(tabelaPagamentos)
        const wb = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(wb, ws, "Recebimentos")

        XLSX.writeFile(
            wb,
            `Pagamentos ${dataClient.establishment} ${new Date().toLocaleDateString("pt-br")}.xlsx`
        )

    }

    useEffect(() => {
        aberturaCaixa()
        loadPayments()
    }, [])

    useEffect(() => {
        if (fluxoDeCaixa.length > 0) {
            setLoading(false)
        }
    }, [fluxoDeCaixa])

    return { exportRelatorioDeAportesESangrias, exportRelatorioDeRecebimentos, exportRelatorioDeFluxoDeCaixa }
}

export default useExport