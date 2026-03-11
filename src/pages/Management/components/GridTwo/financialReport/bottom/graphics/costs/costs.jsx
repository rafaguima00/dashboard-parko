import { GraphicElement } from "../../style"
import { Bar, Pie } from "react-chartjs-2"
import { 
    BarElement, 
    CategoryScale, 
    Chart as ChartJS, 
    Legend, 
    LinearScale, 
    Tooltip 
} from "chart.js"
import GraphicCostsData from "./data"
import GraficoSegregacaoCustos from "./segregacaoPie"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { ElementLoading, Loading } from "../../../../../../style"

ChartJS.register (Legend, Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicCosts = (props) => {

    const { tabelaDeContas, dataDeInicio, dataDeTermino } = props

    const { data, options } = GraphicCostsData()
    const { dataCosts, optionsCosts } = GraficoSegregacaoCustos({ dataDeInicio, dataDeTermino })

    const custos = () => {
        return (
            <>
                <ElementLoading>
                    <Spinner size={16} speed={1} /> 
                    <Loading>Carregando...</Loading>
                </ElementLoading>
            </>
        )
    }

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
            <GraphicElement largura={40}>
                {custos()}
            </GraphicElement>
        }
    </>
}

export default GraphicCosts