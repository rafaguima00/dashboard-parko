import { useEffect, useState } from "react"
import { Head, Td, Th } from "../../style"
import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import api from "../../../../../../../../services/api/server"
import { useUser } from "../../../../../../../../context/globalContext"

const Recebimentos = (props) => {

    const [pagamentos, setPagamentos] = useState([])

    const { result, recebimentos } = props
    const { dataClient } = useUser()

    const totalRecebimentos = (month) => {
        const mapRec = recebimentos.filter(item => item.mes.split("/")[0].toLowerCase() === month.toLowerCase())
        return formatCurrency(mapRec[0]?.total, "BRL")
    }

    const anoRecebimento = (month) => {
        const mapArr = recebimentos.filter(item => item.mes.split("/")[0].toLowerCase() === month.toLowerCase())
        const ano = mapArr[0]?.mes.split("/")[1]
        return ano
    }

    const loadPayments = async () => {
        try {
            const response = await api.get(`/payment/${dataClient?.id_establishment}`)
            setPagamentos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const somarPorMes = (dados, metodoPagamento, month) => {
        if (!dados) return

        const nomesDosMeses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]

        const totais = {}

        dados.forEach(item => {
            if (item.payment_method !== metodoPagamento) return

            const [dia, mes, ano] = item.data.split("/").map(Number)

            const mesExtenso = `${nomesDosMeses[mes - 1]}/${ano}`

            if (!totais[mesExtenso]) {
                totais[mesExtenso] = 0
            }

            totais[mesExtenso] += Number(item.value)
        })

        // Converter objeto -> array [{ mes, total }]
        const total = Object.entries(totais).map(([mes, total]) => ({
            mes,
            total
        }))
       
        const mapArray = total.filter(item => item.mes.split("/")[0].toLowerCase() === month.toLowerCase())
        return mapArray[0]?.total ? formatCurrency(mapArray[0]?.total, "BRL") : formatCurrency(0, "BRL")
    }

    useEffect(() => {
        loadPayments()
    }, [dataClient?.id_establishment])

    return <>
        <Head textcolor="#bababa">
            <tr>
                <Th>Mês</Th>
                <Th>Ano</Th>
                <Th>Pix</Th>
                <Th>Crédito</Th>
                <Th>Débito</Th>
                <Th>Crédito Parko</Th>
                <Th>Dinheiro</Th>
                <Th>Total</Th>
            </tr>
        </Head>
        <tbody>
            {result.map(item => (
                <tr>
                    <Td textcolor="#7c7c7c">{item.month}</Td>
                    <Td textcolor="#7c7c7c">{anoRecebimento(item.month)}</Td>
                    <Td textcolor="#7c7c7c">{somarPorMes(pagamentos, "pix", item.month)}</Td>
                    <Td textcolor="#7c7c7c">{somarPorMes(pagamentos, "credit_card", item.month)}</Td>
                    <Td textcolor="#7c7c7c">{somarPorMes(pagamentos, "debit_card", item.month)}</Td>
                    <Td textcolor="#7c7c7c">{somarPorMes(pagamentos, "debit", item.month)}</Td>
                    <Td textcolor="#7c7c7c">{somarPorMes(pagamentos, "money", item.month)}</Td>
                    <Td textcolor="#7c7c7c">{totalRecebimentos(item.month)}</Td>
                </tr>
            ))}
        </tbody>
    </>
}

export default Recebimentos