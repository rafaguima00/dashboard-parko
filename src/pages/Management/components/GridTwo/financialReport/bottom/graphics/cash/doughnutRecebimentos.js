import { useEffect, useState } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import api from "../../../../../../../../services/api/server"

const DoughnutRecebimentos = (props) => {

    const { dataDeInicio, dataDeTermino } = props

    const { dataClient } = useUser()

    const [pagamentos, setPagamentos] = useState([])
    const [paymentMethod, setPaymentMethod] = useState({})

    const converterData = (data) => {
        const [ano, mes, dia] = data.split("-")

        return `${dia}/${mes}/${ano}`
    }

    const loadPayments = async () => {
        try {
            const response = await api.get(`/payment/${dataClient?.id_establishment}`)
            setPagamentos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (dataClient.id_establishment) {
            loadPayments()
        }
    }, [dataClient.id_establishment])

    useEffect(() => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const converterMes = month < 10 ? "0"+month : month

        const payment_method = {
            pix: "Pix",
            credit_parko: "Crédito Parko",
            credit_card: "Crédito",
            debit_card: "Débito",
            money: "Dinheiro"
        }

        if (dataDeInicio === "" || dataDeTermino === "") {
            const showPayments = () => {
                const paymentsCurrentMonth = pagamentos.filter(item => {
                    const [dia, mes, ano] = item.data.split("/")
                    return mes === converterMes && ano === year.toString()
                })

                const groupedPayments = paymentsCurrentMonth.reduce((acc, item) => {
                    const method = item.payment_method
                    const methodName = payment_method[method] || method

                    if (!acc[method]) {
                        acc[method] = {
                            payment_method: method,
                            payment_method_label: methodName,
                            total: 0,
                            items: []
                        }
                    }

                    acc[method].total += Number(item.value_paid) || 0
                    acc[method].items.push(item)

                    return acc
                }, {})

                setPaymentMethod(groupedPayments)
            }

            showPayments()

        }

        if (dataDeInicio !== "" && dataDeTermino !== "") {
            const showPayments = () => {
                const inicio = new Date(dataDeInicio + "T00:00:00").getTime()
                const termino = new Date(dataDeTermino + "T23:59:59").getTime()

                const mapPayments = pagamentos.filter(item => {
                    const [dia, mes, ano] = item.data.split("/")
                    const dataFormatada = `${ano}-${mes}-${dia}`
                    const dataItem = new Date(dataFormatada).getTime()

                    return dataItem >= inicio && dataItem <= termino
                })

                const groupedPayments = mapPayments.reduce((acc, item) => {
                    const method = item.payment_method
                    const methodName = payment_method[method] || method

                    if (!acc[method]) {
                        acc[method] = {
                            payment_method: method,
                            payment_method_label: methodName,
                            total: 0,
                            items: []
                        }
                    }

                    acc[method].total += Number(item.value_paid) || 0
                    acc[method].items.push(item)

                    return acc
                }, {})
                
                setPaymentMethod(groupedPayments)
            }

            showPayments()
        }
    }, [pagamentos, dataDeInicio, dataDeTermino])

    const data = {
        labels: [
            "Crédito Parko",
            "Crédito",
            "Débito",
            "Dinheiro",
            "Pix",
        ],
        datasets: [
            {
                data: [
                    paymentMethod?.credit_parko?.total.toFixed(2), 
                    paymentMethod?.credit_card?.total.toFixed(2), 
                    paymentMethod?.debit_card?.total.toFixed(2), 
                    paymentMethod?.money?.total.toFixed(2), 
                    paymentMethod?.pix?.total.toFixed(2)
                ],
                backgroundColor: [
                    "#3b6dcc", 
                    "#f28c28", 
                    "#f2b705",
                    "#a6a6a6",  
                    "#5b9bd5", 
                ],
                borderWidth: 0,
                cutout: "68%",
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 18,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`
                    },
                },
            },
            title: {
                display: true,
                text: [
                    "RECEBIMENTOS",
                    dataDeInicio && dataDeTermino ? 
                    `PERÍODO DE ${converterData(dataDeInicio)} ATÉ ${converterData(dataDeTermino)}` : 
                    ""
                ],
                color: "#000",
                font: {
                    size: 20,
                    weight: "bold",
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
        },
    }

    return { options, data }
}

export default DoughnutRecebimentos