import { useEffect, useState } from "react"
import { theme } from "../../../../../../../../theme/theme"
import { useUser } from "../../../../../../../../context/globalContext"
import useAportes from "../../../../../../../../hooks/useAportes"
import useRetiradas from "../../../../../../../../hooks/useRetiradas"

const DataAportesSangrias = (props) => {

    const { dataDeInicio, dataDeTermino } = props
    const { primaryColor } = theme

    const { aportes, retiradas } = useUser()
    const { fetchAportes } = useAportes()
    const { fetchRetiradas } = useRetiradas()

    const [total, setTotal] = useState([])
    const [valoresDoAporte, setValoresDoAporte] = useState(0)
    const [valoresDaRetirada, setValoresDaRetirada] = useState(0)

    useEffect(() => {
        if (aportes.length === 0) {
            fetchAportes()
        }

        if (retiradas.length === 0) {
            fetchRetiradas()
        }
    }, [])

    useEffect(() => {
        if (dataDeInicio === "" || dataDeTermino === "") {
            
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const converterMes = month < 10 ? "0"+month : month

            const calcularAportes = () => {

                const mapAportes = aportes.filter(item => {
                    const data = item.created_at.split(", ")[0]
                    const [dia, mes, ano] = data.split('/')

                    return mes === converterMes && ano === year
                })
                const valoresAportes = mapAportes?.map(item => item.value)
                const somarValores = valoresAportes?.reduce((prev, curr) => {
                    return prev + curr
                }, 0)

                setValoresDoAporte(somarValores)
            }

            const calcularRetiradas = () => {
                const mapRetiradas = retiradas.filter(item => {
                    const data = item.created_at.split(", ")[0]
                    const [dia, mes, ano] = data.split('/')

                    return mes === converterMes && ano === year
                })
                const valoresRetiradas = mapRetiradas?.map(item => item.value)
                const somarValores = valoresRetiradas?.reduce((prev, curr) => {
                    return prev + curr
                }, 0)

                setValoresDaRetirada(somarValores)
            }

            calcularRetiradas()
            calcularAportes()

            return
        }

        if (dataDeInicio !== "" && dataDeTermino !== "") {
            const calcularAportes = () => {
                const inicio = new Date(dataDeInicio + "T00:00:00").getTime()
                const termino = new Date(dataDeTermino + "T23:59:59").getTime()

                const mapAportes = aportes.filter(item => {
                    const [data, hora = "00:00"] = item.created_at.split(", ")
                    const [dia, mes, ano] = data.split("/")
                    const dataFormatada = `${ano}-${mes}-${dia}T${hora}:00`
                    const dataItem = new Date(dataFormatada).getTime()

                    return dataItem >= inicio && dataItem <= termino
                })

                const valoresAportes = mapAportes.map(item => Number(item.value) || 0)

                const somarValores = valoresAportes.reduce((prev, curr) => {
                    return prev + curr
                }, 0)

                setValoresDoAporte(somarValores)
            }

            const calcularRetiradas = () => {
                const inicio = new Date(dataDeInicio + "T00:00:00").getTime()
                const termino = new Date(dataDeTermino + "T23:59:59").getTime()

                const mapRetiradas = retiradas.filter(item => {
                    const [data, hora = "00:00"] = item.created_at.split(", ")
                    const [dia, mes, ano] = data.split("/")
                    const dataFormatada = `${ano}-${mes}-${dia}T${hora}:00`
                    const dataItem = new Date(dataFormatada).getTime()

                    return dataItem >= inicio && dataItem <= termino
                })

                const valoresRetiradas = mapRetiradas.map(item => Number(item.value) || 0)

                const somarValores = valoresRetiradas.reduce((prev, curr) => {
                    return prev + curr
                }, 0)

                setValoresDaRetirada(somarValores)
            }

            calcularRetiradas()
            calcularAportes()
        } 
    }, [aportes, retiradas, dataDeInicio, dataDeTermino])

    useEffect(() => {
        setTotal(valoresDoAporte - valoresDaRetirada)
    }, [valoresDoAporte, valoresDaRetirada])

    const dataBarAportesSangrias = {
        labels: ["Aportes", "Retiradas", "Total"],
        datasets: [
            {
                label: "Valor total",
                data: [valoresDoAporte, valoresDaRetirada, total],
                backgroundColor: [
                    primaryColor,       
                    primaryColor,
                    primaryColor
                ],
                indexAxis: "x",
                barPercentage: 0.5
            }
        ]
    }

    const optionsBarAportesSangrias = {
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
        maintainAspectRatio: false
    }

    return { dataBarAportesSangrias, optionsBarAportesSangrias }
}

export default DataAportesSangrias