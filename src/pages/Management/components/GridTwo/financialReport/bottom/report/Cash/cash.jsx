import { Block, Table } from "../../style"
import { useEffect, useState } from "react"
import FluxoDeCaixa from "./fluxoDeCaixa"
import AportesSangrias from "./aportesSangrias"
import Recebimentos from "./recebimentos"

const ReportCash = (props) => {

    const { 
        tabelaDeFaturamento, 
        totalFinal, 
        despesasPorMes, 
        aportes, 
        retiradas,
        recebimentos,
        dataDeInicio,
        dataDeTermino
    } = props

    const [resultado, setResultado] = useState([])

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const dateToday = () => {
        if (dataDeInicio && dataDeTermino) {
            const inicio = new Date(dataDeInicio)
            const termino = new Date(dataDeTermino)

            const result = []
            const dataAtual = new Date(inicio)

            while (dataAtual <= termino) {
                result.push({
                    month: meses[dataAtual.getMonth()],
                    monthIndex: dataAtual.getMonth(),
                    year: dataAtual.getFullYear()
                })

                dataAtual.setMonth(dataAtual.getMonth() + 1)
            }

            return { result }
        }

        // últimos 5 meses
        const hoje = new Date()
        const result = []

        for (let i = 4; i >= 0; i--) {
            const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)

            result.push({
                month: meses[d.getMonth()],
                monthIndex: d.getMonth(),
                year: d.getFullYear()
            })
        }

        return { result }
    }

    const { result } = dateToday()

    const gerarMesesPorPeriodo = (dataInicio, dataFim) => {
        const result = []

        const start = new Date(dataInicio)
        const end = new Date(dataFim)

        start.setDate(1)
        end.setDate(1)

        while (start <= end) {
            const mes = String(start.getMonth() + 1).padStart(2, "0")
            const ano = start.getFullYear()

            result.push({
                month: `${mes}/${ano}`,
                code: mes
            })

            start.setMonth(start.getMonth() + 1)
        }

        return result
    }

    useEffect(() => {
        if (!dataDeInicio || !dataDeTermino) return

        const meses = gerarMesesPorPeriodo(dataDeInicio, dataDeTermino)
        setResultado(meses)
    }, [dataDeInicio, dataDeTermino])

    useEffect(() => {
        console.log(resultado)
    }, [resultado])

    useEffect(() => {
        dateToday()
    }, [])

    return (
        <Block>
            <Table>
                {tabelaDeFaturamento === "fluxo_de_caixa" &&
                    <FluxoDeCaixa 
                        resultado={resultado}
                        result={result} 
                        totalFinal={totalFinal} 
                        despesasPorMes={despesasPorMes}
                        dataDeInicio={dataDeInicio}
                        dataDeTermino={dataDeTermino}
                    />
                }
                {tabelaDeFaturamento === "aportes_e_sangrias" &&
                    <AportesSangrias 
                        result={result} 
                        aportes={aportes}
                        retiradas={retiradas}
                    />
                }
                {tabelaDeFaturamento === "recebimentos" &&
                    <Recebimentos result={result} recebimentos={recebimentos} />
                }
            </Table>
        </Block>
    )
}

export default ReportCash