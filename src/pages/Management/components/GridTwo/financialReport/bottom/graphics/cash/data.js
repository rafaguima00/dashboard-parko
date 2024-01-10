import { theme } from "../../../../../../../../theme/theme";

const { greenColor, cancelColor } = theme;

const entrada = [600, 700, 210, 332];
const saida = [-400, -400, -110, -155];

export const data = {
    labels: ["Setembro", "Outubro", "Novembro", "Dezembro"],
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
  ],
};

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
    maintainAspectRatio: false,
};
