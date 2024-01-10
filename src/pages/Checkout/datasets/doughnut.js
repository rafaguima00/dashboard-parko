let yes = 64;
let no = 100 - yes;

export const data = {
  labels: ["Yes", "No"],
  datasets: [
    {
      label: "Formas de Pagamento",
      data: [yes, no],
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
      ctx.fillText(`${yes}%`, centerX, centerY);
    }
  }
];
