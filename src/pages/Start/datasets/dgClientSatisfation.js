import { theme } from "../../../theme/theme";

const { primaryColor } = theme;

let satisfied = 0;
let notSatisfied = 100 - satisfied;

export const dataCliente = {
    labels: ["satisfied", "not satisfied"],
    datasets: [
        {
            label: "Satisfação do cliente",
            data: [satisfied, notSatisfied],
            borderColor: "transparent",
            backgroundColor: [primaryColor, "#eaeaea"]
        }
    ]
}

export const optionsClient = {
    plugins: {
        legend: {
            display: false
        }
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
};