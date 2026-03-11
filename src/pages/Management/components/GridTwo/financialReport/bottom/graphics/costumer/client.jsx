import { GraphicElement } from "../../style"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import DoughnutChart from "./data"
import ChartDataLabels from "chartjs-plugin-datalabels"

ChartJS.register(ArcElement, ChartDataLabels, Tooltip, Legend, Title)

const GraphicClient = (props) => {

    const { tabelaDeClientes, dataDeInicio, dataDeTermino } = props

    const { data, options } = DoughnutChart({ dataDeInicio, dataDeTermino })

    return (
        <>
            {tabelaDeClientes === "perfil_dos_clientes" && 
                <GraphicElement largura={60}>
                    <Doughnut 
                        data={data} 
                        options={options} 
                    />
                </GraphicElement>
            }
        </>
    )
}

export default GraphicClient