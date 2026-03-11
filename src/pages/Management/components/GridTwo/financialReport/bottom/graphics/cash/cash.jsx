import { Bar, Doughnut } from "react-chartjs-2"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js"
import { GraphicElement } from "../../style"
import DatasetBar from "./dataFluxoDeCaixa"
import DataAportesSangrias from "./datasetBarAportesSangrias"
import DoughnutRecebimentos from "./doughnutRecebimentos"

ChartJS.register(Legend, Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicFlow = (props) => {

    const { tabelaDeFaturamento, dataDeInicio, dataDeTermino } = props

    const { dataBar, optionsBar } = DatasetBar()
    const { dataBarAportesSangrias, optionsBarAportesSangrias } = DataAportesSangrias({ dataDeInicio, dataDeTermino })
    const { data, options } = DoughnutRecebimentos({ dataDeInicio, dataDeTermino })

    return (
        <>
            {tabelaDeFaturamento === "fluxo_de_caixa" && 
                <GraphicElement largura={60}>
                    <Bar
                        data={dataBar}
                        options={optionsBar}
                    />
                </GraphicElement>
            }
            {tabelaDeFaturamento === "aportes_e_sangrias" &&
                <GraphicElement largura={60}>
                    <Bar 
                        data={dataBarAportesSangrias}
                        options={optionsBarAportesSangrias}
                    />
                </GraphicElement>
            }
            {tabelaDeFaturamento === "recebimentos" &&
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

export default GraphicFlow