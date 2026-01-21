import { useEffect, useState } from "react"
import { theme } from "../../../../../../../../theme/theme"
import { useUser } from "../../../../../../../../context/globalContext"
import { useFluxoDeCaixa } from "../../../../../../../../hooks/useFluxoDeCaixa"

const DatasetBar = () => {
    const { greenColor, cancelColor } = theme

    const { dataClient } = useUser()
    const { totalFinal, despesasPorMes } = useFluxoDeCaixa(dataClient.id_establishment)

    const [total, setTotal] = useState([])
    const [entrada, setEntrada] = useState([])
    const [saida, setSaida] = useState([])

    useEffect(() => {
        if (totalFinal.length > 0 || despesasPorMes.length > 0) {

            const mapMesTotal = totalFinal.reverse().map(item => item.mes)
            const mapTotal = totalFinal.map(item => item.total)
            const mapDespesa = despesasPorMes.reverse().map(item => item.total)

            setTotal(mapMesTotal)
            setEntrada(mapTotal)
            setSaida(mapDespesa)
        }
    }, [totalFinal])

    const dataBar = {
        labels: total,
        datasets: [
            {
                label: "Saída (R$)",
                data: saida,
                backgroundColor: cancelColor,
                indexAxis: "x",
                borderRadius: 360,
                barPercentage: 0.5
            },
            {
                label: "Entrada (R$)",
                data: entrada,
                backgroundColor: greenColor,
                indexAxis: "x",
                borderRadius: 360,
                barPercentage: 0.5
            }
        ]
    }

    const optionsBar = {
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'right',
                borderRadius: 10
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }

    return { dataBar, optionsBar }

}

export default DatasetBar