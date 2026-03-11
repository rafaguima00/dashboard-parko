import { useEffect, useMemo } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import api from "../../../../../../../../services/api/server"

const CostCategoryChart = ({ dataDeInicio, dataDeTermino }) => {

    const labels = [
        "Energia", 
        "Contabilidade", 
        "Aporte", 
        "Retirada", 
        "Aluguel do espaço ou terreno", 
        "Salários fixos da equipe", 
        "Seguros", 
        "Licenças e alvarás", 
        "Serviços de contabilidade e jurídicos", 
        "Sistemas e softwares de gestão", 
        "Despesas administrativas", 
        "Manutenção de Equipamentos", 
        "Marketing", 
        "Materiais de Limpeza"
    ]

    const { dataClient, setAccounts, accounts } = useUser()

    const parseDateBR = (dateString) => {
        if (!dateString) return null

        const onlyDate = dateString.split(",")[0].trim()
        const [day, month, year] = onlyDate.split("/")

        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    const parseDateInput = (dateString) => {
        if (!dateString) return null

        const [year, month, day] = dateString.split("-")
        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    const fetchAccounts = async () => {
        try {
            const response = await api.get(`/accounts/${dataClient.id_establishment}`)

            setAccounts(response.data)
        } catch (error) {
            console.error(error)  
        } 
    }

    useEffect(() => {
        if (dataClient?.id_establishment) {
            fetchAccounts()
        }
    }, [dataClient?.id_establishment])

    const dataCostCategory = useMemo(() => {
        const inicio = parseDateInput(dataDeInicio)
        const termino = parseDateInput(dataDeTermino)

        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)

        const totais = {
            Vencido: {},
            Pago: {},
            "A Vencer": {}
        }

        labels.forEach((label) => {
            totais.Vencido[label] = 0
            totais.Pago[label] = 0
            totais["A Vencer"][label] = 0
        })

        const filteredAccounts = accounts.filter((item) => {
            const paymentDate = parseDateBR(item.date_payment)
            if (!paymentDate) return false

            if (inicio && paymentDate < inicio) return false
            if (termino && paymentDate > termino) return false

            return true
        })

        filteredAccounts.forEach((item) => {
            const paymentDate = parseDateBR(item.date_payment)
            const value = Number(item.value) || 0
            const category = item.category

            if (!labels.includes(category)) return

            if (item.status === "Pago") {
                totais.Pago[category] += value
                return
            }

            if (item.status === "Pendente") {
                if (paymentDate < hoje) {
                    totais.Vencido[category] += value
                } else {
                    totais["A Vencer"][category] += value
                }
            }
        })

        return {
            labels,
            datasets: [
                {
                    label: "Vencido",
                    data: labels.map((label) => totais.Vencido[label]),
                    backgroundColor: "#b3b3b3",
                    borderRadius: 2,
                    stack: "total",
                },
                {
                    label: "Pago",
                    data: labels.map((label) => totais.Pago[label]),
                    backgroundColor: "#f28c28",
                    borderRadius: 2,
                    stack: "total",
                },
                {
                    label: "A Vencer",
                    data: labels.map((label) => totais["A Vencer"][label]),
                    backgroundColor: "#4a78d1",
                    borderRadius: 2,
                    stack: "total",
                },
            ],
        }
    }, [accounts, dataDeInicio, dataDeTermino])

    const optionsCostCategory = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    boxWidth: 14,
                    boxHeight: 14,
                },
            },
            title: {
                display: true,
                font: {
                    size: 16,
                    weight: "normal",
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
            tooltip: {
                callbacks: {
                label: function (context) {
                    const value = context.raw || 0
                    return `${context.dataset.label}: R$ ${value.toLocaleString("pt-BR")}`
                },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    maxRotation: 50,
                    minRotation: 50,
                    color: "#444",
                    font: {
                        size: 11,
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString("pt-BR")
                    },
                },
            },
        }
    }

    return { dataCostCategory, optionsCostCategory }
}

export default CostCategoryChart