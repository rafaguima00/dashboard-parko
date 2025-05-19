import { theme } from "../../../../../../../../theme/theme"

const { primaryColor } = theme

const pagas = 0
const pend = 0
const totais = pagas + pend

const total = [totais, pagas, pend]

export const data = {
    labels: ["Contas Totais", "Contas Pagas", "Contas Pendentes"],
    datasets: [
    {
        label: "Contas Totais",
        data: total,
        backgroundColor: primaryColor,
        indexAxis: "x",
        borderRadius: 360,
        barPercentage: 0.5
    }
  ],
}

export const options = {
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            display: false
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
    maintainAspectRatio: false,
}