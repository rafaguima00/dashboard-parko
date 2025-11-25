import { theme } from "../../../../../../../../theme/theme"

const { greenColor, cancelColor } = theme

const entrada = [0, 0, 0, 0]
const saida = [0, 0, 0, 0]

export const data = {
    labels: ["Agosto", "Setembro", "Outubro", "Novembro"],
    datasets: [
        {
            label: "Entrada (R$)",
            data: entrada,
            backgroundColor: greenColor,
            indexAxis: "x",
            borderRadius: 360,
            barPercentage: 0.5
        },
        {
            label: "Saída (R$)",
            data: saida,
            backgroundColor: cancelColor,
            indexAxis: "x",
            borderRadius: 360,
            barPercentage: 0.5
        }
    ]
}

export const options = {
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
