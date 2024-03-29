let reservas = 5;
let reservasDaParko = 0;
let subReserva = reservas - reservasDaParko;
let valorTotal = (reservas / reservasDaParko) * 100;

export const data = {
  labels: ["Yes", "No"],
  datasets: [
    {
      label: "Reservas feitas pelo App da Parko",
      data: [reservasDaParko, subReserva],
      weight: 10,
      borderColor: "transparent",
      backgroundColor: ["white", "#381B7A"]
    }
  ],
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Reservas feitas pelo aplicativo da Parko",
      color: "#fff",
      align: "center",
      position: "bottom",
      font: {
        family: "sans-serif",
        size: 16,
        weight: "normal",
        lineHeight: 1.2,
      },
    },
    legend: {
      display: false
    }
  },
  cutout: "75%",
  responsive: true,
  maintainAspectRatio: false,
};

export const plugins = [
  {
    beforeDraw: function (chart) {
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      const { ctx } = chart;

      ctx.save();
      ctx.font = "700 32px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${0}%`, centerX, centerY);
    }
  }
];
