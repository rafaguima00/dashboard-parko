import { useEffect, useMemo } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import useReservation from "../../../../../../../../hooks/useReservation"

const useDoughnutChart = ({ dataDeInicio, dataDeTermino }) => {
    const { fetchReservations } = useReservation()
    const { reservations, dataClient } = useUser()

    useEffect(() => {
        if (dataClient.id_establishment) {
            fetchReservations()
        }
    }, [dataClient.id_establishment])

    const {
        clienteMensalista,
        clienteRotativoNaoParko,
        clienteRotativo,
        total
    } = useMemo(() => {
        if (!reservations || reservations.length === 0) {
            return {
                clienteMensalista: 0,
                clienteRotativoNaoParko: 0,
                clienteRotativo: 0,
                total: 0
            }
        }

        // Se quiser filtrar por data, faça aqui antes dos cálculos
        const reservasFiltradas = reservations

        const clienteParko = reservasFiltradas.filter(item => item.parko_app === 1)
        const clienteNaoParko = reservasFiltradas.filter(item => item.parko_app === 0)

        const clienteRotativo = clienteParko.reduce((acc, item) => {
            return acc + Number(item.value || 0)
        }, 0)

        const contador = clienteNaoParko.reduce((acc, item) => {
            acc[item.id_costumer] = (acc[item.id_costumer] || 0) + 1
            return acc
        }, {})

        const rotativoNaoParko = clienteNaoParko
            .filter(item => contador[item.id_costumer] === 1)
            .reduce((acc, item) => acc + Number(item.value || 0), 0)

        const mensalista = clienteNaoParko
            .filter(item => contador[item.id_costumer] > 1)
            .reduce((acc, item) => acc + Number(item.value || 0), 0)

        const total = mensalista + rotativoNaoParko + clienteRotativo

        return {
            clienteMensalista: mensalista,
            clienteRotativoNaoParko: rotativoNaoParko,
            clienteRotativo,
            total
        }
    }, [reservations, dataDeInicio, dataDeTermino])

    const values = useMemo(() => {
        return [
            clienteMensalista.toFixed(2),
            clienteRotativoNaoParko.toFixed(2),
            clienteRotativo.toFixed(2),
            total.toFixed(2)
        ]
    }, [clienteMensalista, clienteRotativoNaoParko, clienteRotativo, total])

    const data = useMemo(() => ({
        labels: [
            "Mensalista",
            "Rotativo (Não-Parko)",
            "Rotativo (Parko)",
            "Total geral"
        ],
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "#4472C4",
                    "#ED7D31",
                    "#A5A5A5",
                    "#FFC000"
                ],
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    }), [values])

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${Number(context.raw)}`
                    }
                }
            }
        }
    }), [])

    return { data, options }
}

export default useDoughnutChart