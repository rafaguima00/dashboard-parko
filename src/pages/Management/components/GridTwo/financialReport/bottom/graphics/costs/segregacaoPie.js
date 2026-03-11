import { useEffect, useState } from "react";
import { useUser } from "../../../../../../../../context/globalContext";
import api from "../../../../../../../../services/api/server";

const GraficoSegregacaoCustos = (props) => {

    const { dataDeInicio, dataDeTermino } = props

    const { dataClient, setAccounts, accounts } = useUser()

    const [costType, setCostType] = useState({})

    const converterData = (data) => {
        const [ano, mes, dia] = data.split("-")

        return `${dia}/${mes}/${ano}`
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
        fetchAccounts()
    }, [])

    useEffect(() => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const converterMes = month < 10 ? "0"+month : month

        const costs = {
            Fixo: "fixo",
            Variável: "variavel"
        }

        if (dataDeInicio === "" || dataDeTermino === "") {
            const showAccounts = () => {
                const accountsCurrentMonth = accounts.filter(item => {
                    const data = item.date_created.split(", ")[0]
                    const [dia, mes, ano] = data.split("/")

                    return mes === converterMes && ano === year.toString()
                })

                const groupedAccounts = accountsCurrentMonth.reduce((acc, item) => {
                    const cost = item.cost
                    const costName = costs[cost] || cost

                    if (!acc[costName]) {
                        acc[costName] = {
                            cost: cost,
                            cost_label: costName,
                            total: 0,
                            items: []
                        }
                    }

                    acc[costName].total += Number(item.value) || 0
                    acc[costName].items.push(item)

                    return acc
                }, {})

                setCostType(groupedAccounts)
            }

            showAccounts()
        }

        if (dataDeInicio !== "" && dataDeTermino !== "") {
            const showAccounts = () => {
                const inicio = new Date(dataDeInicio).getTime()
                const termino = new Date(dataDeTermino).getTime()

                const mapAccounts = accounts.filter(item => {
                    const data = item.date_created.split(", ")[0]
                    const [dia, mes, ano] = data.split("/")
                    const dataFormatada = `${ano}-${mes}-${dia}`
                    const dataItem = new Date(dataFormatada).getTime()

                    return dataItem >= inicio && dataItem <= termino
                })

                const groupedAccounts = mapAccounts.reduce((acc, item) => {
                    const cost = item.cost
                    const costName = costs[cost]

                    if (!acc[costName]) {
                        acc[costName] = {
                            cost: cost,
                            cost_label: costName,
                            total: 0,
                            items: []
                        }
                    }

                    acc[costName].total += Number(item.value) || 0
                    acc[costName].items.push(item)

                    return acc
                }, {})
                
                setCostType(groupedAccounts)
            }

            showAccounts()
        }
    }, [accounts, dataDeInicio, dataDeTermino])

    const totalFixo = Number(costType?.fixo?.total ?? 0)
    const totalVariavel = Number(costType?.variavel?.total ?? 0)
    const totalGeral = totalFixo + totalVariavel

    const dataCosts = {
        labels: ["Fixo", "Variável", "Total geral"],
        datasets: [
            {
                data: [totalFixo, totalVariavel, totalGeral],
                backgroundColor: ["#4472C4", "#ED7D31", "#A5A5A5"],
                borderWidth: 0
            }
        ]
    };

    const optionsCosts = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
            title: {
                display: true,
                text: [
                    "SEGREGAÇÃO DE CUSTOS",
                    dataDeInicio && dataDeTermino ? 
                    `PERÍODO DE ${converterData(dataDeInicio)} ATÉ ${converterData(dataDeTermino)}` : 
                    ""
                ],
                color: "#000",
                font: {
                    size: 18,
                    weight: "bold",
                },
                padding: {
                    bottom: 10,
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${Number(context.raw).toFixed(2).replace(".", ",")}`;
                    },
                },
            },
        },
    }

    return { dataCosts, optionsCosts }
}

export default GraficoSegregacaoCustos