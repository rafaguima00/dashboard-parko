import { Bar } from "react-chartjs-2"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js"
import { GraphicElement } from "../../style"
import DatasetBar from "./data"

ChartJS.register(Legend, Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicFlow = () => {

    const { dataBar, optionsBar } = DatasetBar()

    return (
        <GraphicElement largura={60}>
            <Bar
                data={dataBar}
                options={optionsBar}
            />
        </GraphicElement>
    )
}

export default GraphicFlow