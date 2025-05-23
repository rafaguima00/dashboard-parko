import { Bar } from "react-chartjs-2"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js"
import { data, options } from "./data"
import { GraphicElement } from "../../style"

ChartJS.register(Legend, Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicFlow = () => {
    return (
        <GraphicElement largura={60}>
            <Bar
                data={data}
                options={options}
            />
        </GraphicElement>
    )
}

export default GraphicFlow