const VagasDisponiveisDataset = ({ park }) => {

    function quantidadeVagas() {
        let vagasDisponiveis = (park?.numero_vagas ?? 0) - (park?.vagas_ocupadas ?? 0)
        let vagasIndisponiveis = park?.vagas_ocupadas ?? 0

        return { vagasDisponiveis, vagasIndisponiveis }
    }

    const { vagasDisponiveis, vagasIndisponiveis } = quantidadeVagas()

    const datachart = {
        labels: ["Ocupado", "Disponível"],
        datasets: [
            {
                label: "Vagas Disponíveis",
                data: [vagasIndisponiveis, vagasDisponiveis],
                borderColor: "transparent",
                backgroundColor: ["white", "#381B7A"]
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: false
            }
        },
        animation: {
            duration: 100
        },
        cutout: "70%",
        responsive: true,
        maintainAspectRatio: false,
    }

    return { datachart, options }
}

export default VagasDisponiveisDataset
