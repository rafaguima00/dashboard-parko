import { useEffect, useState } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import api from "../../../../../../../../services/api/server"
import { theme } from "../../../../../../../../theme/theme"

const GraphicCostsData = () => {
        
    const { primaryColor } = theme

    const pagas = 18
    const pend = 8
    const totais = pagas + pend

    const total = [totais, pagas, pend]
    const { accounts, setAccounts, dataClient } = useUser()

    const [totalContas, setTotalContas] = useState([])

    const loadAccounts = async () => {
        const response = await api.get("/accounts")
        setAccounts(response.data)
    }

    const showAccounts = () => {
        const filterAcc = accounts.filter(
            item =>
                item.category !== "Aporte" &&
                item.id_establishment === dataClient.id_establishment
        )

        const total = filterAcc.length
        const pagas = filterAcc.filter(item => item.status === "Pago").length
        const pendentes = filterAcc.filter(item => item.status === "Pendente").length

        setTotalContas([total, pagas, pendentes])
    }

    useEffect(() => {
        loadAccounts()
    }, [])

    useEffect(() => {
        if (accounts.length > 0) {
            showAccounts()
        }
    }, [accounts])

    const data = {
        labels: ["Contas Totais", "Contas Pagas", "Contas Pendentes"],
        datasets: [
            {
                label: "Resumo de Contas",
                data: totalContas,
                backgroundColor: [
                    primaryColor,       
                    primaryColor,   
                    primaryColor 
                ],
                borderRadius: 100,
                barPercentage: 0.5
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
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: (value) => Number.isInteger(value) ? value : null
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    return { data, options }
}

export default GraphicCostsData