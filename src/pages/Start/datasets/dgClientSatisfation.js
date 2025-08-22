import { useMemo } from "react"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"

const AvaliacaoDoCliente = () => {
    const { primaryColor, cancelColor } = theme
    const { ratings = [] } = useUser()

    const avaliacaoTotal = useMemo(() => {
        const totais = (Array.isArray(ratings) ? ratings : []).reduce(
            (acc, item) => {
                if (item.rate <= 2) acc.bad += 1
                else if (item.rate === 3) acc.mid += 1
                else if (item.rate >= 4) acc.good += 1
                return acc
            },
            { bad: 0, mid: 0, good: 0 }
        )

        return [totais?.good ?? 0, totais?.mid ?? 0, totais?.bad ?? 0]
    }, [ratings])

    const dadosCliente = useMemo(() => ({
        labels: ["Satisfeito", "Meio satisfeito", "Não satisfeito"],
        datasets: [
            {
                label: "Satisfação do cliente",
                data: avaliacaoTotal,
                borderColor: "transparent",
                backgroundColor: [primaryColor, "#EAEAEA", cancelColor]
            }
        ]
    }), [avaliacaoTotal])

    const opcoesCliente = useMemo(() => ({
        plugins: {
            legend: { 
                display: false 
            },
            datalabels: { 
                display: false 
            },
        },
        animation: {
            duration: 100
        },
        cutout: "70%",
        responsive: true,
        maintainAspectRatio: false,
    }), [])

    return { opcoesCliente, dadosCliente, avaliacaoTotal }
}

export default AvaliacaoDoCliente
