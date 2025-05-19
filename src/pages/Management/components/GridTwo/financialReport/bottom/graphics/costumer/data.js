import { theme } from "../../../../../../../../theme/theme"

const { primaryColor } = theme

const total = [0, 0, 0, 0, 0, 0, 0, 0, 0]

export const data = {
    labels: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    datasets: [
    {
        label: "Contas Totais",
        data: total,
        backgroundColor: primaryColor,
        indexAxis: "x",
        borderRadius: 360,
        barPercentage: 0.7
    }
  ]
}

export const options = {
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            display: true,
            color: "#fff"
        }
    },
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
    responsive: true,
    maintainAspectRatio: false
}