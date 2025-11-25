import { Block, Table } from "../../style"
import { cashFlow } from "../../../../../../map/cashFlow"
import { useEffect } from "react"
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
        recebimentos
    } = props

    const dateToday = () => {
        const currentMonthIndex = new Date().getMonth()
        const result = []

        for (let i = 4; i >= 0; i--) {
            const index = (currentMonthIndex - i + 12) % 12
            result.push(cashFlow[index])
        }

        return { result }
    }

    const { result } = dateToday()

    useEffect(() => {
        dateToday()
    }, [])

    return (
        <Block>
            <Table>
                {tabelaDeFaturamento === "fluxo_de_caixa" &&
                    <FluxoDeCaixa 
                        result={result} 
                        totalFinal={totalFinal} 
                        despesasPorMes={despesasPorMes}
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