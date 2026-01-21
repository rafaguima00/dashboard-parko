import { useEffect, useState } from "react"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"
import api from "../../../services/api/server"

const DatasetBar = () => {

  const { resumoVendas, setResumoVendas, dataClient, filtrarPorData } = useUser()

  const [dataLabel, setDataLabel] = useState([])

  useEffect(() => {
    async function resumoDeVendas() {
        await api.get(`/payment/${dataClient.id_establishment}`)
        .then(res => {
            setResumoVendas(res.data)
        })
        .catch(e => {
            setResumoVendas(`Erro ao carregar resumo de vendas: ${e}`)
        })
    }

    resumoDeVendas()
  }, [])

  useEffect(() => {
    if (resumoVendas.length > 0) {
      carregarVendas()
    }
  }, [resumoVendas, filtrarPorData])

  function carregarVendas() {
      const filtrarDataDePgto = resumoVendas
        .filter(item => item.data === filtrarPorData)

      const totais = {
        "credit_card": 0,
        "debit_card": 0,
        "pix": 0,
        "money": 0
      }

      filtrarDataDePgto.forEach((item) => {
          const tipo = item.payment_method?.toLowerCase()
          const valor = Number(item.value) || 0

          const formatarStringTipo = tipo === "debit-card" || tipo === "credit-card" ? 
          tipo.replace("-", "_") : 
          tipo
          
          totais[formatarStringTipo] += valor
      })

      const valores = [
        totais.credit_card,
        totais.debit_card,
        totais.pix,
        totais.money,
      ]

      setDataLabel(valores)
  }

  const { primaryColor } = theme

  const maxIndex = dataLabel.indexOf(Math.max(...dataLabel))

  const backgroundColors = dataLabel.map((_value, index) => {
    return index === maxIndex ? primaryColor : "#c4c4c4"
  })

  const dataBar = {
    labels: ["Crédito", "Débito", "Pix", "Dinheiro"],
    datasets: [
      {
        label: "Forma de Pagamento",
        data: dataLabel,
        backgroundColor: backgroundColors,
        indexAxis: "y",
        borderRadius: 150
      }
    ]
  }

  const optionsBar = {
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Resumo de Vendas (R$)",
        position: "left",
        color: "#7d7d7d",
        font: {
          family: "Roboto Flex",
          size: 12,
          weight: "bold",
          lineHeight: 1.2,
        }
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false
      }
    },
    animation: {
        duration: 100
    },
    responsive: true,
    maintainAspectRatio: false
  }

  return { dataBar, optionsBar }

}

export default DatasetBar