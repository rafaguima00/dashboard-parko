import { GraphicElement } from "../../style"
import { Bar } from "react-chartjs-2"
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js"
import { data, options } from "./data"

ChartJS.register (Tooltip, CategoryScale, LinearScale, BarElement)

const GraphicCosts = () => {
    return (
        <GraphicElement largura={40}>
            <Bar 
                data={data}
                options={options}
            />
        </GraphicElement>
    )
}

export default GraphicCosts