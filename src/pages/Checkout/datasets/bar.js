import { theme } from "../../../theme/theme";

const { primaryColor } = theme;

const dataLabel = [0, 0, 0, 0];

const maxIndex = dataLabel.indexOf(Math.max(...dataLabel));

const backgroundColors = dataLabel.map((_value, index) => {
  return index === maxIndex ? primaryColor : "#c4c4c4";
});

export const dataBar = {
  labels: ["Crédito", "Débito", "Pix", "Dinheiro"],
  datasets: [
    {
      label: "Formas de Pagamento",
      data: dataLabel,
      backgroundColor: backgroundColors,
      indexAxis: "y",
      borderRadius: 150,
    },
  ],
};

export const optionsBar = {
  scales: {
    xAxes: [{ ticks: { mirror: true } }],
  },
  plugins: {
    title: {
      display: true,
      text: "Resumo de Vendas (R$)",
      position: "left",
      color: "#7d7d7d",
      font: {
        family: "sans-serif",
        size: 12,
        weight: "bold",
        lineHeight: 1.2,
      },
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: "red",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};