import { useEffect, useMemo } from "react"
import api from "../../../services/api/server"
import { useUser } from "../../../context/globalContext"

const DataSetDoughnut = () => {
  
  const { 
    dataClient, 
    setReservations, 
    reservations, 
    reservaNaoParko, 
    setReservaNaoParko, 
    reservaAppParko, 
    setReservaAppParko
  } = useUser()

  useEffect(() => {
    if (!dataClient?.id_establishment) return
    api.get(`/reservations/parking/${dataClient.id_establishment}`)
      .then(res => setReservations(res.data))
      .catch(e => console.log(e))
  }, [dataClient])

  useEffect(() => {
    if (!Array.isArray(reservations)) return

    const mapReservations = reservations.map(item => Number(item.parko_app))
    setReservaAppParko(mapReservations.filter(item => item === 1).length)
    setReservaNaoParko(mapReservations.filter(item => item === 0).length)
  }, [reservations])

  const appPercent = useMemo(() => {
    const total = reservaAppParko + reservaNaoParko
    return total > 0 ? Number(((reservaAppParko * 100) / total).toFixed(2)) : "0"
  }, [reservaAppParko, reservaNaoParko])

  const data = useMemo(() => ({
    labels: [
      "Reservas feitas pelo App Parko",
      "Reservas NÃO feitas pelo App Parko"
    ],
    datasets: [
      {
        label: "Reservas (%)",
        data: [reservaAppParko, reservaNaoParko],
        weight: 10,
        borderColor: "transparent",
        backgroundColor: ["white", "#381B7A"]
      }
    ]
  }), [reservaAppParko, reservaNaoParko])

  const plugins = useMemo(() => [
    {
      beforeDraw(chart) {
        if (!chart?.getDatasetMeta(0)?.data) return
        const { ctx } = chart
        const centerX = chart.getDatasetMeta(0).data[0].x
        const centerY = chart.getDatasetMeta(0).data[0].y

        ctx.save()
        ctx.font = `700 24px Roboto Flex`
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${appPercent !== null ? `${appPercent}%` : 'Carregando...'}`, centerX, centerY)
      }
    }
  ], [appPercent])

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Reservas feitas pelo aplicativo da Parko",
        color: "#fff",
        align: "center",
        position: "bottom",
        font: {
          family: "Roboto Flex",
          size: 16,
          weight: "normal",
          lineHeight: 1.2,
        }
      },
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
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false
  }

  return { data, options, plugins }
}

export default DataSetDoughnut
