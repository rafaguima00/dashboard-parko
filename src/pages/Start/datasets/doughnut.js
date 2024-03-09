let total = 24;
let disponible = 10;
let occupied = total - disponible; 

export const datachart = {
    labels: ["occupied", "disponible"],
    datasets: [
        {
            label: "Vagas Disponíveis",
            data: [occupied, disponible],
            borderColor: "transparent",
            backgroundColor: ["white", "#381B7A"]
        }
    ]
}

export const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
};