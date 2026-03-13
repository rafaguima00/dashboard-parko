import { Bar, Doughnut } from "react-chartjs-2"
import { Graphics } from "../style"
import { useUser } from "../../../context/globalContext"
import DatasetBar from "../datasets/bar"
import DataSetDoughnut from "../datasets/doughnut"

const GraphicsContent = () => {

    const { dataBar, optionsBar } = DatasetBar()
    const { data, options, plugins } = DataSetDoughnut()

    const { reservaAppParko } = useUser()

    return <>
        <Graphics>
            <div style={{ padding: 10 }}>
                <Bar data={dataBar} options={optionsBar} />
            </div>
            
            <div style={{ padding: 10 }}>
                {reservaAppParko && 
                    <Doughnut data={data} options={options} plugins={plugins} />
                }
            </div>
        </Graphics>
    </>
}

export default GraphicsContent