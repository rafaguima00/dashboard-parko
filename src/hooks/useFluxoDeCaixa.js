import { useEffect, useState } from "react"
import api from "../services/api/server"

export const useFluxoDeCaixa = (id_establishment, diferencaDeMesesParaHoje) => {
    const [recebimentos, setRecebimentos] = useState([])
    const [aportes, setAportes] = useState([])
    const [retiradas, setRetiradas] = useState([])
    const [totalFinal, setTotalFinal] = useState([])
    const [despesasPorMes, setDespesasPorMes] = useState([])
    const [saldoFinal, setSaldoFinal] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    const gerarListaUltimos5Meses = () => {
        const hoje = new Date()
        const meses = []

        for (let i = 0; i < (diferencaDeMesesParaHoje ? diferencaDeMesesParaHoje + 1 : 5); i++) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
            meses.push(`${nomesMeses[data.getMonth()]}/${data.getFullYear()}`)
        }
        return meses
    }

    const filtrarPorUltimos5Meses = (rawDate) => {
        const hoje = new Date()
        const dataCorte = new Date(hoje.getFullYear(), hoje.getMonth() - (diferencaDeMesesParaHoje ? diferencaDeMesesParaHoje - 1 : 4), 1)

        const dataStr = rawDate.split(",")[0].trim()
        const [dia, mes, ano] = dataStr.split("/").map(Number)
        const dataItem = new Date(ano, mes - 1, dia)

        return dataItem >= dataCorte
    }

    const somarPorMes = (dados, campoData, campoValor) => {
        const meses = gerarListaUltimos5Meses()
        const totais = {}
        meses.forEach(m => totais[m] = 0)

        dados.forEach(item => {
            const dataStr = item[campoData].split(",")[0].trim()
            const [dia, mes, ano] = dataStr.split("/").map(Number)
            const nomeMes = nomesMeses[mes - 1]
            const mesAno = `${nomeMes}/${ano}`

            if (totais.hasOwnProperty(mesAno)) {
                totais[mesAno] += Number(item[campoValor]) || 0
            }
        })

        return meses.map(m => ({
            mes: m,
            total: totais[m]
        }))
    }

    const loadRecebimentos = async () => {
        const response = await api.get(`/payment/${id_establishment}`)

        const filtrados = response.data.filter(item =>
            filtrarPorUltimos5Meses(item.data)
        )

        return somarPorMes(filtrados, "data", "value")
    }

    const loadAportes = async () => {
        const response = await api.get("/accounts")

        const filtrados = response.data.filter(item =>
            item.id_establishment === id_establishment &&
            item.category === "Aporte" &&
            filtrarPorUltimos5Meses(item.date_created)
        )

        return somarPorMes(filtrados, "date_created", "value")
    }

    const loadRetiradas = async () => {
        const response = await api.get("/accounts")

        const filtrados = response.data.filter(item => 
            item.id_establishment === id_establishment &&
            item.category === "Retirada" &&
            filtrarPorUltimos5Meses(item.date_created)
        )
                
        return somarPorMes(filtrados, "date_created", "value")
    }

    const loadDespesas = async () => {
        const response = await api.get("/accounts")

        const filtrados = response.data.filter(item =>
            item.id_establishment === id_establishment &&
            item.category !== "Aporte" &&
            filtrarPorUltimos5Meses(item.date_created)
        )

        return somarPorMes(filtrados, "date_created", "value")
    }

    const somarRecebimentosEAportes = (rec, apo) => {
        return rec.map((r, i) => ({
            mes: r.mes,
            total: r.total + apo[i].total
        }))
    }

    const calcularSaldoFinal = (recebMaisAportes, despesas) => {
        return recebMaisAportes.map((item, i) => ({
            mes: item.mes,
            total: item.total - despesas[i].total
        }))
    }

    const loadFluxo = async () => {
        try {
            setLoading(true)
            setError(null)

            const [rec, apo, dep, ret] = await Promise.all([
                loadRecebimentos(),
                loadAportes(),
                loadDespesas(),
                loadRetiradas()
            ])

            setRecebimentos(rec)
            setAportes(apo)
            setDespesasPorMes(dep)
            setRetiradas(ret)

            const totalApoRec = somarRecebimentosEAportes(rec, apo)
            setTotalFinal(totalApoRec)

            const saldo = calcularSaldoFinal(totalApoRec, dep)
            setSaldoFinal(saldo)

        } catch (err) {
            console.error(err)
            setError("Erro ao carregar fluxo de caixa")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id_establishment || diferencaDeMesesParaHoje) loadFluxo()
    }, [id_establishment, diferencaDeMesesParaHoje])

    return {
        recebimentos,
        aportes,
        retiradas,
        despesasPorMes,
        totalFinal,
        saldoFinal,
        loading,
        error,
        reload: loadFluxo
    }
}