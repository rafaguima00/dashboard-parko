import { GraphicElement } from "../../style"
import { Bar, Pie } from "react-chartjs-2"
import { 
    BarElement, 
    CategoryScale, 
    Chart as ChartJS, 
    Legend, 
    LinearScale, 
    Title,
    Tooltip 
} from "chart.js"
import GraphicCostsData from "./data"
import GraficoSegregacaoCustos from "./segregacaoPie"
import CostCategoryChart from "./costCategoryChart"

ChartJS.register (Legend, Title, Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicCosts = (props) => {

    const { tabelaDeContas, dataDeInicio, dataDeTermino } = props

    const { data, options } = GraphicCostsData()
    const { dataCosts, optionsCosts } = GraficoSegregacaoCustos({ dataDeInicio, dataDeTermino })
    const { dataCostCategory, optionsCostCategory } = CostCategoryChart({ dataDeInicio, dataDeTermino })

    return <>
        {tabelaDeContas === "geral_de_contas" &&
            <GraphicElement largura={40}>
                <Bar 
                    data={data}
                    options={options}
                />
            </GraphicElement>
        }
        {tabelaDeContas === "segregacao" &&
            <GraphicElement largura={40}>
                <Pie 
                    data={dataCosts}
                    options={optionsCosts}
                />
            </GraphicElement>
        }

        {tabelaDeContas === "custos_por_categoria" &&
            <GraphicElement largura={80}>
                <Bar 
                    data={dataCostCategory}
                    options={optionsCostCategory}
                />
            </GraphicElement>
        }
    </>
}

export default GraphicCosts